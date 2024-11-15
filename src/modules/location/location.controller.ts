import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AdService } from '../ad/ad.service';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  getLocations(@Query() query: any) {
    const { key } = query;
    return this.locationService.getLocations(key);
  }
}