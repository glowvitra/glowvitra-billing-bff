import morgan from 'morgan';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

export function useRequestLogging(app: NestFastifyApplication) {
  const logger = new CustomLogger('Http');
  const env = process.env.NODE_ENV;
  const logFormat =
    ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms ';

  app.use(
    morgan(logFormat, {
      skip: (req) => env === 'production' || req.url === '/status',
      stream: { write: (message) => logger.log(message.replace('\n', '')) },
    }),
  );
}
