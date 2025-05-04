import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SubmissionRepository } from 'src/database/repositories/submission.repository';
import { CreateSubmissionDto } from 'src/interfaces/submission.dto';
import { to } from 'src/common/utils/to.utils';

@Injectable()
export class SubmissionHelperService {
  constructor(private readonly repo: SubmissionRepository) {}

  async createSubmission(dto: CreateSubmissionDto) {
    const [error, submission] = await to(this.repo.create(dto));
    if (error || !submission) {
      throw new InternalServerErrorException('Failed to create submission');
    }
    return submission;
  }

  async getSubmissionById(id: string) {
    const [error, submission] = await to(this.repo.findById(id));
    if (error) {
      throw new InternalServerErrorException('Failed to get submission');
    }
    if (!submission) {
      throw new NotFoundException('Submission not found');
    }
    return submission;
  }

  async getSubmissionsByUser(userId: string) {
    const [error, submissions] = await to(this.repo.findAllByUser(userId));
    if (error) {
      throw new InternalServerErrorException('Failed to get submissions');
    }
    if(!submissions){
        throw new NotFoundException('Submission not found');
    }
    return submissions;
  }
}
