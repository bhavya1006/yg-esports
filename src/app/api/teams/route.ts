import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/teams — list teams with search, tier filter, pagination
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
  const search = searchParams.get("search") || "";
  const tier = searchParams.get("tier");

  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { tag: { contains: search, mode: "insensitive" } },
    ];
  }

  if (tier) {
    where.tier = parseInt(tier);
  }

  const [teams, total] = await Promise.all([
    prisma.team.findMany({
      where,
      select: {
        id: true,
        name: true,
        tag: true,
        logo: true,
        tier: true,
        avgMmr: true,
        verified: true,
        captain: {
          select: { id: true, name: true, riotId: true },
        },
        members: {
          select: {
            role: true,
            user: { select: { id: true, name: true, riotId: true, tier: true } },
          },
        },
        _count: { select: { members: true } },
      },
      orderBy: { avgMmr: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.team.count({ where }),
  ]);

  return NextResponse.json({
    teams,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

// POST /api/teams — create a new team
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const body = await request.json();
  const { name, tag } = body;

  if (!name || !tag) {
    return NextResponse.json(
      { error: "Team name and tag are required" },
      { status: 400 }
    );
  }

  if (tag.length > 5) {
    return NextResponse.json(
      { error: "Team tag must be 5 characters or less" },
      { status: 400 }
    );
  }

  // Check if user already captains a team
  const existingTeam = await prisma.team.findFirst({
    where: { captainId: userId },
  });

  if (existingTeam) {
    return NextResponse.json(
      { error: "You already own a team. Transfer or disband it first." },
      { status: 409 }
    );
  }

  // Check name/tag uniqueness
  const nameTaken = await prisma.team.findFirst({
    where: { OR: [{ name }, { tag }] },
  });

  if (nameTaken) {
    return NextResponse.json(
      { error: "Team name or tag is already taken" },
      { status: 409 }
    );
  }

  // Get user's MMR for team avg
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { mmr: true, tier: true },
  });

  const team = await prisma.team.create({
    data: {
      name,
      tag: tag.toUpperCase(),
      captainId: userId,
      avgMmr: user?.mmr || 0,
      tier: user?.tier || 1,
      members: {
        create: {
          userId,
          role: "CAPTAIN",
        },
      },
    },
    include: {
      captain: { select: { id: true, name: true } },
      members: {
        include: {
          user: { select: { id: true, name: true, riotId: true } },
        },
      },
    },
  });

  // Update user role
  await prisma.user.update({
    where: { id: userId },
    data: { role: "CAPTAIN" },
  });

  return NextResponse.json(team, { status: 201 });
}
