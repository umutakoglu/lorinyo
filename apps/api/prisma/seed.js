require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Starting seed...');
    console.log('DB URL:', process.env.DATABASE_URL ? 'Found' : 'Missing');

    try {
        // Test connection
        await prisma.$connect();
        console.log('Connected to database');

        // Clear existing
        await prisma.product.deleteMany();
        await prisma.category.deleteMany();
        console.log('Cleared existing data');

        // Create categories
        const cat1 = await prisma.category.create({
            data: { name: 'Elektronik', slug: 'elektronik', isActive: true }
        });
        console.log('Created:', cat1.name);

        const cat2 = await prisma.category.create({
            data: { name: 'Moda', slug: 'moda', isActive: true }
        });
        console.log('Created:', cat2.name);

        // Create products  
        const prod1 = await prisma.product.create({
            data: {
                name: 'iPhone 15',
                slug: 'iphone-15',
                sku: 'IPH15',
                price: 52999,
                stock: 50,
                categoryId: cat1.id,
                isActive: true,
                isFeatured: true
            }
        });
        console.log('Created:', prod1.name);

        const prod2 = await prisma.product.create({
            data: {
                name: 'Elbise',
                slug: 'elbise',
                sku: 'DRESS1',
                price: 299,
                stock: 100,
                categoryId: cat2.id,
                isActive: true,
                isFeatured: true
            }
        });
        console.log('Created:', prod2.name);

        console.log('Seed completed successfully!');
    } catch (error) {
        console.error('Detailed error:', error.message);
        console.error('Full error:', error);
        throw error;
    }
}

main()
    .catch(e => process.exit(1))
    .finally(() => prisma.$disconnect());
