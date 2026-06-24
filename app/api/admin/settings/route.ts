import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const settings = await prisma.siteSetting.findMany({
      orderBy: { key: "asc" },
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch admin settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { settings } = body; // Expect { "contact_phone": "+91 ...", "instagram_url": "..." }

    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ error: "Invalid settings dictionary" }, { status: 400 });
    }

    const updates = [];
    for (const [key, value] of Object.entries(settings)) {
      updates.push(
        prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: {
            key,
            value: String(value),
            label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            category: key.includes("url") || key.includes("handle") ? "social" : "contact",
          },
        })
      );
    }

    await Promise.all(updates);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update site settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
