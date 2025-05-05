import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum QuestionType {
  DSA = 'dsa',
  APTITUDE_MCQ = 'aptitude_mcq',
  SYSTEM_DESIGN = 'system_design',
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

// ✅ Templates DTO
class LanguageTemplatesDto {
  @IsString()
  cpp: string;

  @IsString()
  java: string;

  @IsString()
  python: string;

  @IsString()
  javascript: string;
}

// ✅ Test Case DTOs
class ExampleTestCase {
  @IsString()
  input: string;

  @IsString()
  output: string;

  @IsOptional()
  @IsString()
  explanation?: string;
}

class HiddenTestCase {
  @IsString()
  input: string;

  @IsString()
  output: string;
}

// ✅ Question Detail DTOs
export class DsaQuestionDto {
  @IsOptional()
  @IsString()
  constraints?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExampleTestCase)
  exampleTestCases: ExampleTestCase[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HiddenTestCase)
  hiddenTestCases: HiddenTestCase[];

  @ValidateNested()
  @Type(() => LanguageTemplatesDto)
  codeTemplates: LanguageTemplatesDto;
}

export class AptitudeMcqQuestionDto {
  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsString()
  correctAnswer: string;
}

export class SystemDesignQuestionDto {
  @IsString()
  guidelines: string;

  @IsArray()
  @IsString({ each: true })
  evaluationCriteria: string[];
}

// ✅ Main DTOs
export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @IsEnum(QuestionType)
  questionType: QuestionType;

  @IsArray()
  @IsString({ each: true })
  topics: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languagesSupported?: string[];

  @IsNotEmpty()
  ///@ValidateNested()
  questionDetails:
    any;
}

export class QuestionResponseDto {
  @IsString()
  questionId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @IsEnum(QuestionType)
  questionType: QuestionType;

  @IsArray()
  @IsString({ each: true })
  topics: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languagesSupported?: string[];

  @ValidateNested()
  @Type(() => Object)
  questionDetails:
    | { dsaQuestion: DsaQuestionDto }
    | { aptitudeMcq: AptitudeMcqQuestionDto }
    | { systemDesign: SystemDesignQuestionDto };

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;
}
