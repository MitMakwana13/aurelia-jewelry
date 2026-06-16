import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all products
export async function GET() {
  const products = await prisma.product.findMany({
    include: { variants: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

// POST create product
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { variants, ...productData } = body;

  const product = await prisma.product.create({
    data: {
      ...productData,
      variants: {
        create: variants ?? [],
      },
    },
    include: { variants: true },
  });

  return NextResponse.json(product, { status: 201 });
}
