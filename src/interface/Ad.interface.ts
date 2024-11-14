export interface AdResponseI {
  status: string;
  data: AdContentI[];
  code: number;
}

export interface AdRequestI {
  content: AdContentI,
  images: AdImageI[],
  metadata: AdMetadataI,
}

enum AdType {
  VENTE = 'VENTE',
  LOCATION = 'LOCATION',
}

export interface AdContentI {
  id?: string,
  title: string,
  description: string,
  price: number,
  zipcode: string,
  city: string,
  type : AdType,
  squarefoot: number,
  createdAt: Date,
  updatedAt: Date,
  images?: AdImageI[],
  metadata?: AdMetadataI,
}

export interface AdImageI {
  id?: string,
  adId: string,
  name: string,
  data: Blob,
  createdAt: Date,
  updatedAt: Date,
}


export interface AdMetadataI {
  id?: string,
  adId: string,
  buildYear: number,
  floor: number,
  room: number,
  bedroom: number,
  bathroom: number,
  parking: boolean,
  toilet: number,
  cellar: boolean,
  energyClass: string,
  gasClass: string,
  createdAt: EnergyClass,
  updatedAt: EnergyClass,
}

export enum EnergyClass {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G'
}