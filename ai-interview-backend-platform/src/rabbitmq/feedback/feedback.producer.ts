// src/rabbitmq/feedback.producer.ts
import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq.service';
import { FeedbackJobDto } from 'src/interfaces/feedback-job.dto';


@Injectable()
export class FeedbackProducer {
  private readonly queueName = 'feedback_queue';

  constructor(private readonly rabbitMqService: RabbitMQService) {}

  async publishFeedbackJob(data: FeedbackJobDto): Promise<void> {
    console.log("-------here gonna add the job-------------");
    const channel = await this.rabbitMqService.getChannel();
    //await channel.assertQueue(this.queueName, { durable: true });
    await channel.assertQueue('feedback_queue', {
     durable: true,
     deadLetterExchange: '',
     deadLetterRoutingKey: 'feedback_retry_queue',
    });
    channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(data)), {
      persistent: true,
    });
  }
}
