import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
    constructor(private favoritesService: FavoritesService) { }

    @Get()
    async getFavorites(@Request() req: ExpressRequest & { user: any }) {
        return this.favoritesService.getFavorites(req.user.id);
    }

    @Post(':productId')
    async addToFavorites(@Request() req: ExpressRequest & { user: any }, @Param('productId') productId: string) {
        return this.favoritesService.addToFavorites(req.user.id, productId);
    }

    @Delete(':productId')
    async removeFromFavorites(@Request() req: ExpressRequest & { user: any }, @Param('productId') productId: string) {
        return this.favoritesService.removeFromFavorites(req.user.id, productId);
    }

    @Post(':productId/toggle')
    async toggleFavorite(@Request() req: ExpressRequest & { user: any }, @Param('productId') productId: string) {
        return this.favoritesService.toggleFavorite(req.user.id, productId);
    }

    @Get(':productId/check')
    async checkFavorite(@Request() req: ExpressRequest & { user: any }, @Param('productId') productId: string) {
        return this.favoritesService.checkFavorite(req.user.id, productId);
    }
}
