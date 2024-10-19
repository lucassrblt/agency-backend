import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UserService } from './services/user.service';
import { SupabaseService } from './services/supabase.service';
import { AuthModule } from './module/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
