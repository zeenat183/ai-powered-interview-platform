export class Judge0SubmissionError extends Error {
    constructor(message: string) {
      super(`Judge0 API Error: ${message}`);
      this.name = 'Judge0SubmissionError';
    }
  }
  