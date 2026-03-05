import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import crypto from "crypto";

// RSO OAuth: Redirect user to Riot's login page
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.redirect(new URL("/signin", process.env.NEXTAUTH_URL || "http://localhost:3000"));
  }

  const clientId = process.env.RSO_CLIENT_ID;
  const redirectUri = process.env.RSO_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: "RSO not configured. Contact admin." },
      { status: 500 }
    );
  }

  // Generate CSRF state token
  const state = crypto.randomBytes(32).toString("hex");

  // Build Riot auth URL
  const authUrl = new URL("https://auth.riotgames.com/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid");
  authUrl.searchParams.set("state", state);

  // Set state in httpOnly cookie for CSRF verification
  const response = NextResponse.redirect(authUrl.toString());
  response.cookies.set("rso_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600, // 10 minutes
    path: "/",
  });

  return response;
}
