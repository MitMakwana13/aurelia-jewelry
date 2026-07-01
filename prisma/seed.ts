import { PrismaClient } from "@prisma/client";
import { products } from "../data/products";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing product data
  console.log("Cleaning database...");
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  // Create an admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@aurelia.com" },
    update: {},
    create: {
      email: "admin@aurelia.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Seed products
  for (const prod of products) {
    console.log(`Seeding product: ${prod.title}`);
    await prisma.product.create({
        data: {
          handle: prod.handle,
          title: prod.title,
          description: prod.description,
          categorySlug: prod.categorySlug,
          collectionSlugs: prod.collectionSlugs,
          tags: prod.tags,
          metals: prod.metals,
          sizes: prod.sizes || [],
          basePrice: prod.priceRange.min.amount, // using min price as base price approx
          images: prod.images,
          featured: prod.featured || false,
          trending: prod.trending || false,
          newArrival: prod.newArrival || false,
          bestseller: prod.bestseller || false,
          variants: {
            create: prod.variants.map((v) => ({
              title: v.title,
              metal: v.metal,
              size: v.size,
              price: v.price.amount,
              currency: v.price.currency === "USD" ? "INR" : v.price.currency, // Force INR or keep
              available: v.available,
              sku: v.sku,
            })),
          },
        },
      });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
