import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './config';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import * as qs from 'qs';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.enableCors();
  app.set('query parser', (query) => (query ? qs.parse(query) : {}));

  const logger = app.get(Logger);
  app.useLogger(logger);

  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  await app.listen(APP_PORT);
  logger.log('App started at port ' + APP_PORT);
}

bootstrap();
