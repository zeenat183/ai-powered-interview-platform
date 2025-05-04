// src/features/features.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { SubmissionModule } from './submission/submission.module';

@Module({
  imports: [
    UserModule,
    QuestionModule,
    SubmissionModule
  ],
  exports: [
    UserModule,
    QuestionModule,
    SubmissionModule
  ],
})
export class FeaturesModule {}
