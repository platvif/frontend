import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class MapsService {


  private API_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
  private API_KEY = 'EWNCPOOSHRxSJnuqswvK9BtGSJMy74KArK_RNtGxwsGu-TikhCH44vsnUdKrvID91RHssubpATki8ODV71-JgAmjWD_5bL0bia4bV8sl2TkSjk-MQZrzAGZdnJ5SZnYx';
  
  // https://rapidapi.com/ptwebsolution/api/restaurants222/playground/apiendpoint_1bd45c48-f3ec-4640-a518-2bf917e3bd47
  constructor(
    private http: HttpClient,
  ) { }

  // async searchRestaurants() {
  //   try {
  //     const response = await axios.get(this.API_URL, {
  //       headers: {
  //         'Authorization':  `Bearer ${this.API_KEY}`,
  //         // 'Access-Control-Allow-Origin': '*',
  //         'Accept': 'application/json'
  //       },
  //       params: {
  //         term: 'burger',
  //         // latitude: '26.012223',
  //         // longitude: '-80.149490'
  //         location: 'Hollywood, Florida'
  //       }
  //     });
  //     return response.data.businesses;
  //   } catch (error) {
  //     console.error('Error al obtener los restaurantes', error);
  //     return [];
  //   }
  // }

  async searchRestaurants(term?:string) {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Latitud: ', coordinates.coords.latitude);
    console.log('Longitud: ', coordinates.coords.longitude);


    const terms = 'hamburguesa';
    const latitude = coordinates.coords.latitude;
    const longitude = coordinates.coords.longitude;

    const response = await this.http.get(`http://localhost:3000/api/yelp/search`, {
      params: {
        terms,
        latitude,
        longitude
      }
    }).toPromise();
    return response;
  }

  async getGeolocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Latitud:', coordinates.coords.latitude);
      console.log('Longitud:', coordinates.coords.longitude);
    } catch (error) {
      console.error('Error al obtener la ubicacion', error);
    }
  }
  // async searchRestaurants() {
  //   try {
  //     const options = {
  //       method: 'GET',
  //       url: 'https://yelp-reviews.p.rapidapi.com/business-search',
  //       params: {
  //         query: 'burger',
  //         location: 'Hollywood, Florida, USA',
  //         sort_by: 'RECOMMENDED', // HIGHEST_RATED, REVIEW_COUNT, RECOMMENDED
  //         start: '0',
  //         price_range: '$', // $, $$, $$$, $$$$
  //         yelp_domain: 'yelp.com'
  //       },
  //       headers: {
  //         'x-rapidapi-key': 'EWNCPOOSHRxSJnuqswvK9BtGSJMy74KArK_RNtGxwsGu-TikhCH44vsnUdKrvID91RHssubpATki8ODV71-JgAmjWD_5bL0bia4bV8sl2TkSjk-MQZrzAGZdnJ5SZnYx',
  //         'x-rapidapi-host': 'yelp-reviews.p.rapidapi.com'
  //       }
  //     };
      
  //     try {
  //       const response = await axios.request(options);
  //       console.log(response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } catch (error) {
  //     console.error('Error al obtener los restaurantes: ', error);
  //     return null;
  //   }
  // }
}
