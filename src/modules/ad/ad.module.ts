import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AdController } from './ad.controller';
import { AdService } from './ad.service';
import { Ad } from './ad.entity';

@Module({
  controllers: [AdController],
  imports: [SequelizeModule.forFeature([Ad])],
  providers: [AdService],
})

export class AdModule {}