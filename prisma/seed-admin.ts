import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("RadhaRani@2025", 12);

  const admin = await prisma.user.upsert({
    where: { email: "radharanigemstone@gmail.com" },
    update: {},
    create: {
      email: "radharanigemstone@gmail.com",
      password,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user ready:", admin.email);
  console.log("   Password: RadhaRani@2025");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
