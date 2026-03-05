import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, riotId } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Check if riotId already taken (if provided)
    if (riotId) {
      const existingRiot = await prisma.user.findUnique({
        where: { riotId },
      });
      if (existingRiot) {
        return NextResponse.json(
          { error: "This Riot ID is already linked to another account" },
          { status: 409 }
        );
      }
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        riotId: riotId || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        riotId: true,
        tier: true,
        mmr: true,
        createdAt: true,
      },
    });

    // Create empty player stats record
    await prisma.playerStats.create({
      data: { userId: user.id },
    });

    return NextResponse.json(
      { message: "Account created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
