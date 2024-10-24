
export interface AdContent {
  id: bigint
  type: number,
  title: string
  price: number
  description: string
  zipcode: string
  city: string;
  room: number;
  bedroom: number;
  bathroom: number;
  parking: boolean;
  squarefoot: number;
}


export interface AdRequest {
  id: number,
  title: string,
}

export interface AdImages {
  id: bigint;
  adId: bigint;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdTechnicalSheet {
  id: bigint
  adId: bigint
  floot: number,
  last_floor: boolean,
  exposition: string,
  bus: number,
  subway: number,
}


export interface AdDto {
  ad : AdContent,
  technicalSheet: AdTechnicalSheet,
  images: AdImages[]
}