import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto';

@Injectable()
export class ReviewsService {
    constructor(private prisma: PrismaService) { }

    async createReview(userId: string, dto: CreateReviewDto) {
        // Check if product exists
        const product = await this.prisma.product.findUnique({
            where: { id: dto.productId },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        // Check if user already reviewed this product
        const existingReview = await this.prisma.review.findFirst({
            where: {
                userId,
                productId: dto.productId,
            },
        });

        if (existingReview) {
            throw new BadRequestException('You have already reviewed this product');
        }

        // Check if user purchased this product (optional verification)
        const hasPurchased = await this.prisma.orderItem.findFirst({
            where: {
                productId: dto.productId,
                order: {
                    userId,
                    status: 'DELIVERED',
                },
            },
        });

        return this.prisma.review.create({
            data: {
                userId,
                productId: dto.productId,
                rating: dto.rating,
                title: dto.title,
                comment: dto.comment,
                isVerified: !!hasPurchased,
            },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    async getProductReviews(productId: string) {
        const reviews = await this.prisma.review.findMany({
            where: { productId },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        const stats = await this.prisma.review.aggregate({
            where: { productId },
            _avg: { rating: true },
            _count: true,
        });

        return {
            reviews,
            stats: {
                averageRating: stats._avg.rating || 0,
                totalReviews: stats._count,
            },
        };
    }

    async getUserReviews(userId: string) {
        return this.prisma.review.findMany({
            where: { userId },
            include: {
                product: {
                    select: {
                        name: true,
                        slug: true,
                        images: { take: 1 },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateReview(reviewId: string, userId: string, dto: Partial<CreateReviewDto>) {
        const review = await this.prisma.review.findFirst({
            where: { id: reviewId, userId },
        });

        if (!review) {
            throw new NotFoundException('Review not found');
        }

        return this.prisma.review.update({
            where: { id: reviewId },
            data: {
                rating: dto.rating,
                title: dto.title,
                comment: dto.comment,
            },
            include: {
                user: {
                    select: { name: true },
                },
            },
        });
    }

    async deleteReview(reviewId: string, userId: string, isAdmin: boolean = false) {
        const where = isAdmin ? { id: reviewId } : { id: reviewId, userId };

        const review = await this.prisma.review.findFirst({ where });

        if (!review) {
            throw new NotFoundException('Review not found');
        }

        await this.prisma.review.delete({ where: { id: reviewId } });
        return { message: 'Review deleted successfully' };
    }
}
