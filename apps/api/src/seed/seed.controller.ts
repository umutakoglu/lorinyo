import { Controller, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Controller('seed')
export class SeedController {
    constructor(private prisma: PrismaService) { }

    @Post()
    async seed() {
        // Clear existing
        await this.prisma.product.deleteMany();
        await this.prisma.category.deleteMany();

        // Create all categories
        const cat1 = await this.prisma.category.create({
            data: { name: 'Elektronik', slug: 'elektronik' },
        });

        const cat2 = await this.prisma.category.create({
            data: { name: 'Moda', slug: 'moda' },
        });

        const cat3 = await this.prisma.category.create({
            data: { name: 'Ev & Yasam', slug: 'ev-yasam' },
        });

        const cat4 = await this.prisma.category.create({
            data: { name: 'Spor & Outdoor', slug: 'spor-outdoor' },
        });

        const cat5 = await this.prisma.category.create({
            data: { name: 'Kozmetik', slug: 'kozmetik' },
        });

        const cat6 = await this.prisma.category.create({
            data: { name: 'Kitap & Muzik', slug: 'kitap-muzik' },
        });

        const cat7 = await this.prisma.category.create({
            data: { name: 'Hobi & Oyuncak', slug: 'hobi-oyuncak' },
        });

        const cat8 = await this.prisma.category.create({
            data: { name: 'Anne & Bebek', slug: 'anne-bebek' },
        });

        const cat9 = await this.prisma.category.create({
            data: { name: 'Gida & Icecek', slug: 'gida-icecek' },
        });

        // Create products
        const products = [];

        // Elektronik
        products.push(
            await this.prisma.product.create({
                data: {
                    name: 'iPhone 15 Pro',
                    slug: 'iphone-15-pro',
                    sku: 'IPH15PRO',
                    price: 52999,
                    originalPrice: 59999,
                    stock: 50,
                    categoryId: cat1.id,
                    brand: 'Apple',
                    isActive: true,
                    isFeatured: true,
                },
            }),
        );

        products.push(
            await this.prisma.product.create({
                data: {
                    name: 'Samsung Galaxy S24',
                    slug: 'samsung-s24',
                    sku: 'SAMS24',
                    price: 39999,
                    stock: 30,
                    categoryId: cat1.id,
                    brand: 'Samsung',
                    isActive: true,
                    isFeatured: true,
                },
            }),
        );

        // Moda
        products.push(
            await this.prisma.product.create({
                data: {
                    name: 'Kadin Elbise',
                    slug: 'kadin-elbise',
                    sku: 'DRESS001',
                    price: 299,
                    stock: 100,
                    categoryId: cat2.id,
                    brand: 'Lorinyo',
                    isActive: true,
                    isFeatured: true,
                },
            }),
        );

        // Ev & Yasam
        products.push(
            await this.prisma.product.create({
                data: {
                    name: 'Modern Koltuk',
                    slug: 'modern-koltuk',
                    sku: 'SOFA001',
                    price: 2999,
                    stock: 15,
                    categoryId: cat3.id,
                    brand: 'Comfort',
                    isActive: true,
                    isFeatured: true,
                },
            }),
        );

        // Spor & Outdoor
        products.push(
            await this.prisma.product.create({
                data: {
                    name: 'Kosu Ayakkabisi',
                    slug: 'kosu-ayakkabisi',
                    sku: 'SPORT001',
                    price: 899,
                    stock: 40,
                    categoryId: cat4.id,
                    brand: 'Nike',
                    isActive: true,
                    isFeatured: true,
                },
            }),
        );

        // Kozmetik
        products.push(
            await this.prisma.product.create({
                data: {
                    name: 'Yuz Kremi',
                    slug: 'yuz-kremi',
                    sku: 'KOZM001',
                    price: 199,
                    stock: 80,
                    categoryId: cat5.id,
                    brand: 'Nivea',
                    isActive: true,
                    isFeatured: true,
                },
            }),
        );

        // Kitap & Muzik
        products.push(
            await this.prisma.product.create({
                data: {
                    name: 'Roman Kitabi',
                    slug: 'roman-kitabi',
                    sku: 'BOOK001',
                    price: 49,
                    stock: 200,
                    categoryId: cat6.id,
                    brand: 'Can Yayinlari',
                    isActive: true,
                    isFeatured: true,
                },
            }),
        );

        // Hobi & Oyuncak
        products.push(
            await this.prisma.product.create({
                data: {
                    name: 'Lego Set',
                    slug: 'lego-set',
                    sku: 'HOBI001',
                    price: 599,
                    stock: 25,
                    categoryId: cat7.id,
                    brand: 'Lego',
                    isActive: true,
                    isFeatured: true,
                },
            }),
        );

        // Anne & Bebek
        products.push(
            await this.prisma.product.create({
                data: {
                    name: 'Bebek Arabasi',
                    slug: 'bebek-arabasi',
                    sku: 'BABY001',
                    price: 2499,
                    stock: 10,
                    categoryId: cat8.id,
                    brand: 'Chicco',
                    isActive: true,
                    isFeatured: true,
                },
            }),
        );

        // Gida & Icecek
        products.push(
            await this.prisma.product.create({
                data: {
                    name: 'Organik Zeytinyagi',
                    slug: 'organik-zeytinyagi',
                    sku: 'GIDA001',
                    price: 149,
                    stock: 60,
                    categoryId: cat9.id,
                    brand: 'Tariş',
                    isActive: true,
                    isFeatured: true,
                },
            }),
        );

        return {
            message: 'Seed completed',
            categories: 9,
            products: products.length,
        };
    }

    @Post('make-admin')
    async makeAdmin() {
        // Find or create admin user and set role to ADMIN
        const adminEmail = 'admin@lorinyo.com';

        let user = await this.prisma.user.findUnique({
            where: { email: adminEmail }
        });

        const hashedPassword = await bcrypt.hash('Admin123!', 10);

        if (user) {
            // Update existing user to ADMIN and reset password
            user = await this.prisma.user.update({
                where: { email: adminEmail },
                data: {
                    role: 'ADMIN',
                    password: hashedPassword
                }
            });
        } else {
            // Create admin user with hashed password
            user = await this.prisma.user.create({
                data: {
                    email: adminEmail,
                    password: hashedPassword,
                    name: 'Admin User',
                    role: 'ADMIN',
                    emailVerified: true
                }
            });
        }

        return {
            message: 'Admin user created/updated',
            email: adminEmail,
            password: 'Admin123!',
            role: 'ADMIN'
        };
    }
}

