import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://radharanigemstone.com";

  const products = await prisma.product.findMany({
    select: { handle: true, updatedAt: true },
  });

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/shop/gemstones`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/shop/diamonds`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/shop/jewelry`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/custom`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/collections`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/help/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/help/shipping`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.handle}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
