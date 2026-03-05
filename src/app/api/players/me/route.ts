import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/players/me — get current user's full profile
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      riotId: true,
      discordTag: true,
      bio: true,
      role: true,
      tier: true,
      mmr: true,
      verified: true,
      verificationCode: true,
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
              avgMmr: true,
              verified: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// PATCH /api/players/me — update profile
export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, bio, riotId, discordTag, image } = body;

  // Validate image path — only allow paths from /lib-profile/
  if (image !== undefined && image !== null) {
    if (typeof image !== "string" || !image.startsWith("/lib-profile/") || image.includes("..")) {
      return NextResponse.json(
        { error: "Invalid image path" },
        { status: 400 }
      );
    }
  }

  // If updating riotId, check uniqueness
  if (riotId) {
    const existing = await prisma.user.findUnique({ where: { riotId } });
    if (existing && existing.id !== (session.user as any).id) {
      return NextResponse.json(
        { error: "This Riot ID is already linked to another account" },
        { status: 409 }
      );
    }
  }

  const user = await prisma.user.update({
    where: { id: (session.user as any).id },
    data: {
      ...(name !== undefined && { name }),
      ...(bio !== undefined && { bio }),
      ...(riotId !== undefined && { riotId }),
      ...(discordTag !== undefined && { discordTag }),
      ...(image !== undefined && { image }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      riotId: true,
      discordTag: true,
      bio: true,
      tier: true,
      mmr: true,
      verified: true,
    },
  });

  return NextResponse.json(user);
}
