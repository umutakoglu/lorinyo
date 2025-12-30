import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Enable CORS
    app.enableCors({
        origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        credentials: true,
    });

    // Validations
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    // Serve static files (uploads)
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });

    // API prefix
    app.setGlobalPrefix('api');
    const port = Number(process.env.PORT) || 3101;
    await app.listen(port, '0.0.0.0');
    console.log(`API listening on ${port}`);
}
bootstrap();
