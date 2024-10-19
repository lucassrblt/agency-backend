import { Module } from '@nestjs/common';
import { UsersController } from '../controller/users.controller';
import { UserService } from '../services/user.service';
import { supabaseClient } from '../services/supabase';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService],
})

export class UserModule {}