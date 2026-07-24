const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('Admin@123', 10);
  await prisma.user.update({
    where: { email: 'radharanigemstone@gmail.com' },
    data: { password: hash }
  });
  console.log('Password reset successfully to Admin@123');
}

main().finally(() => prisma.$disconnect());
