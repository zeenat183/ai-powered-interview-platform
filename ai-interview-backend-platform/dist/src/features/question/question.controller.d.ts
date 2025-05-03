import { QuestionService } from './question.service';
import { CreateQuestionDto, QuestionResponseDto } from 'src/interfaces/question.dto';
import { Observable } from 'rxjs';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(dto: CreateQuestionDto): Observable<QuestionResponseDto>;
    getAll(): Observable<QuestionResponseDto[]>;
    getById(id: string): Observable<QuestionResponseDto>;
}
