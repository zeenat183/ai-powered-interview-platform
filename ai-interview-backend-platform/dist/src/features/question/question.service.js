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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const question_helper_service_1 = require("./question-helper.service");
const rxjs_1 = require("rxjs");
const question_dto_1 = require("../../interfaces/question.dto");
const class_transformer_1 = require("class-transformer");
let QuestionService = class QuestionService {
    helper;
    constructor(helper) {
        this.helper = helper;
    }
    createQuestion(dto) {
        return (0, rxjs_1.from)(this.helper.createQuestion(dto)).pipe((0, rxjs_1.map)(question => this.toResponseDto(question)));
    }
    validateAndAssignQuestionDetails(dto, body) {
        const details = body.questionDetails;
        switch (dto.questionType) {
            case question_dto_1.QuestionType.DSA:
                if (!details?.dsaQuestion) {
                    throw new common_1.BadRequestException('Missing `dsaQuestion` details for DSA type');
                }
                dto.questionDetails = {
                    dsaQuestion: (0, class_transformer_1.plainToInstance)(question_dto_1.DsaQuestionDto, details.dsaQuestion),
                };
                break;
            case question_dto_1.QuestionType.APTITUDE_MCQ:
                if (!details?.aptitudeMcq) {
                    throw new common_1.BadRequestException('Missing `aptitudeMcq` details for APTITUDE_MCQ type');
                }
                dto.questionDetails = {
                    aptitudeMcq: (0, class_transformer_1.plainToInstance)(question_dto_1.AptitudeMcqQuestionDto, details.aptitudeMcq),
                };
                break;
            case question_dto_1.QuestionType.SYSTEM_DESIGN:
                if (!details?.systemDesign) {
                    throw new common_1.BadRequestException('Missing `systemDesign` details for SYSTEM_DESIGN type');
                }
                dto.questionDetails = {
                    systemDesign: (0, class_transformer_1.plainToInstance)(question_dto_1.SystemDesignQuestionDto, details.systemDesign),
                };
                break;
            default:
                throw new common_1.BadRequestException('Invalid or missing `questionType`');
        }
    }
    getAllQuestions() {
        return (0, rxjs_1.from)(this.helper.getAllQuestions()).pipe((0, rxjs_1.map)(questions => questions.map(q => this.toResponseDto(q))));
    }
    getQuestionById(id) {
        return (0, rxjs_1.from)(this.helper.getQuestionById(id)).pipe((0, rxjs_1.map)(question => this.toResponseDto(question)));
    }
    toResponseDto(question) {
        let questionDetails;
        switch (question.questionType) {
            case question_dto_1.QuestionType.DSA:
                questionDetails = { dsaQuestion: question.questionDetails.dsaQuestion };
                break;
            case question_dto_1.QuestionType.APTITUDE_MCQ:
                questionDetails = { aptitudeMcq: question.questionDetails.aptitudeMcq };
                break;
            case question_dto_1.QuestionType.SYSTEM_DESIGN:
                questionDetails = { systemDesign: question.questionDetails.systemDesign };
                break;
            default:
                throw new Error(`Unsupported question type: ${question.questionType}`);
        }
        return {
            questionId: question.questionId,
            title: question.title,
            description: question.description,
            difficulty: question.difficulty,
            questionType: question.questionType,
            topics: question.topics,
            languagesSupported: question.languagesSupported,
            questionDetails,
            createdAt: question.createdAt,
            updatedAt: question.updatedAt,
        };
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [question_helper_service_1.QuestionHelperService])
], QuestionService);
//# sourceMappingURL=question.service.js.map