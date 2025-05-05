import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubmissionDocument = Submission & Document;

// ------------------ ENUMS ------------------

export enum QuestionType {
  DSA = 'dsa',
  APTITUDE_MCQ = 'aptitude_mcq',
  SYSTEM_DESIGN = 'system_design',
}

export enum SubmissionAttemptStatus {
  PENDING = 'pending',
  PASSED = 'passed',
  FAILED = 'failed',
  ERROR = 'error',
}

export enum SubmissionStatus {
  NOT_ATTEMPTED = 'not_attempted',
  ATTEMPTED = 'attempted',
  PASSED = 'passed',
}

// ------------------ SUBMISSION DETAIL ------------------

@Schema({ _id: false }) // _id: false is important for embedded subdocuments
export class MappedTestCaseResult {
  @Prop({ required: true })
  input: string;

  @Prop({ required: true })
  expectedOutput: string;

  @Prop({ required: true })
  actualOutput: string;

  @Prop({ required: true, enum: ['example', 'hidden'] })
  type: 'example' | 'hidden';
}

@Schema()
export class SubmissionDetail {
  @Prop({ required: true })
  answer: string;

  @Prop({ required: true, type: Object })
  result: Record<string, any>;

  @Prop()
  language?: string;

  @Prop({ type: Object, default: null })
  feedback?: Record<string, any> | null;

  @Prop({ required: true, enum: Object.values(SubmissionAttemptStatus) })
  status: SubmissionAttemptStatus;

  @Prop({ type: [MappedTestCaseResult], default: [] })
  resultMap?: MappedTestCaseResult[];

  @Prop({ default: Date.now })
  submittedAt?: Date;
}

const SubmissionDetailSchema = SchemaFactory.createForClass(SubmissionDetail);

// ------------------ MAIN SUBMISSION SCHEMA ------------------

@Schema({ timestamps: true })
export class Submission {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  questionId: string;

  @Prop({ required: true, enum: Object.values(QuestionType) })
  questionType: QuestionType;

  @Prop({ type: [SubmissionDetailSchema], default: [] })
  submissionDetails: SubmissionDetail[];

  @Prop({ required: true, enum: Object.values(SubmissionStatus), default: SubmissionStatus.NOT_ATTEMPTED })
  status: SubmissionStatus;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
