import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Post()
    async createOrder(@Request() req: ExpressRequest & { user: any }, @Body() dto: CreateOrderDto) {
        return this.ordersService.createOrder(req.user.id, dto);
    }

    @Get()
    async getOrders(@Request() req: ExpressRequest & { user: any }) {
        const isAdmin = req.user.role === 'ADMIN';
        return this.ordersService.getOrders(req.user.id, isAdmin);
    }

    @Get('stats')
    async getStats(@Request() req: ExpressRequest & { user: any }) {
        return this.ordersService.getUserOrderStats(req.user.id);
    }

    @Get(':id')
    async getOrder(@Request() req: ExpressRequest & { user: any }, @Param('id') id: string) {
        const isAdmin = req.user.role === 'ADMIN';
        return this.ordersService.getOrder(id, req.user.id, isAdmin);
    }

    @Put(':id/status')
    @UseGuards(JwtAuthGuard)
    async updateStatus(
        @Request() req: ExpressRequest & { user: any },
        @Param('id') id: string,
        @Body() dto: { status: string }
    ) {
        return this.ordersService.updateStatus(id, dto.status);
    }
}
