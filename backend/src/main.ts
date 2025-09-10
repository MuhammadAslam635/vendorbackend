import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname,'..','..', 'public'), {
    prefix: '/public', // This adds /public prefix to URLs
  });

  // Add raw body middleware for Stripe webhooks
  app.use('/transactions/webhook/stripe', express.raw({ type: 'application/json' }));

  const config = new DocumentBuilder()
    .setTitle('Vendor App')
    .setDescription('The Vendor App API description')
    .setVersion('1.0')
    .addTag('vandors')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Add request logging middleware before listening
  app.use((req, res, next) => {
    console.log('Incoming request:', {
      method: req.method,
      path: req.path,
      headers: req.headers,
      body: req.body
    });
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();