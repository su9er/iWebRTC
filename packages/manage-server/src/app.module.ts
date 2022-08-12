import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database/database.module';
import { RoomModule } from '@modules/room/room.module';
import { configGenerator } from '@config/index';

@Module({
  imports: [configGenerator(), DatabaseModule, RoomModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
