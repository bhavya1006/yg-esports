import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

// RSO OAuth callback: exchange code for token, get Riot account, verify user
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.redirect(new URL("/signin", BASE_URL));
  }

  const userId = (session.user as any).id as string;
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  // Handle Riot auth errors (user denied, etc.)
  if (error) {
    const desc = searchParams.get("error_description") || "Authentication was cancelled";
    return NextResponse.redirect(
      new URL(`/profile?verifyError=${encodeURIComponent(desc)}`, BASE_URL)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/profile?verifyError=Missing+authorization+code", BASE_URL)
    );
  }

  // CSRF: verify state matches cookie
  const storedState = request.cookies.get("rso_state")?.value;
  if (!storedState || storedState !== state) {
    return NextResponse.redirect(
      new URL("/profile?verifyError=Invalid+state+parameter.+Please+try+again.", BASE_URL)
    );
  }

  const clientId = process.env.RSO_CLIENT_ID;
  const clientSecret = process.env.RSO_CLIENT_SECRET;
  const redirectUri = process.env.RSO_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.redirect(
      new URL("/profile?verifyError=RSO+not+configured", BASE_URL)
    );
  }

  // Step 1: Exchange auth code for access token
  let tokenData: any;
  try {
    const tokenRes = await fetch("https://auth.riotgames.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenRes.ok) {
      const errBody = await tokenRes.text();
      console.error("RSO token exchange failed:", tokenRes.status, errBody);
      return NextResponse.redirect(
        new URL("/profile?verifyError=Failed+to+exchange+token+with+Riot", BASE_URL)
      );
    }

    tokenData = await tokenRes.json();
  } catch {
    return NextResponse.redirect(
      new URL("/profile?verifyError=Could+not+reach+Riot+auth+server", BASE_URL)
    );
  }

  const accessToken = tokenData.access_token;
  if (!accessToken) {
    return NextResponse.redirect(
      new URL("/profile?verifyError=No+access+token+received+from+Riot", BASE_URL)
    );
  }

  // Step 2: Get the user's actual Riot account using their token
  let riotAccount: any;
  try {
    const accountRes = await fetch(
      "https://asia.api.riotgames.com/riot/account/v1/accounts/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!accountRes.ok) {
      console.error("RSO account fetch failed:", accountRes.status);
      return NextResponse.redirect(
        new URL("/profile?verifyError=Could+not+fetch+Riot+account+info", BASE_URL)
      );
    }

    riotAccount = await accountRes.json();
  } catch {
    return NextResponse.redirect(
      new URL("/profile?verifyError=Failed+to+reach+Riot+account+API", BASE_URL)
    );
  }

  const { puuid, gameName, tagLine } = riotAccount;
  if (!puuid || !gameName || !tagLine) {
    return NextResponse.redirect(
      new URL("/profile?verifyError=Incomplete+Riot+account+data", BASE_URL)
    );
  }

  const riotId = `${gameName}#${tagLine}`;

  // Step 3: Check if this Riot account is already claimed by another user
  const existingUser = await prisma.user.findFirst({
    where: {
      riotPuuid: puuid,
      NOT: { id: userId },
    },
    select: { id: true },
  });

  if (existingUser) {
    return NextResponse.redirect(
      new URL("/profile?verifyError=This+Riot+account+is+already+verified+by+another+user", BASE_URL)
    );
  }

  // Step 4: Mark the user as verified with their real Riot ID
  await prisma.user.update({
    where: { id: userId },
    data: {
      verified: true,
      riotId: riotId,
      riotPuuid: puuid,
      verificationCode: null,
    },
  });

  // Clear the state cookie
  const response = NextResponse.redirect(
    new URL(`/profile?verified=true&riotId=${encodeURIComponent(riotId)}`, BASE_URL)
  );
  response.cookies.delete("rso_state");

  return response;
}
