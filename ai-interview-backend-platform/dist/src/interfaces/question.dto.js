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
exports.QuestionResponseDto = exports.CreateQuestionDto = exports.SystemDesignQuestionDto = exports.AptitudeMcqQuestionDto = exports.DsaQuestionDto = exports.Difficulty = exports.QuestionType = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var QuestionType;
(function (QuestionType) {
    QuestionType["DSA"] = "dsa";
    QuestionType["APTITUDE_MCQ"] = "aptitude_mcq";
    QuestionType["SYSTEM_DESIGN"] = "system_design";
})(QuestionType || (exports.QuestionType = QuestionType = {}));
var Difficulty;
(function (Difficulty) {
    Difficulty["EASY"] = "easy";
    Difficulty["MEDIUM"] = "medium";
    Difficulty["HARD"] = "hard";
})(Difficulty || (exports.Difficulty = Difficulty = {}));
class LanguageTemplatesDto {
    cpp;
    java;
    python;
    javascript;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LanguageTemplatesDto.prototype, "cpp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LanguageTemplatesDto.prototype, "java", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LanguageTemplatesDto.prototype, "python", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LanguageTemplatesDto.prototype, "javascript", void 0);
class ExampleTestCase {
    input;
    output;
    explanation;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExampleTestCase.prototype, "input", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExampleTestCase.prototype, "output", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExampleTestCase.prototype, "explanation", void 0);
class HiddenTestCase {
    input;
    output;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HiddenTestCase.prototype, "input", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HiddenTestCase.prototype, "output", void 0);
class DsaQuestionDto {
    constraints;
    exampleTestCases;
    hiddenTestCases;
    codeTemplates;
}
exports.DsaQuestionDto = DsaQuestionDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DsaQuestionDto.prototype, "constraints", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ExampleTestCase),
    __metadata("design:type", Array)
], DsaQuestionDto.prototype, "exampleTestCases", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => HiddenTestCase),
    __metadata("design:type", Array)
], DsaQuestionDto.prototype, "hiddenTestCases", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LanguageTemplatesDto),
    __metadata("design:type", LanguageTemplatesDto)
], DsaQuestionDto.prototype, "codeTemplates", void 0);
class AptitudeMcqQuestionDto {
    options;
    correctAnswer;
}
exports.AptitudeMcqQuestionDto = AptitudeMcqQuestionDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], AptitudeMcqQuestionDto.prototype, "options", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AptitudeMcqQuestionDto.prototype, "correctAnswer", void 0);
class SystemDesignQuestionDto {
    guidelines;
    evaluationCriteria;
}
exports.SystemDesignQuestionDto = SystemDesignQuestionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SystemDesignQuestionDto.prototype, "guidelines", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], SystemDesignQuestionDto.prototype, "evaluationCriteria", void 0);
class CreateQuestionDto {
    title;
    description;
    difficulty;
    questionType;
    topics;
    languagesSupported;
    questionDetails;
}
exports.CreateQuestionDto = CreateQuestionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Difficulty),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "difficulty", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(QuestionType),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "questionType", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "topics", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "languagesSupported", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateQuestionDto.prototype, "questionDetails", void 0);
class QuestionResponseDto {
    questionId;
    title;
    description;
    difficulty;
    questionType;
    topics;
    languagesSupported;
    questionDetails;
    createdAt;
    updatedAt;
}
exports.QuestionResponseDto = QuestionResponseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionResponseDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionResponseDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionResponseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Difficulty),
    __metadata("design:type", String)
], QuestionResponseDto.prototype, "difficulty", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(QuestionType),
    __metadata("design:type", String)
], QuestionResponseDto.prototype, "questionType", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], QuestionResponseDto.prototype, "topics", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], QuestionResponseDto.prototype, "languagesSupported", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Object),
    __metadata("design:type", Object)
], QuestionResponseDto.prototype, "questionDetails", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], QuestionResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], QuestionResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=question.dto.js.map