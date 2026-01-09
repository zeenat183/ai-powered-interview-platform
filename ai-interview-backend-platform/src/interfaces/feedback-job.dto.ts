import { IsNotEmpty, IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class TestCaseResult {
  @IsOptional()
  @IsString()
  input: string;

  @IsOptional()
  @IsString()
  expectedOutput: string;

  @IsOptional()
  @IsString()
  actualOutput: string;
}

export class FeedbackJobDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  questionId: string;

  @IsString()
  @IsNotEmpty()
  submissionId: string;

   @IsString()
  @IsNotEmpty()
  question: string; // Replace 'any' with your strict union type: DsaQuestion | AptitudeMcqQuestion | SystemDesignQuestion

  @IsNotEmpty()
  @IsString()
  code: string;

   @IsNotEmpty()
  @IsString()
  judge0Error: string;

  @IsNotEmpty()
  @IsOptional()
  failedTestCases?: TestCaseResult[];
}
