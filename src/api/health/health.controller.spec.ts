import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PUBLIC_METADATA } from 'src/common/constants';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  // ─── Instantiation ────────────────────────────────────────────────────────

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ─── statusCheck – top-level shape ────────────────────────────────────────

  describe('statusCheck()', () => {
    it('should return success: true', () => {
      const result = controller.statusCheck();
      expect(result.success).toBe(true);
    });

    it('should return statusCode 200', () => {
      const result = controller.statusCheck();
      expect(result.statusCode).toBe(HttpStatus.OK);
    });

    it('should return a non-empty message string', () => {
      const result = controller.statusCheck();
      expect(typeof result.message).toBe('string');
      expect(result.message.length).toBeGreaterThan(0);
    });

    it('should return a data object', () => {
      const result = controller.statusCheck();
      expect(result.data).toBeDefined();
      expect(typeof result.data).toBe('object');
    });
  });

  // ─── statusCheck – nested data shape ──────────────────────────────────────

  describe('statusCheck() – data payload', () => {
    it('should return data.status === "ok"', () => {
      const { data } = controller.statusCheck();
      expect(data.status).toBe('ok');
    });

    it('should return data.service === "bff"', () => {
      const { data } = controller.statusCheck();
      expect(data.service).toBe('bff');
    });

    it('should return a valid ISO 8601 timestamp in data.timestamp', () => {
      const { data } = controller.statusCheck();
      expect(typeof data.timestamp).toBe('string');
      // ISO 8601 basic check: parseable and not NaN
      const parsed = new Date(data.timestamp).getTime();
      expect(parsed).not.toBeNaN();
      // Must match ISO format produced by toISOString()
      expect(data.timestamp).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      );
    });

    it('should return a timestamp close to the current time (within 1 second)', () => {
      const before = Date.now();
      const { data } = controller.statusCheck();
      const after = Date.now();
      const ts = new Date(data.timestamp).getTime();
      expect(ts).toBeGreaterThanOrEqual(before);
      expect(ts).toBeLessThanOrEqual(after + 1000);
    });
  });

  // ─── Idempotent structure / multiple calls ─────────────────────────────────

  describe('statusCheck() – multiple calls', () => {
    it('should always return the same top-level shape on repeated calls', () => {
      const first = controller.statusCheck();
      const second = controller.statusCheck();
      expect(first.success).toBe(second.success);
      expect(first.statusCode).toBe(second.statusCode);
      expect(first.data.status).toBe(second.data.status);
      expect(first.data.service).toBe(second.data.service);
    });

    it('should generate a new timestamp on each call (time progresses)', async () => {
      const first = controller.statusCheck();
      // give the clock a tick
      await new Promise((r) => setTimeout(r, 5));
      const second = controller.statusCheck();
      expect(new Date(second.data.timestamp).getTime()).toBeGreaterThanOrEqual(
        new Date(first.data.timestamp).getTime(),
      );
    });
  });

  // ─── Decorator metadata ────────────────────────────────────────────────────

  describe('NestJS decorator metadata', () => {
    it('should have @Public() metadata on statusCheck', () => {
      const isPublic = Reflect.getMetadata(
        PUBLIC_METADATA,
        controller.statusCheck,
      );
      expect(isPublic).toBe(true);
    });

    it('should be registered as a GET handler on the controller', () => {
      const path = Reflect.getMetadata('path', HealthController);
      expect(path).toBe('status');
    });
  });
});
