import { QuestionHelperService } from './question-helper.service';
import { Observable } from 'rxjs';
import { CreateQuestionDto, QuestionResponseDto } from 'src/interfaces/question.dto';
export declare class QuestionService {
    private readonly helper;
    constructor(helper: QuestionHelperService);
    createQuestion(dto: CreateQuestionDto): Observable<QuestionResponseDto>;
    getAllQuestions(): Observable<QuestionResponseDto[]>;
    getQuestionById(id: string): Observable<QuestionResponseDto>;
    private toResponseDto;
}
