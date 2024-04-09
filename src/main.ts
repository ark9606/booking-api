import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './config';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.enableCors();
  app.useLogger(app.get(Logger));
  const logger = app.get(Logger);
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  await app.listen(APP_PORT);
  logger.log('App started at port ' + APP_PORT);
}

bootstrap();
