import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class MapsService {


  private API_URL = 'http://localhost:3000/api/yelp/search';

  // https://rapidapi.com/ptwebsolution/api/restaurants222/playground/apiendpoint_1bd45c48-f3ec-4640-a518-2bf917e3bd47

  constructor(
    private http: HttpClient,
  ) { }

  async searchRestaurant(term:string, userLocation?:string) {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Latitud: ', coordinates.coords.latitude);
    console.log('Longitud: ', coordinates.coords.longitude);


    const terms = 'hamburguesa';
    const latitude = coordinates.coords.latitude;
    const longitude = coordinates.coords.longitude;

    const response = await this.http.get(`http://localhost:3000/api/yelp/search`, {
      params: {
        term, 
        latitude,
        longitude
      }
    }).toPromise();
    return response;
  }

  async updateRestaurants(term:string, userLocation?:string) {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Latitude:', coordinates.coords.latitude);
    console.log('Longitud: ', coordinates.coords.longitude);


    const terms = 'hamburguesa';
    const latitude = coordinates.coords.latitude;
    const longitude = coordinates.coords.longitude;
    const radius = '12000';
    const price = '1';
  }

  async searchRestaurants(term: string, userLocation?: string, radius?: string, price?: string, catalog?: string) {
    const coordinates = await Geolocation.getCurrentPosition();
    
    console.log('Latitud: ', coordinates.coords.latitude);
    console.log('Longitud: ', coordinates.coords.longitude);

    // Default values
    const defaultRadius = '12000';
    const defaultPrice = '1';
    const latitude = coordinates.coords.latitude;
    const longitude = coordinates.coords.longitude;

    // Constructing the parameters for the request
    let params: any = {
        term,
        radius: radius || defaultRadius,
        price: price || defaultPrice
    };

    // Add location parameters based on userLocation presence
    if (userLocation) {
        params.location = userLocation;
    } else {
        params.latitude = latitude;
        params.longitude = longitude;
    }

    // Add catalog if provided
    if (catalog) {
        params.catalog = catalog;
    }

    // Making the request
    const response = await this.http.get(`http://localhost:3000/api/yelp/search`, { params }).toPromise();
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
}
