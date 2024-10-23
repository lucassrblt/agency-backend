import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth.module';
import { AdModule } from './module/ad.module';

@Module({
  imports: [AuthModule, AdModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
