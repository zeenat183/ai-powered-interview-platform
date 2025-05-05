import { Observable } from 'rxjs';
import { CreateSubmissionDto, SubmissionResponseDto } from 'src/interfaces/submission.dto';
import { SubmissionHelperService } from './submission-helper.service';
import { Judge0Service } from 'src/http/judge0/judge0.service';
import { QuestionHelperService } from '../question/question-helper.service';
import { CoreSubmissionService } from 'src/core/submission/submission.service';
export declare class SubmissionService {
    private readonly helper;
    private readonly questionHelper;
    private readonly judge0;
    private readonly coreSubmissionService;
    constructor(helper: SubmissionHelperService, questionHelper: QuestionHelperService, judge0: Judge0Service, coreSubmissionService: CoreSubmissionService);
    createSubmission({ dto, }: Readonly<{
        dto: CreateSubmissionDto;
    }>): Observable<SubmissionResponseDto>;
    getSubmissionById(id: string): Observable<SubmissionResponseDto>;
    getSubmissionsByUser(userId: string): Observable<SubmissionResponseDto[]>;
    private mapLanguageToJudge0Id;
    private getStatusFromJudge0;
    private toResponseDto;
}
