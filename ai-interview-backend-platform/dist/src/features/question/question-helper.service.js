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
exports.QuestionHelperService = void 0;
const common_1 = require("@nestjs/common");
const question_repository_1 = require("../../database/repositories/question.repository");
const to_utils_1 = require("../../common/utils/to.utils");
let QuestionHelperService = class QuestionHelperService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async createQuestion(dto) {
        const [error, question] = await (0, to_utils_1.to)(this.repo.create(dto));
        if (error || !question) {
            throw new common_1.InternalServerErrorException('Failed to create question');
        }
        return question;
    }
    async getAllQuestions() {
        const [error, questions] = await (0, to_utils_1.to)(this.repo.findAll());
        if (error) {
            throw new common_1.InternalServerErrorException('Failed to get questions');
        }
        if (!questions)
            throw new common_1.NotFoundException('User not found');
        return questions;
    }
    async getQuestionById(id) {
        const [error, question] = await (0, to_utils_1.to)(this.repo.findById(id));
        if (error) {
            throw new common_1.InternalServerErrorException('Failed to get question');
        }
        if (!question)
            throw new common_1.NotFoundException('User not found');
        return question;
    }
};
exports.QuestionHelperService = QuestionHelperService;
exports.QuestionHelperService = QuestionHelperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [question_repository_1.QuestionRepository])
], QuestionHelperService);
//# sourceMappingURL=question-helper.service.js.map