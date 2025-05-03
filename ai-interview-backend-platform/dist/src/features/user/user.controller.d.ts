import { LoginUserDto, RegisterUserDto, UpdateUserDto } from '../../interfaces/user.dto';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(dto: RegisterUserDto): Observable<any>;
    login(dto: LoginUserDto): Observable<any>;
    getProfile(userId: string): Observable<any>;
    updateProfile(userId: string, updateDto: UpdateUserDto): Observable<any>;
    logout(userId: string, req: any): Observable<any>;
}
