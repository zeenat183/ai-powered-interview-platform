import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SubmissionRepository } from 'src/database/repositories/submission.repository';
import { CreateSubmissionDto, SubmissionDetailDto, SubmissionStatus } from 'src/interfaces/submission.dto';
import { to } from 'src/common/utils/to.utils';
import { QuestionType } from 'src/interfaces/question.dto';
import { Submission } from 'src/database/schemas/submission.schema';

@Injectable()
export class SubmissionHelperService {
  constructor(private readonly repo: SubmissionRepository) {}

  async createSubmission(dto: CreateSubmissionDto) {
    const [error, submission] = await to(this.repo.create(dto));
    if (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create submission');
    }
    return submission;
  }

  // async getSubmissionById(id: string) {
  //   const [error, submission] = await to(this.repo.findById(id));
  //   if (error) {
  //     throw new InternalServerErrorException('Failed to get submission');
  //   }
  //   if (!submission) {
  //     throw new NotFoundException('Submission not found');
  //   }
  //   return submission;
  // }

  async getSubmissionsByUser(userId: string) {
    const [error, submissions] = await to(this.repo.findAllByUser(userId));
    if (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to get submissions');
    }
    if(!submissions){
        throw new NotFoundException('Submission not found');
    }
    return submissions;
  }

  async getSubmissionsByUserAndQuestion({userId,questionId}){
    const [error, submissions] = await to(this.repo.findAllByUserAndQuestion({userId,questionId}));
    if (error) {
      throw new InternalServerErrorException('Failed to get submissions');
    }
    if(!submissions){
        throw new NotFoundException('Submission not found');
    }
    return submissions;
  }

  async findByUserAndQuestion(
    userId: string,
    questionId: string,
  ): Promise<Submission | null> {
    const [error, submission] = await to(
      this.repo.findOne({ userId, questionId }),
    );
    if (error) {
      throw new InternalServerErrorException('Failed to fetch submission');
    }
    return submission;
  }

  async updateSubmission(
    userId: string,
    questionId: string,
    updatedSubmission: Partial<Submission>,
  ): Promise<Submission> {
    const [error, updated] = await to(
      this.repo.updateByUserAndQuestion(userId, questionId, updatedSubmission),
    );
  
    if (error || !updated) {
      throw new InternalServerErrorException('Failed to update submission');
    }
  
    return updated;
  }
  
  
}
