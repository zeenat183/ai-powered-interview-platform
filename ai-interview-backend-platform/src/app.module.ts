import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';//NestJS uses @nestjs/config to read environment variables from a .env file like MONGODB_URI.
import { UserModule } from './features/user/user.module';
import { RedisModule } from './common/redis/redis.module';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URI,
      }),
    }),
    //MongooseModule.forRoot(process.env.MONGODB_URI as string),
    DatabaseModule,
    FeaturesModule,
    RedisModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
