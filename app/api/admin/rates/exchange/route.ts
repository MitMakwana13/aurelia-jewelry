import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { currencyCode, rateToInr } = body;

  if (!currencyCode || !rateToInr) {
    return NextResponse.json({ error: "currencyCode and rateToInr are required" }, { status: 400 });
  }

  const updated = await prisma.exchangeRate.upsert({
    where: { currencyCode },
    update: {
      rateToInr: parseFloat(rateToInr),
      lastUpdated: new Date(),
      updatedBy: (session.user as { email?: string })?.email ?? "admin",
    },
    create: {
      currencyCode,
      rateToInr: parseFloat(rateToInr),
      updatedBy: (session.user as { email?: string })?.email ?? "admin",
    },
  });

  return NextResponse.json({ success: true, rate: updated });
}

export async function GET() {
  const rates = await prisma.exchangeRate.findMany({ orderBy: { currencyCode: "asc" } });
  return NextResponse.json(rates);
}
