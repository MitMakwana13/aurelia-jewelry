import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { collections as staticCollections } from "@/data/collections";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const collectionsWithCounts = await Promise.all(
      staticCollections.map(async (c) => {
        const count = await prisma.product.count({
          where: {
            collectionSlugs: {
              has: c.slug,
            },
          },
        });
        return {
          ...c,
          productCount: count,
        };
      })
    );
    return NextResponse.json(collectionsWithCounts);
  } catch (error) {
    console.error("Failed to fetch collections:", error);
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { slug, productIds } = body;

    if (!slug || !Array.isArray(productIds)) {
      return NextResponse.json({ error: "slug and productIds array are required" }, { status: 400 });
    }

    // Get all products that currently have this collection
    const currentProducts = await prisma.product.findMany({
      where: {
        collectionSlugs: {
          has: slug,
        },
      },
    });

    // Remove slug from products that are no longer in the list
    for (const prod of currentProducts) {
      if (!productIds.includes(prod.id)) {
        const updatedSlugs = prod.collectionSlugs.filter((s) => s !== slug);
        await prisma.product.update({
          where: { id: prod.id },
          data: { collectionSlugs: updatedSlugs },
        });
      }
    }

    // Add slug to products that are in the new list but don't have it
    for (const id of productIds) {
      const prod = await prisma.product.findUnique({ where: { id } });
      if (prod && !prod.collectionSlugs.includes(slug)) {
        await prisma.product.update({
          where: { id },
          data: { collectionSlugs: { push: slug } },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update collection products:", error);
    return NextResponse.json({ error: "Failed to update collection products" }, { status: 500 });
  }
}
