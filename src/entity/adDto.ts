import { AdContent, AdImages, AdTechnicalSheet } from '../interface/Ad.interface';

export class AdDto {
  constructor(
    public content: AdContent,
    public images: AdImages,
    public technicalSheet: AdTechnicalSheet
  ) {}

  static fromData(data: any): AdDto {
    return new AdDto(
      data.content,
      data.images,
      data.technicalSheet
    );
  }
}