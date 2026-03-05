import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Riot Account API — use asia for AP/India region
// Other options: americas.api.riotgames.com, europe.api.riotgames.com
const RIOT_API_BASE = "https://asia.api.riotgames.com";

// POST /api/verify/riot — Verify a user's Riot ID by looking it up via the Riot API
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id as string;
  const apiKey = process.env.RIOT_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Riot API key not configured on server" },
      { status: 500 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { riotId: true, verified: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.verified) {
    return NextResponse.json({ error: "Already verified" }, { status: 400 });
  }

  if (!user.riotId || !user.riotId.includes("#")) {
    return NextResponse.json(
      { error: "Set a valid Riot ID (Name#Tag) in your profile first" },
      { status: 400 }
    );
  }

  // Parse gameName#tagLine
  const hashIndex = user.riotId.lastIndexOf("#");
  const gameName = user.riotId.substring(0, hashIndex);
  const tagLine = user.riotId.substring(hashIndex + 1);

  // Call Riot Account-V1 API to check if account exists
  const riotUrl = `${RIOT_API_BASE}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;

  let riotRes: Response;
  try {
    riotRes = await fetch(riotUrl, {
      headers: { "X-Riot-Token": apiKey },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach Riot API. Try again later." },
      { status: 502 }
    );
  }

  if (riotRes.status === 404) {
    return NextResponse.json(
      { error: "Riot account not found. Double-check your Riot ID (Name#Tag) and try again." },
      { status: 404 }
    );
  }

  if (riotRes.status === 401 || riotRes.status === 403) {
    return NextResponse.json(
      { error: "Riot API key is invalid or expired. Dev keys expire every 24 hours — regenerate at developer.riotgames.com" },
      { status: 502 }
    );
  }

  if (riotRes.status === 429) {
    return NextResponse.json(
      { error: "Riot API rate limit exceeded. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  if (!riotRes.ok) {
    return NextResponse.json(
      { error: `Riot API error (${riotRes.status})` },
      { status: 502 }
    );
  }

  const riotData = await riotRes.json();

  // Account found — normalize the Riot ID to Riot's casing and mark verified
  const normalizedRiotId = `${riotData.gameName}#${riotData.tagLine}`;

  await prisma.user.update({
    where: { id: userId },
    data: {
      verified: true,
      riotId: normalizedRiotId,
      verificationCode: null,
    },
  });

  return NextResponse.json({
    verified: true,
    riotId: normalizedRiotId,
    puuid: riotData.puuid,
    message: `Riot account "${normalizedRiotId}" verified successfully!`,
  });
}
