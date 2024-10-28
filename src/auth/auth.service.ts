import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  private supabaseClient: SupabaseClient;

  constructor(
    private jwtService: JwtService,
    private supabaseService: SupabaseService,
  ) {
    this.supabaseClient = this.supabaseService.getClient();
  }

  async signUp(username: string, pass: string) {
    // try{
    //   const passHash = await bcrypt.hash(pass, 10);
    //   // return this.UsersService.saveUser({ username, password: passHash });
    // }catch (e) {
    //   throw new InternalServerErrorException(e.message);
    // }
  }

  async signIn(username: string, pass: string) {
    try {
      const { data, error } = await this.supabaseClient
        .from('users')
        .select('id, username, password')
        .eq('username', username)
        .single();

      if (error) {
        throw new InternalServerErrorException(error.message);
      }

      const isPasswordValid = await bcrypt.compare(pass, data.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { username: data.username, sub: data.id };
      return {
        message: 'Login successful',
        statusCode: 200,
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
