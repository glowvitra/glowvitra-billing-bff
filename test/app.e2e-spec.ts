import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import request from 'supertest';

describe('App (e2e)', () => {
  let app: NestFastifyApplication;
  let dummyService: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    }).compile();

    // Use FastifyAdapter to match main.ts setup, otherwise some decorators or tests might behave differently
    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

    // We do not set the global prefix here to keep tests simpler, 
    // so the controller is routed directly at /status
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  describe('HealthController', () => {
    it('/status (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/status')
        .expect(200);

      expect(response.body).toBeDefined();

      // Since we don't have the global SuccessResponseInterceptor applied in this basic e2e setup
      // (as it's applied in main.ts), the controller itself returns the SuccessResponseDto payload directly.
      expect(response.body.success).toBe(true);
      expect(response.body.statusCode).toBe(200);
      expect(response.body.message).toBe('Service is up and running');
      expect(response.body.data.status).toBe('ok');
      expect(response.body.data.service).toBe('bff');
      expect(response.body.data.timestamp).toBeDefined();
    });
  });

});
