import { Injectable } from '@nestjs/common';
import { supabaseClient } from './supabase';
import { AdDto } from '../entity/adDto';
import { AdContent } from '../interface/Ad.interface';

@Injectable()
export class AdService {
  async getAds(
    type: number | null ,
    squarefoot: number | null,
    price: number | null,
    city: string,
  ): Promise<any> {
    try {
      let query = supabaseClient.from('ads').select(`
    *,
    images!ad_id (
      url,
      id
    )
  `);
;


      if (type !== null && type !== undefined) {
        console.log('type', type);
        query = query.eq('type', type);
      }

      if (squarefoot !== null && squarefoot !== undefined) {
        console.log('squarefoot', squarefoot);
        query = query.gte('squarefoot', squarefoot);
      }

      if (price !== null && price !== undefined) {
        console.log('price', price);
        query = query.lte('price', price);
      }

      if (city !== '') {
        console.log('city', city);
        query = query.eq('city', city);
      }

      let { data, error } = await query;


      if (error) {
        throw new Error(error.message);
      }
      console.log('data', data);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getTechnicalSheet(adId: bigint): Promise<any> {
    try {
      const { data, error } = await supabaseClient
        .from('technicalSheet')
        .select('*')
        .eq('adId', adId);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getImages(adId: bigint): Promise<any> {
    try {
      const images = [];
      const { data, error } = await supabaseClient
        .from('images')
        .select('url')
        .eq('ad_id', adId);

      if (error) {
        throw new Error(error.message);
      }

      data.map((image: any) => {
        images.push(image.url);
      });

      return images;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
