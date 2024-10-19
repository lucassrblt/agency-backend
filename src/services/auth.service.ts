import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService{
  constructor(private UsersService: UserService, private jwtService: JwtService) {}


  async signUp(username: string, pass: string) {
    try{
      const passHash = await bcrypt.hash(pass, 10);
      return this.UsersService.saveUser({ username, password: passHash });
    }catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }


  async signIn(username: string, pass: string) {
    const user = await this.UsersService.findOne(username);
    if(!user){
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if(!isPasswordValid){
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };

  }
}