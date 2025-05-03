import { QuestionRepository } from '../../database/repositories/question.repository';
import { CreateQuestionDto } from 'src/interfaces/question.dto';
export declare class QuestionHelperService {
    private readonly repo;
    constructor(repo: QuestionRepository);
    createQuestion(dto: CreateQuestionDto): Promise<import("../../database/schemas/question.schema").Question>;
    getAllQuestions(): Promise<import("../../database/schemas/question.schema").Question[]>;
    getQuestionById(id: string): Promise<import("../../database/schemas/question.schema").Question>;
}
