import { Injectable } from '@nestjs/common';


@Injectable()
export class LocationService {
  constructor() {
  }

  async getLocations(key: string): Promise<any> {
    try{
      const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${key}&limit=5`);
      const data = await response.json();
      const dataSort = this.sortLocations(data.features);
      return {status: 'SUCCESS', data: dataSort, code: 200}
    }catch (e) {

    }
  }

  sortLocations(data: any) {
    let result = []
    data.map((item: any) => {
      result.push({
        city: item.properties.city,
        postcode: item.properties.postcode,
      })
    })
    return result
  }
}