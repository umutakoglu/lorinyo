import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PrismaService } from '../prisma/prisma.service';

// Use string literals for roles since Prisma enum might not be exported properly
type RoleType = 'ADMIN' | 'VENDOR' | 'CUSTOMER';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private prisma: PrismaService) { }

    /**
     * Get all users (Admin only)
     */
    @Get()
    @Roles('ADMIN' as any)
    async findAll(@Query('role') role?: string) {
        const where: any = {};

        if (role) {
            where.role = role;
        }

        const users = await this.prisma.user.findMany({
            where,
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: { orders: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return users;
    }

    /**
     * Get user by ID (Admin only)
     */
    @Get(':id')
    @Roles('ADMIN' as any)
    async findOne(@Param('id') id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true,
                addresses: true,
                orders: {
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        orderNumber: true,
                        status: true,
                        total: true,
                        createdAt: true
                    }
                },
                _count: {
                    select: { orders: true }
                }
            }
        });

        return user;
    }

    /**
     * Update user role (Admin only)
     */
    @Put(':id/role')
    @Roles('ADMIN' as any)
    async updateRole(@Param('id') id: string, @Body('role') role: string) {
        const user = await this.prisma.user.update({
            where: { id },
            data: { role: role as any },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        });

        return user;
    }

    /**
     * Delete user (Admin only)
     */
    @Delete(':id')
    @Roles('ADMIN' as any)
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        await this.prisma.user.delete({ where: { id } });
        return { message: 'User deleted successfully' };
    }

    /**
     * Get customers only (Admin only)
     */
    @Get('customers/list')
    @Roles('ADMIN' as any)
    async getCustomers() {
        const customers = await this.prisma.user.findMany({
            where: { role: 'CUSTOMER' },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                emailVerified: true,
                createdAt: true,
                _count: {
                    select: { orders: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Calculate total spent for each customer
        const customersWithStats = await Promise.all(
            customers.map(async (customer) => {
                const totalSpent = await this.prisma.order.aggregate({
                    where: { userId: customer.id, status: { not: 'CANCELLED' } },
                    _sum: { total: true }
                });

                return {
                    ...customer,
                    totalSpent: totalSpent._sum?.total || 0
                };
            })
        );

        return customersWithStats;
    }
}
