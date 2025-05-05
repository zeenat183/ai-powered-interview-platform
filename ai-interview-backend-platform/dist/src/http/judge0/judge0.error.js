"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Judge0SubmissionError = void 0;
class Judge0SubmissionError extends Error {
    constructor(message) {
        super(`Judge0 API Error: ${message}`);
        this.name = 'Judge0SubmissionError';
    }
}
exports.Judge0SubmissionError = Judge0SubmissionError;
//# sourceMappingURL=judge0.error.js.map