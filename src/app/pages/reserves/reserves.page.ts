import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { MapsService } from 'src/app/assets/services/maps.service';


@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.page.html',
  styleUrls: ['./reserves.page.scss'],
})
export class ReservesPage implements OnInit {

  public restaurants:any = [];

  constructor(
    private mapsService: MapsService
  ) { }

  async ngOnInit() {
    await this.getRestaurants('');
  }

  async onEnter(event:any) {
    const value = event.target.value;
    console.log(value);
    await this.getRestaurants(value);
  }

  async getRestaurants(keyword:string) {
    try {
      console.log(keyword);
      const response = await this.mapsService.searchRestaurants(keyword); 
      console.log(response);
      this.restaurants = response;
    } catch(error) {
      console.error('console.error', error);
    }
  }
}
