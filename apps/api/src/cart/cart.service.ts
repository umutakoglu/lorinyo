import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) { }

    async getCart(userId: string) {
        const cartItems = await this.prisma.cartItem.findMany({
            where: { userId },
            include: {
                product: {
                    include: {
                        images: { take: 1 },
                        category: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        const subtotal = cartItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0,
        );

        return {
            items: cartItems,
            subtotal,
            itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        };
    }

    async addToCart(userId: string, dto: AddToCartDto) {
        // Check if product exists
        const product = await this.prisma.product.findUnique({
            where: { id: dto.productId },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        // Check if item already in cart
        const existing = await this.prisma.cartItem.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId: dto.productId,
                },
            },
        });

        if (existing) {
            // Update quantity
            return this.prisma.cartItem.update({
                where: { id: existing.id },
                data: {
                    quantity: existing.quantity + (dto.quantity || 1),
                },
                include: {
                    product: {
                        include: { images: { take: 1 } },
                    },
                },
            });
        }

        // Add new item
        return this.prisma.cartItem.create({
            data: {
                userId,
                productId: dto.productId,
                quantity: dto.quantity || 1,
            },
            include: {
                product: {
                    include: { images: { take: 1 } },
                },
            },
        });
    }

    async updateQuantity(userId: string, itemId: string, quantity: number) {
        const item = await this.prisma.cartItem.findFirst({
            where: { id: itemId, userId },
        });

        if (!item) {
            throw new NotFoundException('Cart item not found');
        }

        if (quantity <= 0) {
            return this.removeFromCart(userId, itemId);
        }

        return this.prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity },
            include: {
                product: {
                    include: { images: { take: 1 } },
                },
            },
        });
    }

    async removeFromCart(userId: string, itemId: string) {
        const item = await this.prisma.cartItem.findFirst({
            where: { id: itemId, userId },
        });

        if (!item) {
            throw new NotFoundException('Cart item not found');
        }

        await this.prisma.cartItem.delete({ where: { id: itemId } });
        return { message: 'Item removed from cart' };
    }

    async clearCart(userId: string) {
        await this.prisma.cartItem.deleteMany({ where: { userId } });
        return { message: 'Cart cleared' };
    }
}
