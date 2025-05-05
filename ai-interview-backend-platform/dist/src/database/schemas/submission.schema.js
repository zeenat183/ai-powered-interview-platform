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
exports.SubmissionSchema = exports.Submission = exports.SubmissionDetail = exports.MappedTestCaseResult = exports.SubmissionStatus = exports.SubmissionAttemptStatus = exports.QuestionType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var QuestionType;
(function (QuestionType) {
    QuestionType["DSA"] = "dsa";
    QuestionType["APTITUDE_MCQ"] = "aptitude_mcq";
    QuestionType["SYSTEM_DESIGN"] = "system_design";
})(QuestionType || (exports.QuestionType = QuestionType = {}));
var SubmissionAttemptStatus;
(function (SubmissionAttemptStatus) {
    SubmissionAttemptStatus["PENDING"] = "pending";
    SubmissionAttemptStatus["PASSED"] = "passed";
    SubmissionAttemptStatus["FAILED"] = "failed";
    SubmissionAttemptStatus["ERROR"] = "error";
})(SubmissionAttemptStatus || (exports.SubmissionAttemptStatus = SubmissionAttemptStatus = {}));
var SubmissionStatus;
(function (SubmissionStatus) {
    SubmissionStatus["NOT_ATTEMPTED"] = "not_attempted";
    SubmissionStatus["ATTEMPTED"] = "attempted";
    SubmissionStatus["PASSED"] = "passed";
})(SubmissionStatus || (exports.SubmissionStatus = SubmissionStatus = {}));
let MappedTestCaseResult = class MappedTestCaseResult {
    input;
    expectedOutput;
    actualOutput;
    type;
};
exports.MappedTestCaseResult = MappedTestCaseResult;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MappedTestCaseResult.prototype, "input", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MappedTestCaseResult.prototype, "expectedOutput", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MappedTestCaseResult.prototype, "actualOutput", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['example', 'hidden'] }),
    __metadata("design:type", String)
], MappedTestCaseResult.prototype, "type", void 0);
exports.MappedTestCaseResult = MappedTestCaseResult = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], MappedTestCaseResult);
let SubmissionDetail = class SubmissionDetail {
    answer;
    result;
    language;
    feedback;
    status;
    resultMap;
    submittedAt;
};
exports.SubmissionDetail = SubmissionDetail;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SubmissionDetail.prototype, "answer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Object }),
    __metadata("design:type", Object)
], SubmissionDetail.prototype, "result", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SubmissionDetail.prototype, "language", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: null }),
    __metadata("design:type", Object)
], SubmissionDetail.prototype, "feedback", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(SubmissionAttemptStatus) }),
    __metadata("design:type", String)
], SubmissionDetail.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [MappedTestCaseResult], default: [] }),
    __metadata("design:type", Array)
], SubmissionDetail.prototype, "resultMap", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], SubmissionDetail.prototype, "submittedAt", void 0);
exports.SubmissionDetail = SubmissionDetail = __decorate([
    (0, mongoose_1.Schema)()
], SubmissionDetail);
const SubmissionDetailSchema = mongoose_1.SchemaFactory.createForClass(SubmissionDetail);
let Submission = class Submission {
    userId;
    questionId;
    questionType;
    submissionDetails;
    status;
    createdAt;
    updatedAt;
};
exports.Submission = Submission;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Submission.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Submission.prototype, "questionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(QuestionType) }),
    __metadata("design:type", String)
], Submission.prototype, "questionType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [SubmissionDetailSchema], default: [] }),
    __metadata("design:type", Array)
], Submission.prototype, "submissionDetails", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(SubmissionStatus), default: SubmissionStatus.NOT_ATTEMPTED }),
    __metadata("design:type", String)
], Submission.prototype, "status", void 0);
exports.Submission = Submission = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Submission);
exports.SubmissionSchema = mongoose_1.SchemaFactory.createForClass(Submission);
//# sourceMappingURL=submission.schema.js.map