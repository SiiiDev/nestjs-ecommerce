import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());


  // 2. Enable Validation for DTOs
  app.useGlobalPipes(new ValidationPipe({
     transform: true,
    whitelist: true, // strip properties not in DTO
  }));

  // Serve uploads folder
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });


  app.enableCors({
    origin: 'http://localhost:5173', // Your React dev URL
    credentials: true,               // Allows browser to send cookies back
  });

  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
