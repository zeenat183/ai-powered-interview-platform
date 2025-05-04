import { Injectable } from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';
import { CreateSubmissionDto, SubmissionAttemptStatus, SubmissionResponseDto } from 'src/interfaces/submission.dto';
import { SubmissionHelperService } from './submission-helper.service';
import { Judge0Service } from 'src/http/judge0/judge0.service';
import { Submission } from 'src/database/schemas/submission.schema';


@Injectable()
export class SubmissionService {
  constructor(
    private readonly helper: SubmissionHelperService,
    private readonly judge0: Judge0Service,
  ) {}

  createSubmission(dto: CreateSubmissionDto): Observable<SubmissionResponseDto> {
    const { submissionDetails, ...rest } = dto;
    const attempt = submissionDetails[0];

    const languageId = this.mapLanguageToJudge0Id(attempt.language);

    return from(
      this.judge0.submitCode(attempt.answer, languageId)
    ).pipe(
      switchMap((judge0Result) => {
        attempt.result = judge0Result;
        attempt.status = this.getStatusFromJudge0(judge0Result.status?.description || '');
        return from(
          this.helper.createSubmission({ ...rest, submissionDetails: [attempt] })
        );
      }),
      map(submission => this.toResponseDto(submission)),
    );
  }

  getSubmissionById(id: string): Observable<SubmissionResponseDto> {
    return from(this.helper.getSubmissionById(id)).pipe(
      map(sub => this.toResponseDto(sub)),
    );
  }

  getSubmissionsByUser(userId: string): Observable<SubmissionResponseDto[]> {
    return from(this.helper.getSubmissionsByUser(userId)).pipe(
      map(submissions => submissions.map(sub => this.toResponseDto(sub))),
    );
  }

  // 🔧 FIXED: Inside class now
  private mapLanguageToJudge0Id(lang?: string): number {
    const map: Record<string, number> = {
      cpp: 54,
      python: 71,
      java: 62,
      javascript: 63,
    };
    return map[lang || ''] || 54; // fallback to cpp
  }

  private getStatusFromJudge0(description: string): SubmissionAttemptStatus {
    const lower = description.toLowerCase();
  
    if (lower.includes('accepted')) return SubmissionAttemptStatus.PASSED;
    if (lower.includes('error') || lower.includes('failed')) return SubmissionAttemptStatus.ERROR;
    return SubmissionAttemptStatus.FAILED;
  }

  private toResponseDto(sub: Submission): SubmissionResponseDto {
    return {
     // _id: sub._id.toString(),
      userId: sub.userId,
      questionId: sub.questionId,
      questionType: sub.questionType,
      status: sub.status,
      submissionDetails: sub.submissionDetails,
      createdAt: sub.createdAt,
      updatedAt: sub.updatedAt,
    };
  }
}
