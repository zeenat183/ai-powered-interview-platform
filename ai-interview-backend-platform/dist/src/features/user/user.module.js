"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../database/schemas/user.schema");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const user_repository_1 = require("../../database/repositories/user.repository");
const jwt_config_1 = require("../../config/jwt.config");
const jwt_1 = require("@nestjs/jwt");
const user_helper_service_1 = require("./user-helper.service");
const redis_module_1 = require("../../common/redis/redis.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]), jwt_1.JwtModule.register({
                secret: jwt_config_1.jwtConstants.secret,
                signOptions: { expiresIn: jwt_config_1.jwtConstants.expiresIn },
            }),
            redis_module_1.RedisModule
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, user_repository_1.UserRepository, user_helper_service_1.UserHelperService],
        exports: [user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map