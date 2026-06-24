import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { type, value, category, direction } = body;

    // validation
    if (typeof value !== "number" || value <= 0) {
      return NextResponse.json({ error: "Invalid adjustment value" }, { status: 400 });
    }

    const multiplier = direction === "decrease" ? -1 : 1;

    // Get all products matching category filter
    const where: any = {};
    if (category && category !== "all") {
      if (category === "jewelry") {
        where.categorySlug = { in: ["rings", "necklaces", "earrings", "bracelets"] };
      } else if (category === "gemstones") {
        where.OR = [
          { categorySlug: "gemstones" },
          { tags: { hasSome: ["gemstone", "birthstone", "pearl"] } }
        ];
      } else if (category === "diamonds") {
        where.OR = [
          { categorySlug: "diamonds" },
          { tags: { has: "diamond" } }
        ];
      } else {
        where.categorySlug = category;
      }
    }

    const products = await prisma.product.findMany({
      where,
      include: { variants: true },
    });

    const updates = [];

    for (const prod of products) {
      let newBasePrice = prod.basePrice;
      if (type === "percentage") {
        newBasePrice = prod.basePrice * (1 + (value / 100) * multiplier);
      } else {
        newBasePrice = prod.basePrice + value * multiplier;
      }
      newBasePrice = Math.max(0, Math.round(newBasePrice));

      // Update product base price
      updates.push(
        prisma.product.update({
          where: { id: prod.id },
          data: { basePrice: newBasePrice },
        })
      );

      // Update all variants' prices
      for (const variant of prod.variants) {
        let newPrice = variant.price;
        if (type === "percentage") {
          newPrice = variant.price * (1 + (value / 100) * multiplier);
        } else {
          newPrice = variant.price + value * multiplier;
        }
        newPrice = Math.max(0, Math.round(newPrice));

        updates.push(
          prisma.variant.update({
            where: { id: variant.id },
            data: { price: newPrice },
          })
        );
      }
    }

    await Promise.all(updates);

    return NextResponse.json({
      success: true,
      message: `Adjusted prices for ${products.length} products and their variants.`,
    });
  } catch (error) {
    console.error("Bulk price adjustment error:", error);
    return NextResponse.json({ error: "Failed to apply bulk markup" }, { status: 500 });
  }
}
