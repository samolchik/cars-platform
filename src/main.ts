import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const environment: string = process.env.NODE_ENV ?? '';
dotenv.config({ path: `environments/${environment}.env` });

async function start() {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cars platform')
    .setDescription(
      'This is a REST API for a platform that allows users to buy and sell cars.',
    )
    .setVersion('1.0')
    .addTag('cars')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelExpandDepth: 1,
      persistAuthorization: true,
    },
  });

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start().then();
