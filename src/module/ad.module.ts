import { Module } from '@nestjs/common';
import { AdController } from '../controller/ad.controller';
import { AdService } from '../services/ad.service';

@Module({
  imports: [],
  controllers: [AdController],
  providers: [AdService],
  exports: [],
})

export class AdModule {}