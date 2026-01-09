// src/rabbitmq/feedback.consumer.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq.service';
import { catchError, EMPTY, from, lastValueFrom, map, mergeMap, of } from 'rxjs';
import { FeedbackJobDto } from 'src/interfaces/feedback-job.dto';
import { FeedbackHelperService } from './feedback-helper.service';
import OpenAI from 'openai';


@Injectable()
export class FeedbackConsumer implements OnModuleInit {
  private readonly queueName = 'feedback_queue';
  private readonly retryQueue = 'feedback_retry_queue';
  private readonly dlqQueue = 'feedback_dlq';
  private readonly maxRetries = 5;

  private readonly openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  constructor(private readonly rabbitMqService: RabbitMQService,
    private readonly feedbackHelper: FeedbackHelperService,
  ) {}

  async onModuleInit() {
    const channel = await this.rabbitMqService.getChannel();
    await channel.assertQueue('feedback_queue', {
    durable: true,
    deadLetterExchange: '',
    deadLetterRoutingKey: 'feedback_retry_queue',
    });

 channel.consume(this.queueName, async (msg) => {
      if (!msg) return;

      const job: FeedbackJobDto = JSON.parse(msg.content.toString());
      const retryCount = parseInt(msg.properties.headers['x-retry-count'] || '0');
      console.log("---------------consuming---------------");

      try {
        await lastValueFrom(
          of(job).pipe(
            map((job) => ({
              prompt: this.feedbackHelper.generateFeedbackPrompt({
                question: job.question,
                wrappedCode: job.code,
                judge0Error: job.judge0Error,
                failedTestCases:job.failedTestCases,
              }),
              job,
            })),
            mergeMap(({ prompt, job }) =>
              from(
                this.openai.chat.completions.create({
                  model: 'gpt-3.5-turbo',
                  messages: [{ role: 'user', content: prompt }],
                })
              ).pipe(
                map((res) => ({
                  feedback: res.choices[0].message.content,
                  job,
                }))
              )
            ),
            mergeMap(({ feedback, job }) =>
              from(
                this.feedbackHelper.updateSubmissionFeedback({
                  userId: job.userId,
                  questionId: job.questionId,
                  submissionId: job.submissionId,
                  feedback,
                })
              )
            ),
            catchError((err) => {
              console.error(`❌ Job processing failed (attempt ${retryCount + 1}):`, err);

              if (retryCount >= this.maxRetries) {
                console.warn(`❌ Max retry attempts reached. Moving to DLQ.`);
                channel.sendToQueue(this.dlqQueue, msg.content, {
                  persistent: true,
                });
              } else {
                console.warn(`⏳ Retrying job in ${retryCount + 1} attempt(s)...`);
                channel.sendToQueue(this.retryQueue, msg.content, {
                  headers: {
                    'x-retry-count': retryCount + 1,
                  },
                  persistent: true,
                });
              }

              channel.ack(msg); // Always ACK to prevent requeue by broker
              return EMPTY;
            })
          )
        );

        channel.ack(msg);
      } catch (err) {
        console.error('❌ Unexpected error outside RxJS pipeline:', err);
        channel.nack(msg, false, false); // fallback to DLQ if pipeline setup fails
      }
    });
  }
}
