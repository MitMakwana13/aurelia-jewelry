import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/wishlist - Returns an array of product IDs in the wishlist
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ items: [] });
    }

    const items = await prisma.wishlistItem.findMany({
      where: { userId: (session.user as any).id },
      select: { productId: true },
    });

    return NextResponse.json({ items: items.map(i => i.productId) });
  } catch (error) {
    console.error("GET /api/wishlist Error:", error);
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

// POST /api/wishlist - Toggles a product in the wishlist
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Check if it already exists
    const existing = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: (session.user as any).id,
          productId,
        }
      }
    });

    if (existing) {
      // Remove it
      await prisma.wishlistItem.delete({
        where: { id: existing.id }
      });
      return NextResponse.json({ success: true, action: "removed", productId });
    } else {
      // Add it
      await prisma.wishlistItem.create({
        data: {
          userId: (session.user as any).id,
          productId,
        }
      });
      return NextResponse.json({ success: true, action: "added", productId });
    }

  } catch (error) {
    console.error("POST /api/wishlist Error:", error);
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}
