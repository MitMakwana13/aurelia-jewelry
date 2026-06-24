import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rates = await prisma.exchangeRate.findMany({
      orderBy: { currencyCode: "asc" },
    });
    return NextResponse.json(rates);
  } catch (error) {
    console.error("Failed to fetch public exchange rates:", error);
    return NextResponse.json({ error: "Failed to fetch exchange rates" }, { status: 500 });
  }
}
