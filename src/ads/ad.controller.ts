import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AdService } from './ad.service';
import { AdRequest } from '../interface/Ad.interface';

@Controller('ad')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Get()
  getAds(
    @Query('type') type?: string,
    @Query('squarefoot') squarefoot?: string,
    @Query('price') price?: string,
    @Query('city') city?: string,
  ): any {
    return this.adService.getAds(type, squarefoot, price, city);
  }

  @Post()
  deleteAd(@Body() adRequest): any {
    return this.adService.deleteAd(adRequest);
  }

  @Get('/cities')
  getCities(): any {
    return this.adService.getCities();
  }

  // @Post()
  // saveAd(@Body() ad: AdRequest): any {
  //   // return this.adService.saveAd(ad);
  // }

}
