import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
    constructor(private cartService: CartService) { }

    @Get()
    async getCart(@Request() req: ExpressRequest & { user: any }) {
        return this.cartService.getCart(req.user.id);
    }

    @Post()
    async addToCart(@Request() req: ExpressRequest & { user: any }, @Body() dto: AddToCartDto) {
        return this.cartService.addToCart(req.user.id, dto);
    }

    @Put(':itemId')
    async updateQuantity(
        @Request() req: ExpressRequest & { user: any },
        @Param('itemId') itemId: string,
        @Body() dto: UpdateCartDto,
    ) {
        return this.cartService.updateQuantity(req.user.id, itemId, dto.quantity);
    }

    @Delete(':itemId')
    async removeFromCart(@Request() req: ExpressRequest & { user: any }, @Param('itemId') itemId: string) {
        return this.cartService.removeFromCart(req.user.id, itemId);
    }

    @Delete()
    async clearCart(@Request() req: ExpressRequest & { user: any }) {
        return this.cartService.clearCart(req.user.id);
    }
}
