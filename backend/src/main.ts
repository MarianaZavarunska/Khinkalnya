import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Access-Control-Allow-Origin',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(8080);
}
bootstrap();
