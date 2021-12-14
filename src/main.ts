import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

// Swagger page:  http://localhost:3000/api/note/static/index.html
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('marin-note-service')
    .setVersion('1.0')
    .addTag('note')
    .build();
  const briefDocument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/note', app, briefDocument);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
