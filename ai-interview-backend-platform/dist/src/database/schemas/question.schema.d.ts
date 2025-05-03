import { Document } from 'mongoose';
export type QuestionDocument = Question & Document;
declare enum QuestionType {
    DSA = "dsa",
    APTITUDE_MCQ = "aptitude_mcq",
    SYSTEM_DESIGN = "system_design"
}
export declare enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}
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
}
export interface AptitudeMcqQuestion {
    options: string[];
    correctAnswer: string;
}
export interface SystemDesignQuestion {
    guidelines: string;
    evaluationCriteria: string[];
}
export type QuestionDetails = {
    dsaQuestion: DsaQuestion;
} | {
    aptitudeMcq: AptitudeMcqQuestion;
} | {
    systemDesign: SystemDesignQuestion;
};
export declare class Question {
    questionId: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    questionType: QuestionType;
    topics: string[];
    languagesSupported?: string[];
    questionDetails: QuestionDetails;
}
export declare const QuestionSchema: import("mongoose").Schema<Question, import("mongoose").Model<Question, any, any, any, Document<unknown, any, Question, any> & Question & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Question, Document<unknown, {}, import("mongoose").FlatRecord<Question>, {}> & import("mongoose").FlatRecord<Question> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
