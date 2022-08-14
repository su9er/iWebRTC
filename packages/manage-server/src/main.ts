import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from '@interceptors/transform.interceptor';
import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('业务管理服务')
    .setDescription('负责管理房间、信令网关服务')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger-api', app, document);

  const rmq_user = configService.get('RMQ_USER');
  const rmq_password = configService.get('RMQ_PASSWORD');
  const rmq_host = configService.get('RMQ_HOST');
  const rmq_port = configService.get('RMQ_PORT');
  const manage_queue = configService.get('MANAGE_QUEUE');

  await app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rmq_user}:${rmq_password}@${rmq_host}:${rmq_port}`],
      queue: manage_queue,
      queueOptions: { durable: false },
    },
  });

  app.startAllMicroservices();

  const port = configService.get('PORT') ?? 3000;

  await app.listen(port);
}
bootstrap();
