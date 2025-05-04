import { Observable } from 'rxjs';
import { CreateSubmissionDto, SubmissionResponseDto } from 'src/interfaces/submission.dto';
import { SubmissionHelperService } from './submission-helper.service';
import { Judge0Service } from 'src/http/judge0/judge0.service';
export declare class SubmissionService {
    private readonly helper;
    private readonly judge0;
    constructor(helper: SubmissionHelperService, judge0: Judge0Service);
    createSubmission(dto: CreateSubmissionDto): Observable<SubmissionResponseDto>;
    getSubmissionById(id: string): Observable<SubmissionResponseDto>;
    getSubmissionsByUser(userId: string): Observable<SubmissionResponseDto[]>;
    private mapLanguageToJudge0Id;
    private getStatusFromJudge0;
    private toResponseDto;
}
