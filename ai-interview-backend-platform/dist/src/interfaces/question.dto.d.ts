export declare enum QuestionType {
    DSA = "dsa",
    APTITUDE_MCQ = "aptitude_mcq",
    SYSTEM_DESIGN = "system_design"
}
export declare enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}
declare class LanguageTemplatesDto {
    cpp: string;
    java: string;
    python: string;
    javascript: string;
}
declare class ExampleTestCase {
    input: string;
    output: string;
    explanation?: string;
}
declare class HiddenTestCase {
    input: string;
    output: string;
}
export declare class DsaQuestionDto {
    constraints?: string;
    exampleTestCases: ExampleTestCase[];
    hiddenTestCases: HiddenTestCase[];
    codeTemplates: LanguageTemplatesDto;
}
export declare class AptitudeMcqQuestionDto {
    options: string[];
    correctAnswer: string;
}
export declare class SystemDesignQuestionDto {
    guidelines: string;
    evaluationCriteria: string[];
}
export declare class CreateQuestionDto {
    title: string;
    description: string;
    difficulty: Difficulty;
    questionType: QuestionType;
    topics: string[];
    languagesSupported?: string[];
    questionDetails: any;
}
export declare class QuestionResponseDto {
    questionId: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    questionType: QuestionType;
    topics: string[];
    languagesSupported?: string[];
    questionDetails: {
        dsaQuestion: DsaQuestionDto;
    } | {
        aptitudeMcq: AptitudeMcqQuestionDto;
    } | {
        systemDesign: SystemDesignQuestionDto;
    };
    createdAt: Date;
    updatedAt: Date;
}
export {};
