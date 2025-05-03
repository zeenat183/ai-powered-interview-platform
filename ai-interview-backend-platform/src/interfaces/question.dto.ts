// question.dto.ts
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

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
    @ValidateNested()
    @Type(() => Object)
    questionDetails:
      | { dsaQuestion: DsaQuestionDto }
      | { aptitudeMcq: AptitudeMcqQuestionDto }
      | { systemDesign: SystemDesignQuestionDto };
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
// question-response.dto.ts
// export class QuestionResponseDto {
//     questionId: string;
//     title: string;
//     description: string;
//     difficulty: 'easy' | 'medium' | 'hard';
//     topics: string[];
//     languagesSupported: string[];
//     constraints?: string;
//     exampleTestCases: {
//       input: string;
//       output: string;
//       explanation?: string;
//     }[];
//     hiddenTestCases: {
//       input: string;
//       output: string;
//     }[];
//     createdAt: Date;
//     updatedAt: Date;
//   }
  
