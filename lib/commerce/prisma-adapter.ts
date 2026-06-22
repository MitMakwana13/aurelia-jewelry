import { prisma } from "@/lib/prisma";
import type { CommerceAdapter, Product, Category, Collection, Image, ProductVariant, Money } from "./types";
import { categories } from "@/data/categories"; // Keep static for now or move to DB later
import { collections } from "@/data/collections"; // Keep static for now

function mapProduct(p: any): Product {
  const variants = p.variants.map((v: any): ProductVariant => ({
    id: v.id,
    title: v.title,
    metal: v.metal,
    size: v.size || undefined,
    price: { amount: v.price, currency: v.currency },
    available: v.available,
    sku: v.sku,
  }));

  const prices = variants.map((v: ProductVariant) => v.price.amount);
  const minPrice = prices.length > 0 ? Math.min(...prices) : p.basePrice;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : p.basePrice;

  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    categorySlug: p.categorySlug,
    collectionSlugs: p.collectionSlugs,
    tags: p.tags,
    metals: p.metals,
    sizes: p.sizes.length > 0 ? p.sizes : undefined,
    priceRange: {
      min: { amount: minPrice, currency: "INR" },
      max: { amount: maxPrice, currency: "INR" },
    },
    images: (p.images as any[]).map((img) => ({
      url: img.url,
      alt: img.alt,
      width: img.width,
      height: img.height,
    })),
    variants,
    featured: p.featured,
    trending: p.trending,
    newArrival: p.newArrival,
    bestseller: p.bestseller,
  };
}

export const prismaAdapter: CommerceAdapter = {
  async getProducts(opts = {}) {
    const where: any = {};
    if (opts.category) where.categorySlug = opts.category;
    if (opts.collection) where.collectionSlugs = { has: opts.collection };

    const products = await prisma.product.findMany({
      where,
      include: { variants: true },
      take: opts.limit,
      orderBy: { createdAt: "desc" },
    });

    return products.map(mapProduct);
  },

  async getProduct(handle) {
    const product = await prisma.product.findUnique({
      where: { handle },
      include: { variants: true },
    });
    return product ? mapProduct(product) : null;
  },

  async getCategories() {
    return categories;
  },

  async getCategory(slug) {
    return categories.find((c) => c.slug === slug) ?? null;
  },

  async getCollections() {
    return collections;
  },

  async getCollection(slug) {
    return collections.find((c) => c.slug === slug) ?? null;
  },

  async searchProducts(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    
    // Simple ilike search
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      include: { variants: true },
    });

    return products.map(mapProduct);
  },
};
