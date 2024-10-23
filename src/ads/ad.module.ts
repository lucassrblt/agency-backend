import { Module } from '@nestjs/common';
import { AdController } from './ad.controller';
import { AdService } from './ad.service';
import { SupabaseService } from '../supabase/supabase.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [AdController],
  providers: [AdService, SupabaseService],
  exports: [],
})

export class AdModule {}