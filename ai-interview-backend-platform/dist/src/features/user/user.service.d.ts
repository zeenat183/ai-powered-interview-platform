import { LoginUserDto, RegisterUserDto, UpdateUserDto } from '../../interfaces/user.dto';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserHelperService } from './user-helper.service';
import Redis from 'ioredis';
export declare class UserService {
    private readonly helper;
    private readonly jwtService;
    private readonly redis;
    constructor(helper: UserHelperService, jwtService: JwtService, redis: Redis);
    registerUser(dto: RegisterUserDto): Observable<any>;
    loginUser(dto: LoginUserDto): Observable<any>;
    getUserByUserId(userId: string): Observable<any>;
    updateProfile(userId: string, updateDto: UpdateUserDto): Observable<any>;
    logout(userId: string, token: string): Observable<any>;
}
