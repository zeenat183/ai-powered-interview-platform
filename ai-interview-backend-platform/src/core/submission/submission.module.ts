import { Module } from '@nestjs/common';
import { CoreSubmissionService } from './submission.service';

@Module({
  providers: [CoreSubmissionService],
  exports: [CoreSubmissionService], // 👈 make it available outside
})
export class CoreSubmissionModule {}
