import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para o frontend local
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  // Ativa validação global com class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignora campos não declarados no DTO
      forbidNonWhitelisted: true, // retorna erro se o body tiver campos extras
      transform: true, // transforma payloads em instâncias de DTO
    }),
  );

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();
