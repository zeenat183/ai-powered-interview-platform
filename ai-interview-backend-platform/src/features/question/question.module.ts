import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question, QuestionSchema } from 'src/database/schemas/question.schema';
import { QuestionHelperService } from './question-helper.service';
import { QuestionRepository } from 'src/database/repositories/question.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/jwt.config';
import { RedisModule } from 'src/common/redis/redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: jwtConstants.expiresIn },
      }),  
      RedisModule
  ],
  controllers: [QuestionController],
  providers: [QuestionService,QuestionRepository,QuestionHelperService],
  exports: [QuestionService],
})
export class QuestionModule {}
