import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { UserRequest } from '../../interface/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { compare, hash } from 'bcrypt';
import {sign} from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getAll(): Promise<any> {
    const response = await this.userModel.findAll();
    console.log('response', response);
    return 'nothing';
  }

  async create(user: UserRequest): Promise<User> {
    try {
      if (!user.password || user.password.trim() === '') {
        throw new Error('Password is required');
      }
      const mailUsed = await this.findOne(user.email);
      if (mailUsed) {
        throw new Error('Mail is already taken');
      }
      const userId = uuidv4();
      const hashedPassword = await hash(user.password, 10);
      const updatedUser = { ...user, id: userId, password: hashedPassword };
      return await this.userModel.create(updatedUser);
    } catch (e) {
      throw new Error(e);
    }
  }

  async login(user: UserRequest): Promise<any> {
    try {
      if (!user.password || user.password.trim() === '') {
        throw new Error('Password is required');
      }

      if (!user.email || user.email.trim() === '') {
        throw new Error('Email is required');
      }

      console.log('email', user.email);
      const userFound = (await this.findOne(user.email)) as User;
      console.log('userFound', userFound);
      if (!userFound) {
        throw new Error('User not found');
      }

      const isPasswordMatch = await compare(
        user.password,
        userFound.dataValues.password,
      );

      if (!isPasswordMatch) throw new Error('Credentials are incorrects');
      // Créer token + renvoyer un cookie avec le token

      const token = sign(
        {
          email: user.email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: '1h',
        },
      );

      return {
        status: 'success',
        token,
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOne(email: string): Promise<User | string> {
    return await this.userModel.findOne({ where: { email } });
  }
}
