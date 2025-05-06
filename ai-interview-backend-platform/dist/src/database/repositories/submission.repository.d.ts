import { Model } from 'mongoose';
import { Submission, SubmissionDocument } from '../schemas/submission.schema';
export declare class SubmissionRepository {
    private readonly submissionModel;
    constructor(submissionModel: Model<SubmissionDocument>);
    create(dto: any): Promise<Submission>;
    findById(submissionId: string): Promise<Submission | null>;
    findAllByUser(userId: string): Promise<Submission[]>;
    findAllByUserAndQuestion({ userId, questionId }: {
        userId: string;
        questionId: string;
    }): Promise<Submission | null>;
    findOne(filter: Record<string, any>): Promise<Submission | null>;
    updateByUserAndQuestion(userId: string, questionId: string, update: Partial<Submission>): Promise<Submission | null>;
}
