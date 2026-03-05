import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/leaderboard — ranked player & team leaderboards
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "players"; // "players" or "teams"
  const tier = searchParams.get("tier");
  const limit = Math.min(parseInt(searchParams.get("limit") || "25"), 100);

  if (type === "teams") {
    const where: any = {};
    if (tier) where.tier = parseInt(tier);

    const teams = await prisma.team.findMany({
      where,
      select: {
        id: true,
        name: true,
        tag: true,
        logo: true,
        tier: true,
        avgMmr: true,
        verified: true,
        captain: { select: { name: true } },
        _count: { select: { members: true, wonMatches: true } },
      },
      orderBy: { avgMmr: "desc" },
      take: limit,
    });

    return NextResponse.json({
      type: "teams",
      leaderboard: teams.map((t: any, i: number) => ({
        rank: i + 1,
        ...t,
      })),
    });
  }

  // Default: player leaderboard
  const where: any = {};
  if (tier) where.tier = parseInt(tier);

  const players = await prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      image: true,
      riotId: true,
      tier: true,
      mmr: true,
      verified: true,
      playerStats: {
        select: {
          kills: true,
          deaths: true,
          assists: true,
          wins: true,
          losses: true,
          matchesPlayed: true,
          headshotPct: true,
        },
      },
    },
    orderBy: { mmr: "desc" },
    take: limit,
  });

  return NextResponse.json({
    type: "players",
      leaderboard: players.map((p: any, i: number) => ({
      rank: i + 1,
      ...p,
    })),
  });
}
