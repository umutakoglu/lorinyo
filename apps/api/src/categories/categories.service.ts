import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { generateSlug } from '../utils/slug';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.category.findMany({
            include: {
                parent: true,
                children: true,
                _count: {
                    select: { products: true },
                },
            },
            orderBy: { name: 'asc' },
        });
    }

    async findBySlug(slug: string) {
        const category = await this.prisma.category.findUnique({
            where: { slug },
            include: {
                parent: true,
                children: true,
                _count: {
                    select: { products: true },
                },
            },
        });

        if (!category) {
            throw new NotFoundException(`Category with slug "${slug}" not found`);
        }

        return category;
    }

    async create(dto: CreateCategoryDto) {
        const slug = generateSlug(dto.name);

        return this.prisma.category.create({
            data: {
                ...dto,
                slug,
            },
            include: {
                parent: true,
            },
        });
    }

    async update(id: string, dto: UpdateCategoryDto) {
        return this.prisma.category.update({
            where: { id },
            data: dto,
            include: {
                parent: true,
                children: true,
            },
        });
    }

    async remove(id: string) {
        await this.prisma.category.delete({ where: { id } });
        return { message: 'Category deleted successfully' };
    }

    async getProducts(slug: string) {
        const category = await this.findBySlug(slug);

        return this.prisma.product.findMany({
            where: { categoryId: category.id, isActive: true },
            include: {
                images: { take: 1 },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
