import { Model } from 'mongoose';
import { Question, QuestionDocument } from '../schemas/question.schema';
export declare class QuestionRepository {
    private readonly questionModel;
    constructor(questionModel: Model<QuestionDocument>);
    create(dto: any): Promise<Question>;
    findAll(): Promise<Question[]>;
    findById(questionId: string): Promise<Question | null>;
}
