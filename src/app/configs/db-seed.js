import prisma from './db-client';
import Jwt from '../pkg/jwt';

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice123@tests.com' },
    update: {},
    create: {
      email: 'alice123@tests.com',
      name: 'alice',
      password: Jwt.convertToHashedPassword('123456'),
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: 'bob123@tests.com' },
    update: {},
    create: {
      email: 'bob123@tests.com',
      name: 'bob',
      password: Jwt.convertToHashedPassword('123456'),
    },
  });
  console.log({ alice, bob });
}

main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
