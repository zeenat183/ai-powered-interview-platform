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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const ioredis_1 = require("ioredis");
let JwtAuthGuard = class JwtAuthGuard {
    jwtService;
    redis;
    constructor(jwtService, redis) {
        this.jwtService = jwtService;
        this.redis = redis;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Missing or malformed Authorization header');
        }
        const token = authHeader?.split(' ')[1];
        let decoded;
        try {
            decoded = this.jwtService.verify(token);
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
        const jti = decoded.jti;
        const isBlacklisted = await this.redis.get(`blacklist:${jti}`);
        if (isBlacklisted || !decoded) {
            throw new common_1.UnauthorizedException('Token has been blacklisted');
        }
        request.user = decoded;
        return true;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [jwt_1.JwtService, ioredis_1.default])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map