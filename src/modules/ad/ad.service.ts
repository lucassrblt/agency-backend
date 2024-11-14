import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ad } from './ad.entity';
import sequelize, { Op, Sequelize } from 'sequelize';
import { AdImage } from '../ad_image/ad_image.entity';
import { AdMetadata } from '../ad_metadata/ad_metadata.entity';
import { AdRequestI, AdResponseI } from '../../interface/Ad.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AdService {
  constructor(@InjectModel(Ad) private adModel: typeof Ad) {
  }

  async getAll(
    city?: string,
    squarefoot?: number,
    price?: number,
    type?: string,
  ): Promise<AdResponseI> {
    try {
      const whereClause = {};
      if (city) {
        whereClause['city'] = city;
      }

      if (squarefoot) {
        whereClause['squarefoot'] = {
          [Op.gte]: squarefoot,
        };
      }

      if (price) {
        whereClause['price'] = {
          [Op.lte]: price,
        };
      }

      if (type) {
        whereClause['type'] = type;
      }
      const response = await this.adModel.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']],
        include: [
          { model: AdImage, as: 'images' },
          { model: AdMetadata, as: 'metadata' },
        ],
      });

      const dataValue = response.map((ad) => ad.dataValues);

      if (response.length === 0) {
        throw new Error('No ads found');
      }

      return {
        status: 'SUCCESS',
        data: dataValue,
        code: 200,
      };
    } catch (e) {
      throw new Error(`Failed to fetch ads: ${e}`);
    }
  }

  async getCities(): Promise<any> {
    try {
      const response = await this.adModel.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('city')), 'city']],
      });
      const cities = response.map((ad) => ad.getDataValue('city'));

      if (cities.length === 0) {
        throw new Error('No cities found');
      }

      return {
        status: 'SUCCESS',
        data: cities,
        code: 200,
      };
    } catch (e) {
      throw new Error(`Failed to fetch cities: ${e}`);
    }
  }

  async create(ad: any): Promise<AdResponseI> {
    const transaction = await this.adModel.sequelize.transaction();
    try {
      let { content, metadata, images } = ad;
      const adId = uuidv4();
      const metadataId = uuidv4();
      content = { ...content, id: adId };
      metadata = { ...metadata, id: metadataId, adId: adId };
      images = images.map((image) => {
        const id = uuidv4();
        return { ...image, id: id, adId: adId };
      });

      if (!content || !metadata || !images) {
        throw new Error(
          'Invalid request, be sure to add content, metadata and images',
        );
      }
      const newAd = await this.adModel.create(content, { transaction });

      await AdMetadata.create(metadata, { transaction });
      await AdImage.bulkCreate(images, { transaction });

      await transaction.commit();

      const responseValue = await Ad.findByPk(newAd.id, {
        include: [
          { model: AdMetadata },
          { model: AdImage }
        ]
      });


      return {
        status: 'SUCCESS',
        data: responseValue.dataValues,
        code: 201,
      };
    } catch (e) {
      throw new Error(`Failed to create ad: ${e}`);
    }
  }

  async update(ad: AdRequestI): Promise<any> {
    try {
      const { content, images, metadata } = ad;

      if (!content || !metadata || !images) {
        throw new Error(
          'Invalid request, be sure to add content, metadata and images',
        );
      }



    } catch (e) {
      throw new Error(`Failed to update ad: ${e}`);
    }
  }
}