import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  
  // https://rapidapi.com/ptwebsolution/api/restaurants222/playground/apiendpoint_1bd45c48-f3ec-4640-a518-2bf917e3bd47
  constructor() { }

  async searchRestaurants() {
    try {
      const options = {
        method: 'GET',
        url: 'https://yelp-reviews.p.rapidapi.com/business-search',
        params: {
          query: 'burger',
          location: 'Hollywood, Florida, USA',
          sort_by: 'RECOMMENDED',
          start: '0',
          price_range: '$', // $, $$, $$$, $$$$
          yelp_domain: 'yelp.com'
        },
        headers: {
          'x-rapidapi-key': 'de96a6fc31msh1ec2e725c712c7dp13860fjsna2f99e3aaa52',
          'x-rapidapi-host': 'yelp-reviews.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error('Error al obtener los restaurantes: ', error);
      return null;
    }
  }
}
