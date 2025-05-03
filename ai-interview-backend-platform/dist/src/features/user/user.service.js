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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_helper_service_1 = require("./user-helper.service");
const uuid_1 = require("uuid");
const ioredis_1 = require("ioredis");
let UserService = class UserService {
    helper;
    jwtService;
    redis;
    constructor(helper, jwtService, redis) {
        this.helper = helper;
        this.jwtService = jwtService;
        this.redis = redis;
    }
    registerUser(dto) {
        return (0, rxjs_1.from)(this.helper.findByEmail(dto.email)).pipe((0, operators_1.switchMap)(existingUser => {
            if (existingUser) {
                return (0, rxjs_1.throwError)(() => new common_1.ConflictException('Email already exists'));
            }
            return (0, rxjs_1.from)(bcrypt.hash(dto.password, 10)).pipe((0, operators_1.switchMap)(hashedPassword => (0, rxjs_1.from)(this.helper.createUser({ ...dto, password: hashedPassword, role: 'user' }))), (0, operators_1.map)(user => ({
                userId: user.userId,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                rating: user.rating,
            })));
        }));
    }
    loginUser(dto) {
        return (0, rxjs_1.from)(this.helper.findByEmail(dto.email)).pipe((0, operators_1.switchMap)(user => {
            if (!user) {
                return (0, rxjs_1.throwError)(() => new common_1.UnauthorizedException('Invalid credentials'));
            }
            return (0, rxjs_1.from)(bcrypt.compare(dto.password, user.password)).pipe((0, operators_1.switchMap)(isMatch => {
                if (!isMatch) {
                    return (0, rxjs_1.throwError)(() => new common_1.UnauthorizedException('Invalid credentials'));
                }
                const payload = { sub: user.userId, role: user.role, jti: (0, uuid_1.v4)() };
                const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
                return (0, rxjs_1.from)([{ accessToken }]);
            }));
        }));
    }
    getUserByUserId(userId) {
        return (0, rxjs_1.from)(this.helper.findByUserId(userId)).pipe((0, operators_1.map)(user => {
            console.log(user);
            const { password, ...safeUser } = user;
            return safeUser;
        }));
    }
    updateProfile(userId, updateDto) {
        return (0, rxjs_1.from)(this.helper.updateUserByUserId(userId, updateDto)).pipe((0, operators_1.map)(user => {
            const { password, _id, __v, ...safeUser } = user;
            return safeUser;
        }));
    }
    logout(userId, token) {
        const decoded = this.jwtService.decode(token);
        const jti = decoded?.jti;
        const exp = decoded?.exp;
        if (!jti || !exp) {
            return (0, rxjs_1.throwError)(() => new common_1.UnauthorizedException('Invalid token'));
        }
        const ttl = exp - Math.floor(Date.now() / 1000);
        return (0, rxjs_1.from)(this.redis.set(`blacklist:${jti}`, 'true', 'EX', ttl)).pipe((0, operators_1.map)(() => ({ message: 'User logged out successfully' })));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [user_helper_service_1.UserHelperService,
        jwt_1.JwtService,
        ioredis_1.default])
], UserService);
//# sourceMappingURL=user.service.js.map