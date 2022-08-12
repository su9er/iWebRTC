import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database/database.module';
import { RoomModule } from '@modules/room/room.module';
import { configGenerator } from '@config/index';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';

@Module({
  imports: [configGenerator(), DatabaseModule, RoomModule, HealthcheckModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
