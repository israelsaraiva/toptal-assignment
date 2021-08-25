import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  const options = new DocumentBuilder()
    .setTitle('Restaurant API')
    .setDescription('Restaurant API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // http://localhost:3045/api/
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}

if (Number.isNaN(Number(process.env.PORT))) {
  console.error('No port provided. 👏', process.env.PORT);
  process.exit(666);
}

bootstrap().then(() => console.log('Service listening 👍: ', process.env.PORT));
