import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly redis;
    constructor(jwtService: JwtService, redis: Redis);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
