import { Document } from 'mongoose';
export type SubmissionDocument = Submission & Document;
export declare enum QuestionType {
    DSA = "dsa",
    APTITUDE_MCQ = "aptitude_mcq",
    SYSTEM_DESIGN = "system_design"
}
export declare enum SubmissionAttemptStatus {
    PENDING = "pending",
    PASSED = "passed",
    FAILED = "failed",
    ERROR = "error"
}
export declare enum SubmissionStatus {
    NOT_ATTEMPTED = "not_attempted",
    ATTEMPTED = "attempted",
    PASSED = "passed"
}
export declare class MappedTestCaseResult {
    input: string;
    expectedOutput: string;
    actualOutput: string;
    type: 'example' | 'hidden';
}
export declare class SubmissionDetail {
    answer: string;
    result: Record<string, any>;
    language?: string;
    feedback?: Record<string, any> | null;
    status: SubmissionAttemptStatus;
    resultMap?: MappedTestCaseResult[];
    submittedAt?: Date;
}
export declare class Submission {
    userId: string;
    questionId: string;
    questionType: QuestionType;
    submissionDetails: SubmissionDetail[];
    status: SubmissionStatus;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}
export declare const SubmissionSchema: import("mongoose").Schema<Submission, import("mongoose").Model<Submission, any, any, any, Document<unknown, any, Submission, any> & Submission & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Submission, Document<unknown, {}, import("mongoose").FlatRecord<Submission>, {}> & import("mongoose").FlatRecord<Submission> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
