import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/players/[id] — get a specific player's public profile
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      image: true,
      riotId: true,
      bio: true,
      tier: true,
      mmr: true,
      verified: true,
      createdAt: true,
      playerStats: true,
      teamMembers: {
        include: {
          team: {
            select: {
              id: true,
              name: true,
              tag: true,
              tier: true,
              verified: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
