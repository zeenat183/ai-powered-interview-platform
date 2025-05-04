import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Submission, SubmissionSchema } from 'src/database/schemas/submission.schema';
import { SubmissionController } from './submmission.controller';
import { SubmissionService } from './submission.service';
import { SubmissionHelperService } from './submission-helper.service';
import { Judge0Module } from 'src/http/judge0/judge0.module';
import { SubmissionRepository } from 'src/database/repositories/submission.repository';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Submission.name, schema: SubmissionSchema }]),
    Judge0Module
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService, SubmissionHelperService,SubmissionRepository],
  exports: [SubmissionService],
})
export class SubmissionModule {}
