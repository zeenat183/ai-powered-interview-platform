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
exports.UserHelperService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../database/repositories/user.repository");
const to_utils_1 = require("../../common/utils/to.utils");
let UserHelperService = class UserHelperService {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async findByEmail(email) {
        const [error, user] = await (0, to_utils_1.to)(this.userRepo.findByEmail(email));
        if (error) {
            throw new common_1.InternalServerErrorException('Failed to query user by email');
        }
        return user;
    }
    async findByUserId(userId) {
        const [error, user] = await (0, to_utils_1.to)(this.userRepo.findByUserId(userId));
        if (error) {
            throw new common_1.InternalServerErrorException('Failed to query user by userId');
        }
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async createUser(data) {
        const [error, user] = await (0, to_utils_1.to)(this.userRepo.create(data));
        if (error || !user) {
            throw new common_1.InternalServerErrorException('Failed to create user');
        }
        return user;
    }
    async updateUserByUserId(userId, update) {
        const [error, updatedUser] = await (0, to_utils_1.to)(this.userRepo.updateUserByUserId(userId, update));
        if (error)
            throw new common_1.InternalServerErrorException('Failed to update user');
        if (!updatedUser)
            throw new common_1.NotFoundException('User not found');
        return updatedUser;
    }
};
exports.UserHelperService = UserHelperService;
exports.UserHelperService = UserHelperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserHelperService);
//# sourceMappingURL=user-helper.service.js.map