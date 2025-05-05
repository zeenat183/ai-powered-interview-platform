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
const question_helper_service_1 = require("../question/question-helper.service");
const question_dto_1 = require("../../interfaces/question.dto");
const submission_service_1 = require("../../core/submission/submission.service");
let SubmissionService = class SubmissionService {
    helper;
    questionHelper;
    judge0;
    coreSubmissionService;
    constructor(helper, questionHelper, judge0, coreSubmissionService) {
        this.helper = helper;
        this.questionHelper = questionHelper;
        this.judge0 = judge0;
        this.coreSubmissionService = coreSubmissionService;
    }
    createSubmission({ dto, }) {
        const { submissionDetails, questionId, questionType, ...rest } = dto;
        const attempt = { ...submissionDetails[0], result: null, status: submission_dto_1.SubmissionAttemptStatus.PENDING, feedback: null, resultMap: {} };
        const language = attempt.language;
        const languageId = this.mapLanguageToJudge0Id(language);
        return (0, rxjs_1.from)(this.questionHelper.getQuestionById(questionId)).pipe((0, rxjs_1.switchMap)((question) => {
            if (!question || question.questionType !== question_dto_1.QuestionType.DSA) {
                throw new common_1.NotFoundException('Question not found or invalid question');
            }
            const questionDetails = question.questionDetails;
            if (!('dsaQuestion' in questionDetails)) {
                throw new common_1.NotFoundException('Invalid question type. Expected DSA.');
            }
            const dsaQuestion = questionDetails.dsaQuestion;
            if (!dsaQuestion ||
                !dsaQuestion.codeTemplates ||
                !dsaQuestion.exampleTestCases ||
                !dsaQuestion.hiddenTestCases) {
                throw new common_1.NotFoundException('Invalid question structure for DSA type');
            }
            const template = dsaQuestion.codeTemplates[language];
            if (!template)
                throw new common_1.NotFoundException(`No template for language ${language}`);
            return this.coreSubmissionService.wrapCode(attempt.answer, language, template, dsaQuestion.exampleTestCases, dsaQuestion.hiddenTestCases).pipe((0, rxjs_1.switchMap)((finalCode) => {
                console.log('--------finalCode-------', finalCode);
                return (0, rxjs_1.from)(this.judge0.submitCode(finalCode, languageId)).pipe((0, rxjs_1.map)((judge0Result) => ({
                    judge0Result,
                    dsaQuestion,
                })));
            }));
        }), (0, rxjs_1.switchMap)(({ judge0Result, dsaQuestion }) => {
            attempt.result = judge0Result;
            attempt.status = this.getStatusFromJudge0(judge0Result.status?.description || '');
            const feedback = this.coreSubmissionService.mapTestCaseResults({
                exampleTestCases: dsaQuestion.exampleTestCases,
                hiddenTestCases: dsaQuestion.hiddenTestCases,
                stdout: judge0Result.stdout || '',
            });
            console.log("----------feedback-----------", feedback);
            attempt.resultMap = feedback;
            return (0, rxjs_1.from)(this.helper.createSubmission({
                questionId,
                questionType,
                ...rest,
                submissionDetails: [attempt],
            }));
        }), (0, rxjs_1.map)((submission) => this.toResponseDto(submission)));
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
        question_helper_service_1.QuestionHelperService,
        judge0_service_1.Judge0Service,
        submission_service_1.CoreSubmissionService])
], SubmissionService);
//# sourceMappingURL=submission.service.js.map