import { NestFactory } from '@nestjs/core';
import { CustomLogger } from './common/logger/custom-logger.service';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as K from './common/constants';
import { useRequestLogging } from './middlewares/request-logger.middleware';
import { VersioningType } from '@nestjs/common';
import { SuccessResponseInterceptor } from './interceptors/success-response.interceptor';
import { ConfigService } from '@nestjs/config';
import { swaggerAuth } from './middlewares/swagger-auth.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { name, description, version } from 'package.json';

async function bootstrap() {
  const logger = new CustomLogger('Main');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: K.MAX_JSON_REQUEST_SIZE }),
    { rawBody: true },
  );

  app.useLogger(logger);
  useRequestLogging(app);
  app.setGlobalPrefix(K.API_GLOBAL_PREFIX);
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('config.server.port') || K.DEFAULT_PORT;
  const env = config.get<string>('config.server.env');
  const swaggerEnabled = config.get('config.swagger.enabled');

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  if (swaggerEnabled) {
    app.use('/docs', swaggerAuth);
    const options = new DocumentBuilder()
      .setTitle(name)
      .setDescription(`${description}\nRunning on ${env} Mode`)
      .addBearerAuth()
      .setVersion(version)
      .addServer(`http://localhost:${port}`, 'Local Server')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(parseInt(port, 10), '0.0.0.0');
  logger.log(`🚀 Application is running on port ${port} in ${env} environment`);
}

void bootstrap();
