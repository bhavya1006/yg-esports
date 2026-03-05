import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/teams/[id]/join — request to join a team
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: teamId } = await params;
  const userId = (session.user as any).id;

  // Check team exists
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: { _count: { select: { members: true } } },
  });

  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  // Max 7 members (5 players + 2 subs)
  if (team._count.members >= 7) {
    return NextResponse.json({ error: "Team roster is full (max 7)" }, { status: 400 });
  }

  // Check if already in this team
  const existing = await prisma.teamMember.findUnique({
    where: { userId_teamId: { userId, teamId } },
  });

  if (existing) {
    return NextResponse.json({ error: "You are already on this team" }, { status: 409 });
  }

  // Check if already on another team
  const onOtherTeam = await prisma.teamMember.findFirst({
    where: { userId },
  });

  if (onOtherTeam) {
    return NextResponse.json(
      { error: "You are already on a team. Leave your current team first." },
      { status: 409 }
    );
  }

  const member = await prisma.teamMember.create({
    data: {
      userId,
      teamId,
      role: "PLAYER",
    },
    include: {
      user: { select: { id: true, name: true, riotId: true } },
    },
  });

  // Recalculate team avg MMR
  const members = await prisma.teamMember.findMany({
    where: { teamId },
    include: { user: { select: { mmr: true } } },
  });
  const avgMmr = Math.round(
    members.reduce((sum: number, m: any) => sum + m.user.mmr, 0) / members.length
  );
  await prisma.team.update({
    where: { id: teamId },
    data: { avgMmr },
  });

  return NextResponse.json(member, { status: 201 });
}
