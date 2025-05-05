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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionController = void 0;
const common_1 = require("@nestjs/common");
const submission_service_1 = require("./submission.service");
const submission_dto_1 = require("../../interfaces/submission.dto");
const rxjs_1 = require("rxjs");
let SubmissionController = class SubmissionController {
    submissionService;
    constructor(submissionService) {
        this.submissionService = submissionService;
    }
    createSubmission(dto) {
        return this.submissionService.createSubmission({ dto });
    }
    getSubmissionById(id) {
        return this.submissionService.getSubmissionById(id);
    }
    getSubmissionsByUser(userId) {
        return this.submissionService.getSubmissionsByUser(userId);
    }
};
exports.SubmissionController = SubmissionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submission_dto_1.CreateSubmissionDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], SubmissionController.prototype, "createSubmission", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], SubmissionController.prototype, "getSubmissionById", null);
__decorate([
    (0, common_1.Get)('/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], SubmissionController.prototype, "getSubmissionsByUser", null);
exports.SubmissionController = SubmissionController = __decorate([
    (0, common_1.Controller)('submission'),
    __metadata("design:paramtypes", [submission_service_1.SubmissionService])
], SubmissionController);
//# sourceMappingURL=submmission.controller.js.map