import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const categoryCount = await prisma.category.count();
    const productCount = await prisma.product.count();

    console.log('Categories:', categoryCount);
    console.log('Products:', productCount);

    await prisma.$disconnect();
}

main();
