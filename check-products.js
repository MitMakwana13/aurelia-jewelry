const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const products = await prisma.product.findMany({ select: { id: true, handle: true } });
  console.log('Products in DB:', products.slice(0, 5));
}
main().finally(() => prisma.$disconnect());
