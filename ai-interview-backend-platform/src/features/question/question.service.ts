import { Injectable } from '@nestjs/common';
import { QuestionHelperService } from './question-helper.service';
import { from, map, Observable } from 'rxjs';
import { CreateQuestionDto, QuestionResponseDto, QuestionType } from 'src/interfaces/question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly helper: QuestionHelperService) {}

  createQuestion(dto: CreateQuestionDto): Observable<QuestionResponseDto> {
    return from(this.helper.createQuestion(dto)).pipe(
      map(question => this.toResponseDto(question))
    );
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
