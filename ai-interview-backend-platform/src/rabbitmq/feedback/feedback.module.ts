// src/rabbitmq/feedback/feedback.module.ts
import { Module } from '@nestjs/common';
import { FeedbackProducer } from './feedback.producer';
import { FeedbackConsumer } from './feeedback.consumer';
import { RabbitMQService } from '../rabbitmq.service';
import { FeedbackHelperService } from './feedback-helper.service';
import { SubmissionRepository } from 'src/database/repositories/submission.repository';
import { Submission, SubmissionSchema } from 'src/database/schemas/submission.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Submission.name, schema: SubmissionSchema }]),
    ],
  providers: [FeedbackProducer, FeedbackConsumer,RabbitMQService,FeedbackHelperService,SubmissionRepository],
  exports: [FeedbackProducer], // so other modules can use the producer
})
export class FeedbackModule {}
