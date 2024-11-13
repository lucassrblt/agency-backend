import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AdController } from './ad.controller';
import { AdService } from './ad.service';
import { Ad } from './ad.entity';
import { AdImage } from '../ad_image/ad_image.entity';
import { AdMetadata } from '../ad_metadata/ad_metadata.entity';
import { Sequelize } from 'sequelize';

@Module({
  controllers: [AdController],
  imports: [SequelizeModule.forFeature([Ad, AdImage, AdMetadata])],
  providers: [AdService],
  exports: [SequelizeModule] // Export if other modules need access to these models
})

export class AdModule {}