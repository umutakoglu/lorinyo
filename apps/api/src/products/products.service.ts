import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto';
import { generateSlug } from '../utils/slug';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    /**
     * Get all products with pagination and filters
     */
    async findAll(query: ProductQueryDto) {
        const {
            page = 1,
            limit = 20,
            take,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            search,
            categoryId,
            categorySlug,
            minPrice,
            maxPrice,
            brand,
            inStock,
        } = query;

        const actualLimit = take || limit;
        const skip = (page - 1) * actualLimit;

        const where: any = {
            isActive: true,
        };

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { sku: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (categoryId) {
            where.categoryId = categoryId;
        }

        // Support categorySlug filter
        if (categorySlug) {
            const category = await this.prisma.category.findUnique({
                where: { slug: categorySlug },
            });
            if (category) {
                where.categoryId = category.id;
            }
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = parseFloat(minPrice);
            if (maxPrice) where.price.lte = parseFloat(maxPrice);
        }

        if (brand) {
            where.brand = brand;
        }

        if (inStock === 'true') {
            where.stock = { gt: 0 };
        }

        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take: actualLimit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    category: true,
                    images: { orderBy: { order: 'asc' } },
                    _count: {
                        select: { reviews: true },
                    },
                },
            }),
            this.prisma.product.count({ where }),
        ]);

        return {
            data: products,
            meta: {
                page,
                limit: actualLimit,
                total,
                totalPages: Math.ceil(total / actualLimit),
            },
        };
    }

    /**
     * Get product by slug
     */
    async findBySlug(slug: string) {
        const product = await this.prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
                images: { orderBy: { order: 'asc' } },
                specifications: { orderBy: { order: 'asc' } },
                variants: true,
                reviews: {
                    include: { user: { select: { name: true } } },
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });

        if (!product) {
            throw new NotFoundException(`Product with slug "${slug}" not found`);
        }

        // Calculate average rating
        const avgRating = await this.prisma.review.aggregate({
            where: { productId: product.id },
            _avg: { rating: true },
            _count: true,
        });

        return {
            ...product,
            averageRating: avgRating._avg.rating || 0,
            reviewCount: avgRating._count,
        };
    }

    /**
     * Create new product
     */
    async create(dto: CreateProductDto) {
        const slug = generateSlug(dto.name);
        const { images, ...productData } = dto;

        const data: any = {
            ...productData,
            slug,
            seoTitle: dto.seoTitle || dto.name,
            seoDescription: dto.seoDescription || dto.shortDescription,
        };

        if (images && images.length > 0) {
            data.images = {
                create: images.map((img, index) => ({
                    ...img,
                    order: img.order ?? index,
                })),
            };
        }

        const product = await this.prisma.product.create({
            data,
            include: {
                category: true,
                images: { orderBy: { order: 'asc' } },
            },
        });

        return product;
    }

    /**
     * Update product
     */
    async update(id: string, dto: UpdateProductDto) {
        const { images, ...productData } = dto;
        const data: any = { ...productData };

        if (images) {
            data.images = {
                deleteMany: {},
                create: images.map((img, index) => ({
                    url: img.url,
                    alt: img.alt,
                    order: index,
                })),
            };
        }

        const product = await this.prisma.product.update({
            where: { id },
            data,
            include: {
                category: true,
                images: { orderBy: { order: 'asc' } },
            },
        });

        return product;
    }

    /**
     * Delete product
     */
    async remove(id: string) {
        await this.prisma.product.delete({ where: { id } });
        return { message: 'Product deleted successfully' };
    }

    /**
     * Get products by category
     */
    async findByCategory(categorySlug: string, query: ProductQueryDto) {
        const category = await this.prisma.category.findUnique({
            where: { slug: categorySlug },
        });

        if (!category) {
            throw new NotFoundException(`Category with slug "${categorySlug}" not found`);
        }

        return this.findAll({ ...query, categoryId: category.id });
    }

    /**
     * Get related products
     */
    async findRelated(productId: string) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            select: { categoryId: true },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return this.prisma.product.findMany({
            where: {
                categoryId: product.categoryId,
                id: { not: productId },
                isActive: true,
            },
            take: 4,
            include: {
                images: { take: 1 },
            },
        });
    }
}
