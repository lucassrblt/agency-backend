import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';

interface City {
  "city": string
}

@Injectable()
export class AdService {
  private supabaseClient: SupabaseClient;

  constructor(private supabaseService: SupabaseService) {
    this.supabaseClient = this.supabaseService.getClient();
  }


  async getAds(
    type?: string,
    squarefoot?: string,
    price?:  string,
    city?: string,
  ): Promise<any> {
    try {
      let query = this.supabaseClient.from('ads').select(`
    *,
    images!ad_id (
      url,
      id
    )
  `);
;


      if (type !== null && type !== undefined) {
        console.log('type', type);
        query = query.eq('type', parseInt(type));
      }

      if (squarefoot !== null && squarefoot !== undefined) {
        console.log('squarefoot', squarefoot);
        query = query.gte('squarefoot', parseInt(squarefoot));
      }

      if (price !== null && price !== undefined) {
        console.log('price', price);
        query = query.lte('price', parseInt(price));
      }

      if (city !== '' && city !== undefined) {
        console.log('city', city);
        query = query.eq('city', city);
      }

      let { data, error } = await query;


      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getCities(): Promise<City[]> {
    try {
      const { data, error } = await this.supabaseClient
        .from('distinct_cities')
        .select('city');

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getTechnicalSheet(adId: bigint): Promise<any> {
    try {
      const { data, error } = await this.supabaseClient
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

}
