import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SupabaseService } from '../services/supabase.service';

interface UserRequest {
  username: string;
  password: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}


  @Post()
  createUser(@Body() userRequest: UserRequest): any {
    return this.userService.saveUser(userRequest);
  }
}