import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/players — list players with pagination, search, tier filter
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
  const search = searchParams.get("search") || "";
  const tier = searchParams.get("tier");
  const sortBy = searchParams.get("sort") || "mmr";
  const order = searchParams.get("order") || "desc";

  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { riotId: { contains: search, mode: "insensitive" } },
    ];
  }

  if (tier) {
    where.tier = parseInt(tier);
  }

  const [players, total] = await Promise.all([
    prisma.user.findMany({
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
          },
        },
      },
      orderBy: { [sortBy]: order as "asc" | "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return NextResponse.json({
    players,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
