import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const rate = await prisma.goldRate.create({
    data: {
      gold22kPerGramInr: body.gold22kPerGramInr ?? null,
      gold24kPerGramInr: body.gold24kPerGramInr ?? null,
      silverPerGramInr: body.silverPerGramInr ?? null,
      platinumPerGramInr: body.platinumPerGramInr ?? null,
      source: "manual",
      createdBy: (session.user as { email?: string })?.email ?? "admin",
    },
  });

  return NextResponse.json({ success: true, rate }, { status: 201 });
}

export async function GET() {
  const [latest, history] = await Promise.all([
    prisma.goldRate.findFirst({ orderBy: { createdAt: "desc" } }),
    prisma.goldRate.findMany({ orderBy: { createdAt: "desc" }, take: 30 }),
  ]);
  return NextResponse.json({ latest, history });
}
