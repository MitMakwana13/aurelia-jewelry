import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const password = await bcrypt.hash("RadhaRani@2025", 12);

    const admin = await prisma.user.upsert({
      where: { email: "radharanigemstone@gmail.com" },
      update: {
        password,
        role: "ADMIN",
      },
      create: {
        email: "radharanigemstone@gmail.com",
        password,
        role: "ADMIN",
        fullName: "Admin",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin account seeded successfully.",
      email: admin.email,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
