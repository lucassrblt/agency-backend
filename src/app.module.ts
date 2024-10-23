import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdModule } from './ads/ad.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    AdModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
