import { QuestionType } from './question.dto';
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
export declare class SubmissionDetailDto {
    answer: string;
    result: Record<string, any>;
    language?: string;
    feedback?: Record<string, any> | null;
    status: SubmissionAttemptStatus;
    submittedAt?: Date;
}
export declare class CreateSubmissionDto {
    userId: string;
    questionId: string;
    questionType: QuestionType;
    status: SubmissionStatus;
    submissionDetails: SubmissionDetailDto[];
}
export declare class SubmissionResponseDto {
    userId: string;
    questionId: string;
    questionType: QuestionType;
    status: SubmissionStatus;
    submissionDetails: SubmissionDetailDto[];
    createdAt?: Date;
    updatedAt?: Date;
    _id?: any;
}
