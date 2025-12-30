import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Controller, Get } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

@Controller('health-check')
class HealthController {
    @Get()
    health() {
        return { status: 'ok' };
    }
}

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            controllers: [HealthController],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('/health-check (GET) - Verifies server is up without port binding', () => {
        return request(app.getHttpServer())
            .get('/health-check')
            .expect(200)
            .expect({ status: 'ok' });
    });
});
