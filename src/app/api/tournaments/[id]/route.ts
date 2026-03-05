import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/tournaments/[id] — get tournament details with registrations & matches
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const tournament = await prisma.tournament.findUnique({
    where: { id },
    include: {
      registrations: {
        include: {
          team: {
            select: {
              id: true,
              name: true,
              tag: true,
              tier: true,
              avgMmr: true,
              verified: true,
              captain: { select: { id: true, name: true } },
              _count: { select: { members: true } },
            },
          },
        },
        orderBy: { registeredAt: "asc" },
      },
      matches: {
        include: {
          team1: { select: { id: true, name: true, tag: true } },
          team2: { select: { id: true, name: true, tag: true } },
          winner: { select: { id: true, name: true, tag: true } },
          mvp: { select: { id: true, name: true, riotId: true } },
        },
        orderBy: [{ round: "asc" }, { bracketPos: "asc" }],
      },
    },
  });

  if (!tournament) {
    return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
  }

  return NextResponse.json(tournament);
}
