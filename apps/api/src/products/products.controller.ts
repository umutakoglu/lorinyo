import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    /**
     * GET /api/products
     * List products with pagination and filters
     */
    @Get()
    async findAll(@Query() query: ProductQueryDto) {
        return this.productsService.findAll(query);
    }

    /**
     * GET /api/products/:slug
     * Get single product by slug
     */
    @Get(':slug')
    async findOne(@Param('slug') slug: string) {
        return this.productsService.findBySlug(slug);
    }

    /**
     * POST /api/products
     * Create new product (Admin/Vendor only)
     */
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN' as any, 'VENDOR' as any)
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    /**
     * PUT /api/products/:id
     * Update product (Admin/Vendor only)
     */
    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN' as any, 'VENDOR' as any)
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productsService.update(id, updateProductDto);
    }

    /**
     * DELETE /api/products/:id
     * Delete product (Admin/Vendor only)
     */
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN' as any, 'VENDOR' as any)
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }

    /**
     * GET /api/products/category/:slug
     * Get products by category
     */
    @Get('category/:slug')
    async findByCategory(@Param('slug') slug: string, @Query() query: ProductQueryDto) {
        return this.productsService.findByCategory(slug, query);
    }

    /**
     * GET /api/products/:id/related
     * Get related products
     */
    @Get(':id/related')
    async findRelated(@Param('id') id: string) {
        return this.productsService.findRelated(id);
    }
}
