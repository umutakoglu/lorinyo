import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './common/prisma/prisma.module';
import { EncryptionModule } from './common/encryption/encryption.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
    imports: [
        // Configuration
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // Schedule (for cron jobs)
        ScheduleModule.forRoot(),

        // BullMQ (Queue system)
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379'),
            },
        }),

        // Core modules
        PrismaModule,
        EncryptionModule,
        AuthModule,
        AuditModule,

        // Feature modules will be added here progressively
    ],
})
export class AppModule { }
