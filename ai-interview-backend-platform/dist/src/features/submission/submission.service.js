"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const submission_dto_1 = require("../../interfaces/submission.dto");
const submission_helper_service_1 = require("./submission-helper.service");
const judge0_service_1 = require("../../http/judge0/judge0.service");
let SubmissionService = class SubmissionService {
    helper;
    judge0;
    constructor(helper, judge0) {
        this.helper = helper;
        this.judge0 = judge0;
    }
    createSubmission(dto) {
        const { submissionDetails, ...rest } = dto;
        const attempt = submissionDetails[0];
        const languageId = this.mapLanguageToJudge0Id(attempt.language);
        return (0, rxjs_1.from)(this.judge0.submitCode(attempt.answer, languageId)).pipe((0, rxjs_1.switchMap)((judge0Result) => {
            attempt.result = judge0Result;
            attempt.status = this.getStatusFromJudge0(judge0Result.status?.description || '');
            return (0, rxjs_1.from)(this.helper.createSubmission({ ...rest, submissionDetails: [attempt] }));
        }), (0, rxjs_1.map)(submission => this.toResponseDto(submission)));
    }
    getSubmissionById(id) {
        return (0, rxjs_1.from)(this.helper.getSubmissionById(id)).pipe((0, rxjs_1.map)(sub => this.toResponseDto(sub)));
    }
    getSubmissionsByUser(userId) {
        return (0, rxjs_1.from)(this.helper.getSubmissionsByUser(userId)).pipe((0, rxjs_1.map)(submissions => submissions.map(sub => this.toResponseDto(sub))));
    }
    mapLanguageToJudge0Id(lang) {
        const map = {
            cpp: 54,
            python: 71,
            java: 62,
            javascript: 63,
        };
        return map[lang || ''] || 54;
    }
    getStatusFromJudge0(description) {
        const lower = description.toLowerCase();
        if (lower.includes('accepted'))
            return submission_dto_1.SubmissionAttemptStatus.PASSED;
        if (lower.includes('error') || lower.includes('failed'))
            return submission_dto_1.SubmissionAttemptStatus.ERROR;
        return submission_dto_1.SubmissionAttemptStatus.FAILED;
    }
    toResponseDto(sub) {
        return {
            userId: sub.userId,
            questionId: sub.questionId,
            questionType: sub.questionType,
            status: sub.status,
            submissionDetails: sub.submissionDetails,
            createdAt: sub.createdAt,
            updatedAt: sub.updatedAt,
        };
    }
};
exports.SubmissionService = SubmissionService;
exports.SubmissionService = SubmissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [submission_helper_service_1.SubmissionHelperService,
        judge0_service_1.Judge0Service])
], SubmissionService);
//# sourceMappingURL=submission.service.js.map