import { Module } from '@nestjs/common';
import { FeedbackModule } from './feedback/feedback.module';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [FeedbackModule],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
