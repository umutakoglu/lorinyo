import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { FavoritesModule } from './favorites/favorites.module';
import { SeedModule } from './seed/seed.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { UploadModule } from './upload/upload.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        AuthModule,
        ProductsModule,
        CategoriesModule,
        CartModule,
        OrdersModule,
        ReviewsModule,
        FavoritesModule,
        SeedModule,
        UsersModule,
        SettingsModule,
        UploadModule,
    ],
})
export class AppModule { }
