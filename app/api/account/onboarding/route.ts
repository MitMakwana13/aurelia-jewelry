import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fullName, phone } = await request.json();

    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        fullName: fullName?.trim() || undefined,
        phone: phone.trim(),
        onboardingCompleted: true,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error("Onboarding API Error:", error);
    return NextResponse.json(
      { error: "An error occurred during onboarding." },
      { status: 500 }
    );
  }
}
