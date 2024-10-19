import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { signInDto } from '../interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('login')
  signIn(@Body() signInDto: signInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('register')
  signUp(@Body() signInDto: signInDto) {
    return this.authService.signUp(signInDto.username, signInDto.password);
  }
}