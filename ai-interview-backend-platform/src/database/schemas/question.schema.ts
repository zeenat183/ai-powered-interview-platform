import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type QuestionDocument = Question & Document;

//
// ✅ Enums
//

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

//
// ✅ Reusable Types
//

export type LanguageTemplates = {
  cpp: string;
  java: string;
  python: string;
  javascript: string;
};

export type TestCase = {
  input: any[]; // stored as array of values like [5, 7]
  expectedOutput: string;
};

//
// ✅ Question Detail Types (Union by questionType)
//

export interface DsaQuestion {
  constraints?: string;
  exampleTestCases: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  hiddenTestCases: {
    input: string;
    output: string;
  }[];
  codeTemplates: LanguageTemplates;
}

export interface AptitudeMcqQuestion {
  options: string[];
  correctAnswer: string;
}

export interface SystemDesignQuestion {
  guidelines: string;
  evaluationCriteria: string[];
}

export type QuestionDetails =
  | { dsaQuestion: DsaQuestion }
  | { aptitudeMcq: AptitudeMcqQuestion }
  | { systemDesign: SystemDesignQuestion };

//
// ✅ Question Schema
//

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true, unique: true, default: uuidv4 })
  questionId: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ enum: Difficulty, required: true })
  difficulty: Difficulty;

  @Prop({ enum: QuestionType, required: true })
  questionType: QuestionType;

  @Prop({ type: [String], default: [] })
  topics: string[];

  @Prop({ type: [String], required: false })
  languagesSupported?: string[];

  @Prop({ type: Object, required: true })
  questionDetails: QuestionDetails;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
