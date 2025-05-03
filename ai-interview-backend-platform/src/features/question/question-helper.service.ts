import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { QuestionRepository } from '../../database/repositories/question.repository';
import { CreateQuestionDto } from 'src/interfaces/question.dto';
import { to } from 'src/common/utils/to.utils';

@Injectable()
export class QuestionHelperService {
  constructor(private readonly repo: QuestionRepository) {}

  async createQuestion(dto: CreateQuestionDto) {
    const [error, question] = await to(this.repo.create(dto));
    if (error || !question) {
        
      throw new InternalServerErrorException('Failed to create question');
    }
    return question;
  }

  async getAllQuestions() {
    const [error, questions] = await to(this.repo.findAll());
    if (error) {
      throw new InternalServerErrorException('Failed to get questions');
    }
    if (!questions) throw new NotFoundException('User not found');
    return questions;
  }

  async getQuestionById(id: string) {
    const [error, question] = await to(this.repo.findById(id));
    if (error) {
      throw new InternalServerErrorException('Failed to get question');
    }
    if (!question) throw new NotFoundException('User not found');
    return question;
  }
}
