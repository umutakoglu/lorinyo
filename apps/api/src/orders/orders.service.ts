import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    async createOrder(userId: string, dto: CreateOrderDto) {
        // Get cart items
        const cartItems = await this.prisma.cartItem.findMany({
            where: { userId },
            include: { product: true },
        });

        if (cartItems.length === 0) {
            throw new BadRequestException('Cart is empty');
        }

        // Calculate totals
        const subtotal = cartItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0,
        );

        const shippingCost = subtotal >= 500 ? 0 : 49.9;
        const total = subtotal + shippingCost;

        // Generate order number
        const orderNumber = `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

        // Create order with items
        const order = await this.prisma.order.create({
            data: {
                orderNumber,
                userId,
                addressId: dto.addressId,
                paymentMethod: dto.paymentMethod,
                subtotal,
                shippingCost,
                total,
                notes: dto.notes,
                items: {
                    create: cartItems.map((item) => ({
                        productId: item.productId,
                        name: item.product.name,
                        sku: item.product.sku,
                        price: item.product.price,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                items: {
                    include: { product: { include: { images: { take: 1 } } } },
                },
                address: true,
            },
        });

        // Clear cart
        await this.prisma.cartItem.deleteMany({ where: { userId } });

        // Update stock
        for (const item of cartItems) {
            await this.prisma.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } },
            });
        }

        return order;
    }

    async getOrders(userId: string, isAdmin: boolean = false) {
        const where = isAdmin ? {} : { userId };

        return this.prisma.order.findMany({
            where,
            include: {
                items: {
                    include: { product: { select: { name: true, images: { take: 1 } } } },
                },
                address: true,
                user: { select: { name: true, email: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getOrder(orderId: string, userId: string, isAdmin: boolean = false) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: { product: { include: { images: { take: 1 } } } },
                },
                address: true,
                user: { select: { name: true, email: true, phone: true } },
            },
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        if (!isAdmin && order.userId !== userId) {
            throw new NotFoundException('Order not found');
        }

        return order;
    }

    async updateOrderStatus(orderId: string, status: string) {
        const validStatuses = [
            'PENDING',
            'CONFIRMED',
            'PROCESSING',
            'SHIPPED',
            'DELIVERED',
            'CANCELLED',
            'RETURNED',
        ];

        if (!validStatuses.includes(status)) {
            throw new BadRequestException('Invalid status');
        }

        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                status: status as any,
                ...(status === 'SHIPPED' && { shippedAt: new Date() }),
                ...(status === 'DELIVERED' && { deliveredAt: new Date() }),
                ...(status === 'CANCELLED' && { cancelledAt: new Date() }),
            },
            include: {
                items: true,
                address: true,
            },
        });
    }

    async getUserOrderStats(userId: string) {
        const [totalOrders, totalSpent, pendingOrders] = await Promise.all([
            this.prisma.order.count({ where: { userId } }),
            this.prisma.order.aggregate({
                where: { userId, status: { not: 'CANCELLED' } },
                _sum: { total: true },
            }),
            this.prisma.order.count({
                where: { userId, status: { in: ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED'] } },
            }),
        ]);

        return {
            totalOrders,
            totalSpent: totalSpent._sum.total || 0,
            pendingOrders,
        };
    }

    // Alias for controller
    async updateStatus(orderId: string, status: string) {
        return this.updateOrderStatus(orderId, status);
    }
}
