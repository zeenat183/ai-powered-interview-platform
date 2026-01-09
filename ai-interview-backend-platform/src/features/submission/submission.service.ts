import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { CreateSubmissionDto, SubmissionAttemptStatus, SubmissionResponseDto, SubmissionStatus } from 'src/interfaces/submission.dto';
import { SubmissionHelperService } from './submission-helper.service';
import { Judge0Service } from 'src/http/judge0/judge0.service';
import { Submission } from 'src/database/schemas/submission.schema';
import { QuestionHelperService } from '../question/question-helper.service';
import { QuestionType } from 'src/interfaces/question.dto';
import { CoreSubmissionService } from 'src/core/submission/submission.service';


@Injectable()
export class SubmissionService {
  constructor(
    private readonly helper: SubmissionHelperService,
    private readonly questionHelper: QuestionHelperService,
    private readonly judge0: Judge0Service,
    private readonly coreSubmissionService: CoreSubmissionService,
  ) {}

  createSubmission({
    dto,
  }: Readonly<{ dto: CreateSubmissionDto }>): Observable<SubmissionResponseDto> {
    const { submissionDetails, questionId, questionType, userId,status } = dto;
    const timestamp = Date.now(); // current time in milliseconds
    const random = Math.floor(1000 + Math.random() * 9000); // random 4-digit number
    const submissionId= `sub_${timestamp}_${random}`;
    const attempt = {...submissionDetails[0],submissionId,result:null,status:SubmissionAttemptStatus.PENDING,feedback:null,resultMap:{}};
    const language = attempt.language;
  
    const languageId = this.mapLanguageToJudge0Id(language);
  
    return from(this.questionHelper.getQuestionById(questionId)).pipe(
      switchMap((question) => {
        if (!question || question.questionType !== QuestionType.DSA) {
          throw new NotFoundException('Question not found or invalid question');
        }
  
        const questionDetails = question.questionDetails;
        if (!('dsaQuestion' in questionDetails)) {
          throw new NotFoundException('Invalid question type. Expected DSA.');
        }
  
        const dsaQuestion = questionDetails.dsaQuestion;
  
        if (
          !dsaQuestion ||
          !dsaQuestion.codeTemplates ||
          !dsaQuestion.exampleTestCases ||
          !dsaQuestion.hiddenTestCases
        ) {
          throw new NotFoundException('Invalid question structure for DSA type');
        }
  
        const template = dsaQuestion.codeTemplates[language as string];
        if (!template) throw new NotFoundException(`No template for language ${language}`);
  
        return this.coreSubmissionService.wrapCode(
          attempt.answer,
          language as string,
          template,
          dsaQuestion.exampleTestCases,
          dsaQuestion.hiddenTestCases,
        ).pipe(
          switchMap((finalCode) =>{
           return from(this.judge0.submitCode(finalCode, languageId)).pipe(
              map((judge0Result) => ({
                judge0Result,
                dsaQuestion,
                finalCode,
                question
              })),
              catchError((err)=>{
                return throwError(() => new BadRequestException('Failed to process submission using Judge0'));
              })
            )
          }
          )
        );
      }),
      switchMap(({ judge0Result, dsaQuestion ,finalCode,question}) => {
        console.log('--------judge0Result--------',judge0Result);
        attempt.result = judge0Result;
        //attempt.status = this.getStatusFromJudge0(judge0Result.status?.description || '');
  
        // ✅ Apply test case feedback mapping here
        if(!judge0Result?.stderr){
          console.log('-----------here in if-----------------',judge0Result?.stderr);
        const feedback = this.coreSubmissionService.mapTestCaseResults({
          exampleTestCases: dsaQuestion.exampleTestCases,
          hiddenTestCases: dsaQuestion.hiddenTestCases,
          stdout: judge0Result.stdout || '',
        });

        attempt.status=feedback.every((obj)=>{
          return obj.actualOutput===obj.expectedOutput;
        })?SubmissionAttemptStatus.PASSED :SubmissionAttemptStatus.FAILED;
        attempt.resultMap = feedback;
      }
      else {
        attempt.status = SubmissionAttemptStatus.ERROR
      }
      this.coreSubmissionService.addFeedbackJob({userId,questionId,submissionId:attempt?.submissionId,judge0Result,finalCode,dsaQuestion:`${question?.title}\n\n${question?.description}\n\nConstraints:\n${dsaQuestion?.constraints}`,resultMap:attempt?.resultMap }).subscribe({
  next: (res) => console.log('✅ Job added to queue', res),
  error: (err) => console.error('❌ Failed to enqueue job', err),
});
      console.log("----hehe----");
        return from(
          this.createOrUpdateSubmission(
             {
              questionId,
              questionType,
              userId,status,
              submissionDetails: attempt,
            },
          )
        );
      }),
      map((submission) => this.toResponseDto(submission)),
    );
  }

  createOrUpdateSubmission({ questionId,
    questionType,
    userId,status,
    submissionDetails}):Observable<any>{
      console.log("------------here in db update----------");
      return from(this.helper.findByUserAndQuestion(userId,questionId)).pipe(
        switchMap((result)=>{
          if(!result){
            return from(this.helper.createSubmission({
              questionId,
              questionType,
              userId,
              status:submissionDetails.status=== SubmissionAttemptStatus.PASSED ?SubmissionStatus.PASSED :SubmissionStatus.ATTEMPTED,
              submissionDetails: [submissionDetails],
            }));
          }

          const updatedSubmission = {
            questionId,
              questionType,
              userId,
              status: submissionDetails.status=== SubmissionAttemptStatus.PASSED ?SubmissionStatus.PASSED :result.status,
              submissionDetails:[...result.submissionDetails,submissionDetails]
          }
          return from(this.helper.updateSubmission(userId,questionId,updatedSubmission,)); 
        })
      )
    }
  

  // getSubmissionById(id: string): Observable<SubmissionResponseDto> {
  //   return from(this.helper.getSubmissionById(id)).pipe(
  //     map(sub => this.toResponseDto(sub)),
  //   );
  // }

  getSubmissionsByUser(userId: string): Observable<SubmissionResponseDto[]> {
    return from(this.helper.getSubmissionsByUser(userId)).pipe(
      map(submissions => submissions.map(sub => this.toResponseDto(sub))),
    );
  }

  getSubmissionsByUserAndQuestionId({userId,questionId}:Readonly<{userId:string,questionId:string}>): Observable<SubmissionResponseDto> {
    return from(this.helper.getSubmissionsByUserAndQuestion({userId,questionId})).pipe(
      map(submissions =>  this.toResponseDto(submissions)),
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
