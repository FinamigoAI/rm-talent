import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';

async function main() {
  const [email, password] = process.argv.slice(2);
  if (!email || !password) {
    console.error('Uso: tsx createDemoUser.ts <email> <password>');
    process.exit(1);
  }
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.upsert({
    where: { email },
    create: { email, passwordHash },
    update: { passwordHash },
  });
  console.log(`Usuario listo: ${user.email} (${user.id})`);
}

main().finally(() => prisma.$disconnect());
