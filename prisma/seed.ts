import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const colorData: Prisma.ColorCreateInput[] = [
  { hex: '#A9AABC' },
  { hex: '#E44057' },
  { hex: '#E47C40' },
  { hex: '#E4CE40' },
  { hex: '#A8E440' },
  { hex: '#5178D3' },
];

const roleData: Prisma.RoleCreateInput[] = [
  { type: 'ADMIN' },
  { type: 'BACK' },
  { type: 'DESIGN' },
  { type: 'FRONT' },
  { type: 'OWNER' },
  { type: 'STAKEHOLDER' },
  { type: 'UX' },
];

async function main() {
  for (const color of colorData) {
    await prisma.color.create({ data: color });
  }
  for (const role of roleData) {
    await prisma.role.create({ data: role });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
