import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Submission, SubmissionDocument } from '../schemas/submission.schema';


@Injectable()
export class SubmissionRepository {
  constructor(
    @InjectModel(Submission.name)
    private readonly submissionModel: Model<SubmissionDocument>,
  ) {}

  create(dto: any): Promise<Submission> {
    return new this.submissionModel(dto).save();
  }

  findById(submissionId: string): Promise<Submission | null> {
    return this.submissionModel.findById(submissionId).exec();
  }

  findAllByUser(userId: string): Promise<Submission[]> {
    return this.submissionModel.find({ userId }).exec();
  }

  // Extend with updateSubmission/addAttempt etc. if needed later
}
