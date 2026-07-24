import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { name, phone, email, type, productName, budget, message, notes, status } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        phone,
        email: email || null,
        type: type || "GENERAL",
        productName: productName || null,
        budget: budget || null,
        message: message || "",
        notes: notes || null,
        status: status || "NEW",
      },
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error("Failed to create inquiry:", error);
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 });
  }
}
