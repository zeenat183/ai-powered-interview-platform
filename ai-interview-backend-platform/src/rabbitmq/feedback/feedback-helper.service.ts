import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { to } from 'src/common/utils/to.utils';
import { SubmissionRepository } from 'src/database/repositories/submission.repository';
import { TestCaseResult } from 'src/interfaces/feedback-job.dto';


@Injectable()
export class FeedbackHelperService {
  constructor(private readonly repo: SubmissionRepository) {}

  async updateSubmissionFeedback({
    userId,
    questionId,
    submissionId,
    feedback,
  }: {
    userId: string;
    questionId: string;
    submissionId: string;
    feedback: string | null;
  }): Promise<void> {
    const [error, result] = await to(
      this.repo.updateFeedbackBySubmissionId(
        {
          userId,
          questionId,
          'submissionDetails.submissionId': submissionId,
        },
        {
          $set: { 'submissionDetails.$.feedback': feedback },
        }
      )
    );

    if (error) {
      console.error('❌ Error updating feedback:', error);
      throw new InternalServerErrorException('Failed to update submission feedback');
    }

    return result;
  }

  generateFeedbackPrompt({
  question,
  wrappedCode,
  judge0Error,
  failedTestCases
}: {
  question:string;
  wrappedCode: any;
  judge0Error:string;
  failedTestCases?:TestCaseResult[];
}): string {
  let prompt = `You are an AI code reviewer.\n\n`;

  prompt += `${question}`;

  prompt += `\n### User's Code:\n\`\`\`\n${wrappedCode}\n\`\`\`\n`;

  if (judge0Error) {
    prompt += `\n### Judge0 Error:\n${judge0Error}\n`;
    prompt += `\nExplain clearly what this error means and how the user can fix it.\n`;
  } else if (failedTestCases) {
    prompt += `\n### Failing Test Cases:\n`;
    failedTestCases.forEach((test, i) => {
      prompt += `\nTest Case ${i + 1}:\n`;
      prompt += `Input: ${test.input}\nExpected: ${test.expectedOutput}\nGot: ${test.actualOutput}\n`;
    });
    prompt += `\nExplain why these test cases are failing and how to correct the logic.\n`;
  } else {
    prompt += `\nAll test cases passed. You can optionally suggest improvements and strong points.\n`;
  }

  return prompt.trim();
}

}
