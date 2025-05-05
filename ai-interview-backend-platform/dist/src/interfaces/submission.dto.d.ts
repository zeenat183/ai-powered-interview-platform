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
export declare class MappedTestCaseResultDto {
    input: string;
    expectedOutput: string;
    actualOutput: string;
    type: 'example' | 'hidden';
}
export declare class SubmissionDetailDto {
    answer: string;
    language?: string;
    submittedAt?: Date;
}
export declare class SubmissionResultDetailsDto extends SubmissionDetailDto {
    feedback?: Record<string, any> | null;
    resultMap?: MappedTestCaseResultDto[] | null;
    status: SubmissionAttemptStatus;
    result: Record<string, any>;
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
    submissionDetails: SubmissionResultDetailsDto[];
    createdAt?: Date;
    updatedAt?: Date;
    _id?: any;
}
