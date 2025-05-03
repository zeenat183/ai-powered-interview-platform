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
let QuestionService = class QuestionService {
    helper;
    constructor(helper) {
        this.helper = helper;
    }
    createQuestion(dto) {
        return (0, rxjs_1.from)(this.helper.createQuestion(dto)).pipe((0, rxjs_1.map)(question => this.toResponseDto(question)));
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