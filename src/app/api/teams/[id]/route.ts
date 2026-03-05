import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/teams/[id] — get team details
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const team = await prisma.team.findUnique({
    where: { id },
    include: {
      captain: { select: { id: true, name: true, riotId: true, image: true } },
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              riotId: true,
              image: true,
              tier: true,
              mmr: true,
              verified: true,
            },
          },
        },
        orderBy: { joinedAt: "asc" },
      },
      registrations: {
        include: {
          tournament: {
            select: { id: true, name: true, tier: true, startDate: true, status: true },
          },
        },
        orderBy: { registeredAt: "desc" },
        take: 10,
      },
    },
  });

  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  return NextResponse.json(team);
}

// PATCH /api/teams/[id] — update team (captain only)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const userId = (session.user as any).id;

  const team = await prisma.team.findUnique({ where: { id } });
  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }
  if (team.captainId !== userId) {
    return NextResponse.json({ error: "Only the captain can update the team" }, { status: 403 });
  }

  const body = await request.json();
  const { name, logo } = body;

  const updated = await prisma.team.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(logo !== undefined && { logo }),
    },
  });

  return NextResponse.json(updated);
}

// DELETE /api/teams/[id] — disband team (captain only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const userId = (session.user as any).id;

  const team = await prisma.team.findUnique({ where: { id } });
  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }
  if (team.captainId !== userId) {
    return NextResponse.json({ error: "Only the captain can disband the team" }, { status: 403 });
  }

  await prisma.team.delete({ where: { id } });

  // Reset user role
  await prisma.user.update({
    where: { id: userId },
    data: { role: "PLAYER" },
  });

  return NextResponse.json({ message: "Team disbanded" });
}
