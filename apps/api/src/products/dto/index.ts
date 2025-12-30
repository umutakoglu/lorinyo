import { IsString, IsNumber, IsOptional, IsBoolean, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductImageDto {
    @IsString()
    url: string;

    @IsString()
    @IsOptional()
    alt?: string;

    @IsNumber()
    @IsOptional()
    order?: number;
}

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    shortDescription?: string;

    @IsString()
    sku: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    originalPrice?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    cost?: number;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsString()
    categoryId: string;

    @IsString()
    @IsOptional()
    brand?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsBoolean()
    @IsOptional()
    isFeatured?: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductImageDto)
    @IsOptional()
    images?: ProductImageDto[];

    @IsString()
    @IsOptional()
    seoTitle?: string;

    @IsString()
    @IsOptional()
    seoDescription?: string;

    @IsString()
    @IsOptional()
    seoKeywords?: string;
}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    shortDescription?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    originalPrice?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    stock?: number;

    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsBoolean()
    @IsOptional()
    isFeatured?: boolean;

    @IsString()
    @IsOptional()
    sku?: string;

    @IsString()
    @IsOptional()
    brand?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductImageDto)
    @IsOptional()
    images?: ProductImageDto[];
}

export class ProductQueryDto {
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    page?: number;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    limit?: number;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    take?: number;

    @IsString()
    @IsOptional()
    sortBy?: string;

    @IsString()
    @IsOptional()
    sortOrder?: 'asc' | 'desc';

    @IsString()
    @IsOptional()
    search?: string;

    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsString()
    @IsOptional()
    minPrice?: string;

    @IsString()
    @IsOptional()
    maxPrice?: string;

    @IsString()
    @IsOptional()
    brand?: string;

    @IsString()
    @IsOptional()
    inStock?: string;

    @IsString()
    @IsOptional()
    featured?: string;

    @IsString()
    @IsOptional()
    categorySlug?: string;
}
