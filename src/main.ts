import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './config';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import * as qs from 'qs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.enableCors();
  app.set('query parser', (query) => (query ? qs.parse(query) : {}));

  const logger = app.get(Logger);
  app.useLogger(logger);

  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // API docs
  const config = new DocumentBuilder()
    .setTitle('Booking API')
    .setDescription(
      'API allows view the rooms in the hotel, check their availability, and book them',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(APP_PORT);
  logger.log('App started at port ' + APP_PORT);
}

bootstrap();
