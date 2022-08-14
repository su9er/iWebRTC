import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database/database.module';
import { RoomModule } from '@modules/room/room.module';
import { configGenerator } from '@config/index';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { RpcModule } from './modules/rpc/rpc.module';
import { MiddlewareConsumer } from '@nestjs/common';
import LogsMiddleware from '@middlewares/logs.middleware';

@Module({
  imports: [
    configGenerator(),
    DatabaseModule,
    RoomModule,
    HealthcheckModule,
    RpcModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
