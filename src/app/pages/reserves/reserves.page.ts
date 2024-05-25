import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { MapsService } from 'src/app/assets/services/maps.service';


@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.page.html',
  styleUrls: ['./reserves.page.scss'],
})
export class ReservesPage implements OnInit {

  restaurants:[] = [];

  constructor(
    private mapsService: MapsService
  ) { }

  async ngOnInit() {
    await this.getRestaurants();
  }

  async getRestaurants() {
    this.mapsService.searchRestaurants().then((res) => {
      console.log(res);
      this.restaurants = res;
    })

    
  }
}
