import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const user = configService.get<string>('DB_USER');
        const password = configService.get<string>('DB_PASSWORD');
        const database = configService.get<string>('DATABASE');
        const host = configService.get<string>('DB_HOST');
        const port = configService.get<number>('DB_PORT');
        return {
          uri: `mongodb://${host}:${port}/${database}`,
          // uri: `mongodb://${user}:${password}@${host}:${port}/${database}`,
        };
      },
    }),
  ],
})
export class DatabaseModule { }
