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
exports.SubmissionHelperService = void 0;
const common_1 = require("@nestjs/common");
const submission_repository_1 = require("../../database/repositories/submission.repository");
const to_utils_1 = require("../../common/utils/to.utils");
let SubmissionHelperService = class SubmissionHelperService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async createSubmission(dto) {
        console.log('---------createSubmission--------', JSON.stringify(dto));
        const [error, submission] = await (0, to_utils_1.to)(this.repo.create(dto));
        if (error || !submission) {
            throw new common_1.InternalServerErrorException('Failed to create submission');
        }
        return submission;
    }
    async getSubmissionById(id) {
        const [error, submission] = await (0, to_utils_1.to)(this.repo.findById(id));
        if (error) {
            throw new common_1.InternalServerErrorException('Failed to get submission');
        }
        if (!submission) {
            throw new common_1.NotFoundException('Submission not found');
        }
        return submission;
    }
    async getSubmissionsByUser(userId) {
        const [error, submissions] = await (0, to_utils_1.to)(this.repo.findAllByUser(userId));
        if (error) {
            throw new common_1.InternalServerErrorException('Failed to get submissions');
        }
        if (!submissions) {
            throw new common_1.NotFoundException('Submission not found');
        }
        return submissions;
    }
};
exports.SubmissionHelperService = SubmissionHelperService;
exports.SubmissionHelperService = SubmissionHelperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [submission_repository_1.SubmissionRepository])
], SubmissionHelperService);
//# sourceMappingURL=submission-helper.service.js.map