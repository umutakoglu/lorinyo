import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
    constructor(private prisma: PrismaService) { }

    async getFavorites(userId: string) {
        return this.prisma.favorite.findMany({
            where: { userId },
            include: {
                product: {
                    include: {
                        images: { take: 1 },
                        category: { select: { name: true, slug: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async addToFavorites(userId: string, productId: string) {
        // Check if product exists
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        // Check if already in favorites
        const existing = await this.prisma.favorite.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });

        if (existing) {
            return { message: 'Product already in favorites', favorite: existing };
        }

        const favorite = await this.prisma.favorite.create({
            data: {
                userId,
                productId,
            },
            include: {
                product: {
                    include: {
                        images: { take: 1 },
                    },
                },
            },
        });

        return { message: 'Added to favorites', favorite };
    }

    async removeFromFavorites(userId: string, productId: string) {
        const favorite = await this.prisma.favorite.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });

        if (!favorite) {
            throw new NotFoundException('Favorite not found');
        }

        await this.prisma.favorite.delete({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });

        return { message: 'Removed from favorites' };
    }

    async toggleFavorite(userId: string, productId: string) {
        const existing = await this.prisma.favorite.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });

        if (existing) {
            await this.prisma.favorite.delete({
                where: {
                    userId_productId: {
                        userId,
                        productId,
                    },
                },
            });
            return { message: 'Removed from favorites', isFavorite: false };
        }

        await this.prisma.favorite.create({
            data: {
                userId,
                productId,
            },
        });

        return { message: 'Added to favorites', isFavorite: true };
    }

    async checkFavorite(userId: string, productId: string) {
        const favorite = await this.prisma.favorite.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });

        return { isFavorite: !!favorite };
    }
}
