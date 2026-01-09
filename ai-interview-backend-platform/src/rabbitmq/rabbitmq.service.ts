import { Injectable, OnModuleInit } from '@nestjs/common';

// DO NOT use named import — force `require` to avoid type misresolution
const amqplib = require('amqplib');

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private connection: any;
  private channel: any;

  async onModuleInit() {
    this.connection = await amqplib.connect('amqp://admin:admin@rabbitmq');
    this.channel = await this.connection.createChannel();
    console.log('✅ Connected to RabbitMQ');
    await this.channel.assertQueue('feedback_dlq', {
    durable: true,
  });

  // Declare Retry Queue (sends message back to main queue after TTL)
  await this.channel.assertQueue('feedback_retry_queue', {
    durable: true,
    messageTtl: 1000, // 1 seconds delay before retry
    deadLetterExchange: '', // default exchange
    deadLetterRoutingKey: 'feedback_queue',
  });

  // Declare Main Feedback Queue (routes failed messages to retry queue)
  await this.channel.assertQueue('feedback_queue', {
    durable: true,
    deadLetterExchange: '', // default exchange
    deadLetterRoutingKey: 'feedback_retry_queue',
  });
  }

  async getChannel(): Promise<any> {
    if (!this.channel) {
      await this.onModuleInit();
    }
    return this.channel;
  }
}
