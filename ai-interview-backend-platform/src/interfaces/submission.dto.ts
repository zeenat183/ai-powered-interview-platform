import {
    IsEnum,
    IsNotEmpty,
    IsString,
    ValidateNested,
    ArrayMinSize,
    IsOptional,
    IsObject,
    IsDate,
  } from 'class-validator';
  import { Type } from 'class-transformer';
import { QuestionType } from './question.dto';

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

  export class SubmissionDetailDto {
    @IsString()
    @IsNotEmpty()
    answer: string;
  
    @IsObject()
    @IsNotEmpty()
    result: Record<string, any>;
  
    @IsOptional()
    @IsString()
    language?: string;
  
    @IsOptional()
    @IsObject()
    feedback?: Record<string, any>|null;
  
    @IsEnum(SubmissionAttemptStatus)
    status: SubmissionAttemptStatus;
  
    @IsOptional()
    submittedAt?: Date;
  }
  
  export class CreateSubmissionDto {
    @IsString()
    @IsNotEmpty()
    userId: string;
  
    @IsString()
    @IsNotEmpty()
    questionId: string;
  
    @IsEnum(QuestionType)
    questionType: QuestionType;
  
    @IsEnum(SubmissionStatus)
    status: SubmissionStatus;
  
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => SubmissionDetailDto)
    submissionDetails: SubmissionDetailDto[];
  }
  
  export class SubmissionResponseDto {
    // @IsString()
    // _id: string;
  
    @IsString()
    userId: string;
  
    @IsString()
    questionId: string;
  
    @IsEnum(QuestionType)
    questionType: QuestionType;
  
    @IsEnum(SubmissionStatus)
    status: SubmissionStatus;
  
    @ValidateNested({ each: true })
    @Type(() => SubmissionDetailDto)
    submissionDetails: SubmissionDetailDto[];
  
    // @IsDate()
    // createdAt: Date;
  
    // @IsDate()
    // updatedAt: Date;
    createdAt?: Date;
  updatedAt?: Date;
  _id?: any; 
  }