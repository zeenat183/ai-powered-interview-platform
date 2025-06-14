import { SubmissionService } from './submission.service';
import { CreateSubmissionDto, SubmissionResponseDto } from 'src/interfaces/submission.dto';
import { Observable } from 'rxjs';
export declare class SubmissionController {
    private readonly submissionService;
    constructor(submissionService: SubmissionService);
    createSubmission(dto: CreateSubmissionDto): Observable<SubmissionResponseDto>;
    getSubmissionsByUser(userId: string): Observable<SubmissionResponseDto[]>;
    getSubmissionsByUserId(userId: string, questionId: string): Observable<SubmissionResponseDto>;
}
