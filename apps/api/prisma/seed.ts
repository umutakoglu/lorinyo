import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting seed...');

    // Create categories
    const elektronik = await prisma.category.create({
        data: {
            name: 'Elektronik',
            slug: 'elektronik',
            description: 'Elektronik cihazlar',
            isActive: true,
        },
    });
    console.log('Created category: Elektronik');

    const moda = await prisma.category.create({
        data: {
            name: 'Moda',
            slug: 'moda',
            description: 'Giyim ve aksesuar',
            isActive: true,
        },
    });
    console.log('Created category: Moda');

    const evYasam = await prisma.category.create({
        data: {
            name: 'Ev & Yasam',
            slug: 'ev-yasam',
            description: 'Ev dekorasyonu',
            isActive: true,
        },
    });
    console.log('Created category: Ev & Yasam');

    // Create products
    await prisma.product.create({
        data: {
            name: 'iPhone 15 Pro',
            slug: 'iphone-15-pro',
            description: 'Apple iPhone 15 Pro 256GB',
            sku: 'IPH15PRO256',
            price: 52999,
            originalPrice: 59999,
            stock: 50,
            categoryId: elektronik.id,
            brand: 'Apple',
            isActive: true,
            isFeatured: true,
        },
    });
    console.log('Created product: iPhone 15 Pro');

    await prisma.product.create({
        data: {
            name: 'Samsung Galaxy S24',
            slug: 'samsung-galaxy-s24',
            description: 'Samsung Galaxy S24 128GB',
            sku: 'SAMS24128',
            price: 39999,
            stock: 30,
            categoryId: elektronik.id,
            brand: 'Samsung',
            isActive: true,
            isFeatured: true,
        },
    });
    console.log('Created product: Samsung Galaxy S24');

    await prisma.product.create({
        data: {
            name: 'Kadin Elbise',
            slug: 'kadin-elbise-mavi',
            description: 'Sik ve rahat elbise',
            sku: 'DRESS001',
            price: 299,
            stock: 100,
            categoryId: moda.id,
            brand: 'Lorinyo',
            isActive: true,
            isFeatured: true,
        },
    });
    console.log('Created product: Kadin Elbise');

    await prisma.product.create({
        data: {
            name: 'Modern Koltuk',
            slug: 'modern-koltuk-gri',
            description: 'Rahat modern koltuk',
            sku: 'SOFA001',
            price: 2999,
            stock: 15,
            categoryId: evYasam.id,
            brand: 'Comfort Home',
            isActive: true,
            isFeatured: true,
        },
    });
    console.log('Created product: Modern Koltuk');

    console.log('Seed completed!');
}

main()
    .catch((e) => {
        console.error('Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
