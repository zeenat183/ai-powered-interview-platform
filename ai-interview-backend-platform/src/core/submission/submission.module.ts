import { Module } from '@nestjs/common';
import { CoreSubmissionService } from './submission.service';
import { FeedbackModule } from 'src/rabbitmq/feedback/feedback.module';

@Module({
  imports:[FeedbackModule],
  providers: [CoreSubmissionService],
  exports: [CoreSubmissionService], // 👈 make it available outside
})
export class CoreSubmissionModule {}
