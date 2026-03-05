import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/tournaments/[id]/register — register a team for a tournament
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: tournamentId } = await params;
  const userId = (session.user as any).id;

  // Get tournament
  const tournament = await prisma.tournament.findUnique({
    where: { id: tournamentId },
    include: { _count: { select: { registrations: true } } },
  });

  if (!tournament) {
    return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
  }

  if (tournament.status !== "REGISTRATION_OPEN") {
    return NextResponse.json(
      { error: "Registration is not open for this tournament" },
      { status: 400 }
    );
  }

  if (new Date() > tournament.regCloseDate) {
    return NextResponse.json(
      { error: "Registration deadline has passed" },
      { status: 400 }
    );
  }

  // Get user's team (must be captain)
  const body = await request.json();
  const { teamId } = body;

  if (!teamId) {
    return NextResponse.json({ error: "Team ID is required" }, { status: 400 });
  }

  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: { _count: { select: { members: true } } },
  });

  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  if (team.captainId !== userId) {
    return NextResponse.json(
      { error: "Only the team captain can register for tournaments" },
      { status: 403 }
    );
  }

  // Check minimum roster (5 players)
  if (team._count.members < 5) {
    return NextResponse.json(
      { error: "Team must have at least 5 members to register" },
      { status: 400 }
    );
  }

  // Check if already registered
  const existingReg = await prisma.tournamentRegistration.findUnique({
    where: { tournamentId_teamId: { tournamentId, teamId } },
  });

  if (existingReg) {
    return NextResponse.json(
      { error: "Your team is already registered for this tournament" },
      { status: 409 }
    );
  }

  // Check slots
  const isFull = tournament._count.registrations >= tournament.slots;

  const registration = await prisma.tournamentRegistration.create({
    data: {
      tournamentId,
      teamId,
      status: isFull ? "WAITLISTED" : "CONFIRMED",
    },
    include: {
      team: { select: { id: true, name: true, tag: true } },
      tournament: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(
    {
      registration,
      message: isFull
        ? "Tournament is full. You have been added to the waitlist."
        : "Team registered successfully!",
    },
    { status: 201 }
  );
}
