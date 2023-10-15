import {PrismaClient} from '@prisma/client';
import * as bcrypt from 'bcrypt';

import {AUTH_CONSTANTS} from 'src/constants/auth-constants';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash(
    'Test!123',
    AUTH_CONSTANTS.ROUNDS_OF_GASHING,
  );

  const user1 = await prisma.user.upsert({
    where: {email: 'test1@test.test'},
    update: {},
    create: {
      email: 'test1@test.test',
      first_name: 'Test1',
      last_name: 'Testson',
      password: password,
    },
  });

  const user2 = await prisma.user.upsert({
    where: {email: 'test2@test.test'},
    update: {},
    create: {
      email: 'test2@test.test',
      first_name: 'Test2',
      last_name: 'Testson',
      password: password,
    },
  });

  console.log({user1, user2});
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
