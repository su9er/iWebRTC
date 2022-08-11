import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@modules/database/database.module';
import { RoomsModule } from '@modules/rooms/rooms.module';
import { configGenerator } from '@config/index';

@Module({
  imports: [configGenerator(), DatabaseModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
