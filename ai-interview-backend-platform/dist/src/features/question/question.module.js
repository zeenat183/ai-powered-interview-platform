"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const question_service_1 = require("./question.service");
const question_controller_1 = require("./question.controller");
const question_schema_1 = require("../../database/schemas/question.schema");
const question_helper_service_1 = require("./question-helper.service");
const question_repository_1 = require("../../database/repositories/question.repository");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../../config/jwt.config");
const redis_module_1 = require("../../common/redis/redis.module");
let QuestionModule = class QuestionModule {
};
exports.QuestionModule = QuestionModule;
exports.QuestionModule = QuestionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: question_schema_1.Question.name, schema: question_schema_1.QuestionSchema }]),
            jwt_1.JwtModule.register({
                secret: jwt_config_1.jwtConstants.secret,
                signOptions: { expiresIn: jwt_config_1.jwtConstants.expiresIn },
            }),
            redis_module_1.RedisModule
        ],
        controllers: [question_controller_1.QuestionController],
        providers: [question_service_1.QuestionService, question_repository_1.QuestionRepository, question_helper_service_1.QuestionHelperService],
        exports: [question_service_1.QuestionService, question_helper_service_1.QuestionHelperService],
    })
], QuestionModule);
//# sourceMappingURL=question.module.js.map