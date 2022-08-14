import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RpcController } from './rpc.controller';

@Module({
  imports: [ConfigModule],
  controllers: [RpcController],
  providers: [
    {
      provide: 'SIGNAL_GATEWAY',
      useFactory: (configService: ConfigService) => {
        const rmq_user = configService.get('RMQ_USER');
        const rmq_password = configService.get('RMQ_PASSWORD');
        const rmq_host = configService.get('RMQ_HOST');
        const rmq_port = configService.get('RMQ_PORT');
        const signal_gateway_queue = configService.get('SIGNAL_GATEWAY_QUEUE');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${rmq_user}:${rmq_password}@${rmq_host}:${rmq_port}`,
            ],
            queue: signal_gateway_queue,
            queueOptions: { durable: false },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['SIGNAL_GATEWAY'],
})
export class RpcModule { }
