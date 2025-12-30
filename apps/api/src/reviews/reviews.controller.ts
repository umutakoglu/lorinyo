import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
    constructor(private reviewsService: ReviewsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createReview(@Request() req: ExpressRequest & { user: any }, @Body() dto: CreateReviewDto) {
        return this.reviewsService.createReview(req.user.id, dto);
    }

    @Get('product/:productId')
    async getProductReviews(@Param('productId') productId: string) {
        return this.reviewsService.getProductReviews(productId);
    }

    @Get('my-reviews')
    @UseGuards(JwtAuthGuard)
    async getUserReviews(@Request() req: ExpressRequest & { user: any }) {
        return this.reviewsService.getUserReviews(req.user.id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateReview(
        @Request() req: ExpressRequest & { user: any },
        @Param('id') id: string,
        @Body() dto: CreateReviewDto,
    ) {
        return this.reviewsService.updateReview(id, req.user.id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteReview(@Request() req: ExpressRequest & { user: any }, @Param('id') id: string) {
        const isAdmin = req.user.role === 'ADMIN';
        return this.reviewsService.deleteReview(id, req.user.id, isAdmin);
    }
}
