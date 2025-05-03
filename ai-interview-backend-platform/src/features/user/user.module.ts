import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../database/schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from '../../database/repositories/user.repository';
import { jwtConstants } from 'src/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { UserHelperService } from './user-helper.service';
import { RedisModule } from 'src/common/redis/redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    RedisModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository,UserHelperService],
  exports: [UserService],
})
export class UserModule {}
