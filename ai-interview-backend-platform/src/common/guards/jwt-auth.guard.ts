import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { ExtendedRequest } from '../types/extended-request.type';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, @Inject('REDIS_CLIENT') private readonly redis: Redis,) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExtendedRequest>();
    const authHeader = request.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or malformed Authorization header');
    }
  
    const token = authHeader?.split(' ')[1];
    let decoded: any;
    try {
        decoded = this.jwtService.verify(token); // ✅ Catch if token is expired/invalid
    } catch (err) {
        throw new UnauthorizedException('Invalid or expired token');
    }
    const jti = decoded.jti;
  
    const isBlacklisted = await this.redis.get(`blacklist:${jti}`);
    if (isBlacklisted || !decoded) {
      throw new UnauthorizedException('Token has been blacklisted');
    }
  
    request.user = decoded;
    return true;
  }
}
