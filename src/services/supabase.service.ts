import { Injectable } from '@nestjs/common';
import { supabaseClient } from './supabase';

@Injectable()
export class SupabaseService {

  async getAllUsers(){
    const { data, error } = await supabaseClient.from('users').select('*');

    if (error) {
      throw error;
    }
    return data;
  }
}
