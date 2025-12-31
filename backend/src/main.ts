import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());


  // 2. Enable Validation for DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strip properties not in DTO
  }));


  app.enableCors({
    origin: 'http://localhost:5173', // Your React dev URL
    credentials: true,               // Allows browser to send cookies back
  });

  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
