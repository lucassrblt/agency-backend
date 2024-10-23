import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AdService } from '../services/ad.service';
// import { Ad, AdRequest } from '../interface/Ad.interface';

@Controller('ad')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Get()
  getAds(
    @Query('type') type: number,
    @Query('squarefoot') squarefoot: number,
    @Query('price') price: number,
    @Query('city') city: string,
  ): any {
    return this.adService.getAds(type, squarefoot, price, city);
  }

  // @Post()
  // saveAd(@Body() ad: AdRequest): any {
  //   // return this.adService.saveAd(ad);
  // }

}
