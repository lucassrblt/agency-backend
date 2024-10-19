import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controller/auth.controller';
import { UserModule } from './user.module';
import { UserService } from '../services/user.service';
import { jwtConstants } from '../constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService],
})

export class AuthModule {}