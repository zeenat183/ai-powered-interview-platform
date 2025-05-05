import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionHelperService } from './question-helper.service';
import { from, map, Observable } from 'rxjs';
import { AptitudeMcqQuestionDto, CreateQuestionDto, DsaQuestionDto, QuestionResponseDto, QuestionType, SystemDesignQuestionDto } from 'src/interfaces/question.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class QuestionService {
  constructor(private readonly helper: QuestionHelperService) {}

  createQuestion(dto: CreateQuestionDto): Observable<QuestionResponseDto> {
    return from(this.helper.createQuestion(dto)).pipe(
      map(question => this.toResponseDto(question))
    );
  }

  validateAndAssignQuestionDetails(
    dto: CreateQuestionDto,
    body: any,
  ): void {
    const details = body.questionDetails;
  
    switch (dto.questionType) {
      case QuestionType.DSA:
        if (!details?.dsaQuestion) {
          throw new BadRequestException('Missing `dsaQuestion` details for DSA type');
        }
        dto.questionDetails = {
          dsaQuestion: plainToInstance(DsaQuestionDto, details.dsaQuestion),
        };
        break;
  
      case QuestionType.APTITUDE_MCQ:
        if (!details?.aptitudeMcq) {
          throw new BadRequestException('Missing `aptitudeMcq` details for APTITUDE_MCQ type');
        }
        dto.questionDetails = {
          aptitudeMcq: plainToInstance(AptitudeMcqQuestionDto, details.aptitudeMcq),
        };
        break;
  
      case QuestionType.SYSTEM_DESIGN:
        if (!details?.systemDesign) {
          throw new BadRequestException('Missing `systemDesign` details for SYSTEM_DESIGN type');
        }
        dto.questionDetails = {
          systemDesign: plainToInstance(SystemDesignQuestionDto, details.systemDesign),
        };
        break;
  
      default:
        throw new BadRequestException('Invalid or missing `questionType`');
    }
  }

  getAllQuestions(): Observable<QuestionResponseDto[]> {
    return from(this.helper.getAllQuestions()).pipe(
      map(questions => questions.map(q => this.toResponseDto(q)))
    );
  }

  getQuestionById(id: string): Observable<QuestionResponseDto> {
    return from(this.helper.getQuestionById(id)).pipe(
      map(question => this.toResponseDto(question))
    );
  }

  private toResponseDto(question: any): QuestionResponseDto {
    let questionDetails: QuestionResponseDto['questionDetails'];
  
    switch (question.questionType) {
      case QuestionType.DSA:
        questionDetails = { dsaQuestion: question.questionDetails.dsaQuestion };
        break;
  
      case QuestionType.APTITUDE_MCQ:
        questionDetails = { aptitudeMcq: question.questionDetails.aptitudeMcq };
        break;
  
      case QuestionType.SYSTEM_DESIGN:
        questionDetails = { systemDesign: question.questionDetails.systemDesign };
        break;
  
      default:
        throw new Error(`Unsupported question type: ${question.questionType}`);
    }
  
    return {
      questionId: question.questionId,
      title: question.title,
      description: question.description,
      difficulty: question.difficulty,
      questionType: question.questionType,
      topics: question.topics,
      languagesSupported: question.languagesSupported,
      questionDetails,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }
  
}
