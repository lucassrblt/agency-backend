import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ad } from './ad.entity';

@Injectable()
export class AdService{
    constructor(@InjectModel(Ad) private adModel: typeof Ad) {}

    async getAll(): Promise<any> {
        const response = await this.adModel.findAll();
        console.log('response', response);
        return 'nothing';
    }
}