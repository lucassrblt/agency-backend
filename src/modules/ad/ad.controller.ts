import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { AdService } from './ad.service';
import { Ad } from './ad.entity';
import { AdContentI, AdRequestI, AdResponseI } from '../../interface/Ad.interface';

@Controller('ad')
export class AdController {
  constructor(private readonly adService: AdService) {
  }


  @Get()
  async getAll(@Query() query: { city?: string, squarefoot?: number, price?: number, type?: string }): Promise<AdResponseI> {
    const { city, squarefoot, price, type } = query;
    return this.adService.getAll(city, squarefoot, price, type);
  }

  @Get('/cities')
  getCities(): Promise<any> {
    return this.adService.getCities();
  }

  @Post()
  async create(@Body() ad: any): Promise<AdResponseI> {
    return this.adService.create(ad);
  }

  @Put('')
  async update(@Body() ad: AdRequestI): Promise<AdResponseI> {
    return this.adService.update(ad);
  }

}