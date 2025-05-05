import { Model } from 'mongoose';
import { Submission, SubmissionDocument } from '../schemas/submission.schema';
export declare class SubmissionRepository {
    private readonly submissionModel;
    constructor(submissionModel: Model<SubmissionDocument>);
    create(dto: any): Promise<Submission>;
    findById(submissionId: string): Promise<Submission | null>;
    findAllByUser(userId: string): Promise<Submission[]>;
}
