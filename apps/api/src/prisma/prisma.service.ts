import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    /**
     * Clean database - useful for testing
     */
    async cleanDatabase() {
        // Get all model names (filter out private properties and constructor)
        const models = Reflect.ownKeys(this).filter(
            (key) => typeof key === 'string' && key[0] !== '_' && key !== 'constructor',
        );

        return Promise.all(
            models.map((modelKey) => {
                const model = (this as any)[modelKey as string];
                if (model && typeof model.deleteMany === 'function') {
                    return model.deleteMany();
                }
                return Promise.resolve();
            }),
        );
    }
}
