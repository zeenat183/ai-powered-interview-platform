import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from '../../interfaces/user.dto';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() dto: RegisterUserDto): Observable<any> {
    console.log('-----hello----');
    return this.userService.registerUser(dto).pipe(
      map(user => ({
        message: 'User registered successfully',
        data: user,
      }))
    );
  }

  @Post('login')
  login(@Body() dto: LoginUserDto): Observable<any> {
    return this.userService.loginUser(dto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() userId: string
    ) {
    return this.userService.getUserByUserId(userId);
  }

  @Put('profile')
@UseGuards(JwtAuthGuard)
updateProfile(
  @CurrentUser() userId: string,
  @Body() updateDto: UpdateUserDto,
) {
  console.log('heyhehe');
  return this.userService.updateProfile(userId, updateDto);
}

@UseGuards(JwtAuthGuard)
@Post('logout')
logout(@CurrentUser() userId: string, @Req() req): Observable<any> {
  const token = req.headers.authorization?.split(' ')[1];
  return this.userService.logout(userId, token);
}
}
