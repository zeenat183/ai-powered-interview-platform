import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Question, QuestionDocument } from '../schemas/question.schema';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
  ) {}

  create(dto: any): Promise<Question> {
    return new this.questionModel(dto).save();
  }

  findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  findById(questionId: string): Promise<Question | null> {
    return this.questionModel.findOne({ questionId }).exec();
  }
}
