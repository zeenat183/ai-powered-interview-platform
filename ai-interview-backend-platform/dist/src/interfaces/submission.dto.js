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
exports.SubmissionResponseDto = exports.CreateSubmissionDto = exports.SubmissionResultDetailsDto = exports.SubmissionDetailDto = exports.MappedTestCaseResultDto = exports.SubmissionStatus = exports.SubmissionAttemptStatus = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const question_dto_1 = require("./question.dto");
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
class MappedTestCaseResultDto {
    input;
    expectedOutput;
    actualOutput;
    type;
}
exports.MappedTestCaseResultDto = MappedTestCaseResultDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MappedTestCaseResultDto.prototype, "input", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MappedTestCaseResultDto.prototype, "expectedOutput", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MappedTestCaseResultDto.prototype, "actualOutput", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['example', 'hidden']),
    __metadata("design:type", String)
], MappedTestCaseResultDto.prototype, "type", void 0);
class SubmissionDetailDto {
    answer;
    language;
    submittedAt;
}
exports.SubmissionDetailDto = SubmissionDetailDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SubmissionDetailDto.prototype, "answer", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmissionDetailDto.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], SubmissionDetailDto.prototype, "submittedAt", void 0);
class SubmissionResultDetailsDto extends SubmissionDetailDto {
    feedback;
    resultMap;
    status;
    result;
}
exports.SubmissionResultDetailsDto = SubmissionResultDetailsDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], SubmissionResultDetailsDto.prototype, "feedback", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MappedTestCaseResultDto),
    __metadata("design:type", Object)
], SubmissionResultDetailsDto.prototype, "resultMap", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(SubmissionAttemptStatus),
    __metadata("design:type", String)
], SubmissionResultDetailsDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SubmissionResultDetailsDto.prototype, "result", void 0);
class CreateSubmissionDto {
    userId;
    questionId;
    questionType;
    status;
    submissionDetails;
}
exports.CreateSubmissionDto = CreateSubmissionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(question_dto_1.QuestionType),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "questionType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(SubmissionStatus),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => SubmissionDetailDto),
    __metadata("design:type", Array)
], CreateSubmissionDto.prototype, "submissionDetails", void 0);
class SubmissionResponseDto {
    userId;
    questionId;
    questionType;
    status;
    submissionDetails;
    createdAt;
    updatedAt;
    _id;
}
exports.SubmissionResponseDto = SubmissionResponseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmissionResponseDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmissionResponseDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(question_dto_1.QuestionType),
    __metadata("design:type", String)
], SubmissionResponseDto.prototype, "questionType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(SubmissionStatus),
    __metadata("design:type", String)
], SubmissionResponseDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SubmissionResultDetailsDto),
    __metadata("design:type", Array)
], SubmissionResponseDto.prototype, "submissionDetails", void 0);
//# sourceMappingURL=submission.dto.js.map