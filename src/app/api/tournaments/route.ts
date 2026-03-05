import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/tournaments — list tournaments
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const tier = searchParams.get("tier");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

  const where: any = {};

  if (status) {
    where.status = status;
  }

  if (tier) {
    where.tier = { contains: tier, mode: "insensitive" };
  }

  const [tournaments, total] = await Promise.all([
    prisma.tournament.findMany({
      where,
      include: {
        _count: { select: { registrations: true } },
      },
      orderBy: { startDate: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.tournament.count({ where }),
  ]);

  return NextResponse.json({
    tournaments,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

// POST /api/tournaments — create tournament (admin only)
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userRole = (session.user as any).role;
  if (userRole !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const body = await request.json();
  const {
    name,
    description,
    tier,
    format,
    mapPool,
    slots,
    sponsored,
    sponsorName,
    startDate,
    regCloseDate,
  } = body;

  if (!name || !tier || !format || !slots || !startDate || !regCloseDate) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const tournament = await prisma.tournament.create({
    data: {
      name,
      description,
      tier,
      format,
      mapPool: mapPool || [],
      slots,
      status: "REGISTRATION_OPEN",
      sponsored: sponsored || false,
      sponsorName,
      startDate: new Date(startDate),
      regCloseDate: new Date(regCloseDate),
    },
  });

  return NextResponse.json(tournament, { status: 201 });
}
