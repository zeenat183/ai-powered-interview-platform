"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const submission_schema_1 = require("../../database/schemas/submission.schema");
const submmission_controller_1 = require("./submmission.controller");
const submission_service_1 = require("./submission.service");
const submission_helper_service_1 = require("./submission-helper.service");
const judge0_module_1 = require("../../http/judge0/judge0.module");
const submission_repository_1 = require("../../database/repositories/submission.repository");
const question_module_1 = require("../question/question.module");
const submission_module_1 = require("../../core/submission/submission.module");
let SubmissionModule = class SubmissionModule {
};
exports.SubmissionModule = SubmissionModule;
exports.SubmissionModule = SubmissionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: submission_schema_1.Submission.name, schema: submission_schema_1.SubmissionSchema }]),
            judge0_module_1.Judge0Module,
            question_module_1.QuestionModule,
            submission_module_1.CoreSubmissionModule
        ],
        controllers: [submmission_controller_1.SubmissionController],
        providers: [submission_service_1.SubmissionService, submission_helper_service_1.SubmissionHelperService, submission_repository_1.SubmissionRepository],
        exports: [submission_service_1.SubmissionService],
    })
], SubmissionModule);
//# sourceMappingURL=submission.module.js.map