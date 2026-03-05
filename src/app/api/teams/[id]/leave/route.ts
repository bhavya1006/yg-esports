import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/teams/[id]/leave — leave a team
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
  const team = await prisma.team.findUnique({ where: { id: teamId } });
  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  // Captains can't leave — they must disband or transfer
  if (team.captainId === userId) {
    return NextResponse.json(
      { error: "Captains cannot leave. Disband the team or transfer captaincy first." },
      { status: 400 }
    );
  }

  const membership = await prisma.teamMember.findUnique({
    where: { userId_teamId: { userId, teamId } },
  });

  if (!membership) {
    return NextResponse.json({ error: "You are not on this team" }, { status: 404 });
  }

  await prisma.teamMember.delete({
    where: { id: membership.id },
  });

  // Recalculate avg MMR
  const remaining = await prisma.teamMember.findMany({
    where: { teamId },
    include: { user: { select: { mmr: true } } },
  });
  const avgMmr = remaining.length
    ? Math.round(remaining.reduce((sum: number, m: any) => sum + m.user.mmr, 0) / remaining.length)
    : 0;
  await prisma.team.update({
    where: { id: teamId },
    data: { avgMmr },
  });

  return NextResponse.json({ message: "You have left the team" });
}
