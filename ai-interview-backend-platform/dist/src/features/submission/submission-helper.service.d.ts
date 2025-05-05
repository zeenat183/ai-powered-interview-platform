import { SubmissionRepository } from 'src/database/repositories/submission.repository';
import { CreateSubmissionDto } from 'src/interfaces/submission.dto';
export declare class SubmissionHelperService {
    private readonly repo;
    constructor(repo: SubmissionRepository);
    createSubmission(dto: CreateSubmissionDto): Promise<import("../../database/schemas/submission.schema").Submission>;
    getSubmissionById(id: string): Promise<import("../../database/schemas/submission.schema").Submission>;
    getSubmissionsByUser(userId: string): Promise<import("../../database/schemas/submission.schema").Submission[]>;
}
