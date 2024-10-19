import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { supabaseClient } from './supabase';
import { UserRequest } from '../interface/user.interface';

@Injectable()
export class UserService {
  async saveUser(userRequest: UserRequest): Promise<any> {
    console.log(userRequest);
    try {
      let {
        data,
        error
      } = await supabaseClient.from('users').select('*').eq('username', userRequest.username).single();

      if (data) {
        throw new NotFoundException('User already exists')
      }

      return await supabaseClient.from('users').insert([
        {
          username: userRequest.username,
          password: userRequest.password,
        },
      ]);

    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async findOne(username: string): Promise<any> {
    try{
      const { data, error } = await supabaseClient.from('users').select('*').eq('username', username).single();

      if(error){
        throw new NotFoundException('User not found');
      }

      return data;

    }catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}