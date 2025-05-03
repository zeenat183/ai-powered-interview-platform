import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from '../../interfaces/user.dto';
import { from, Observable, of, throwError } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserHelperService } from './user-helper.service';
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';

@Injectable()
export class UserService {
  constructor(
    private readonly helper: UserHelperService,
    private readonly jwtService: JwtService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  registerUser(dto: RegisterUserDto): Observable<any> {
    return from(this.helper.findByEmail(dto.email)).pipe(
      switchMap(existingUser => {
        if (existingUser) {
          return throwError(() => new ConflictException('Email already exists'));
        }

        return from(bcrypt.hash(dto.password, 10)).pipe(
          switchMap(hashedPassword =>
            from(this.helper.createUser({ ...dto, password: hashedPassword,role:'user'}))
          ),
          map(user => ({
            userId: user.userId,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            rating: user.rating,
          }))
        );
      })
    );
  }

  loginUser(dto: LoginUserDto): Observable<any> {
    return from(this.helper.findByEmail(dto.email)).pipe(
      switchMap(user => {
        if (!user) {
          return throwError(() => new UnauthorizedException('Invalid credentials'));
        }

        return from(bcrypt.compare(dto.password, user.password)).pipe(
          switchMap(isMatch => {
            if (!isMatch) {
              return throwError(() => new UnauthorizedException('Invalid credentials'));
            }

            const payload = { sub: user.userId ,role:user.role,jti: uuidv4()};
            const accessToken = this.jwtService.sign(payload,{ expiresIn: '15m' });

            return from([{ accessToken }]);
          })
        );
      })
    );
  }

  getUserByUserId(userId: string): Observable<any> {
    return from(this.helper.findByUserId(userId)).pipe(
      map(user => {
        console.log(user);
        //return {};
        const { password,...safeUser } = user;
        return safeUser;
      })
    );
  }

  updateProfile(userId: string, updateDto: UpdateUserDto): Observable<any> {
    return from(this.helper.updateUserByUserId(userId, updateDto)).pipe(
      map(user => {
        const { password, _id, __v, ...safeUser } = user;
        return safeUser;
      })
    );
  }

  logout(userId: string, token: string): Observable<any> {
    const decoded = this.jwtService.decode(token) as any;
    const jti = decoded?.jti;
    const exp = decoded?.exp;
  
    if (!jti || !exp) {
      return throwError(() => new UnauthorizedException('Invalid token'));
    }
  
    const ttl = exp - Math.floor(Date.now() / 1000); // TTL in seconds
  
    return from(this.redis.set(`blacklist:${jti}`, 'true', 'EX', ttl)).pipe(
      map(() => ({ message: 'User logged out successfully' }))
    );
  }
}
