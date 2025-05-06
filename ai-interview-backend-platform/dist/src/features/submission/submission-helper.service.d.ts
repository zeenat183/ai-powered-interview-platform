import { SubmissionRepository } from 'src/database/repositories/submission.repository';
import { CreateSubmissionDto } from 'src/interfaces/submission.dto';
import { Submission } from 'src/database/schemas/submission.schema';
export declare class SubmissionHelperService {
    private readonly repo;
    constructor(repo: SubmissionRepository);
    createSubmission(dto: CreateSubmissionDto): Promise<Submission | null>;
    getSubmissionById(id: string): Promise<Submission>;
    getSubmissionsByUser(userId: string): Promise<Submission[]>;
    getSubmissionsByUserAndQuestion({ userId, questionId }: {
        userId: any;
        questionId: any;
    }): Promise<Submission>;
    findByUserAndQuestion(userId: string, questionId: string): Promise<Submission | null>;
    updateSubmission(userId: string, questionId: string, updatedSubmission: Partial<Submission>): Promise<Submission>;
}
