import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
import { MapsService } from 'src/app/assets/services/maps.service';
import { FilterComponent } from 'src/app/components/filter/filter.component';

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.page.html',
  styleUrls: ['./reserves.page.scss'],
})
export class ReservesPage implements OnInit {

  public restaurants:any = [];

  public searchKeyword:string = '';

  constructor(
    private mapsService: MapsService,
    private modalController: ModalController
  ) {
    
   }

  async ngOnInit() {
    await this.getRestaurants('');
  }

  async onEnter(event:any) {
    const value = event.target.value;
    console.log(value);
    this.searchKeyword = value;
    await this.getRestaurants(value);
  }

  async getRestaurants(keyword:string) {
    try {
      console.log(keyword);
      const response = await this.mapsService.searchRestaurants(keyword, ''); 
      console.log(response);
      this.restaurants = response;
    } catch(error) {
      console.error('console.error', error);
    }
  }

  async onFilter() {
    const modal = await this.modalController.create({
      component: FilterComponent,
      mode: 'ios',
      showBackdrop: true,
      componentProps: {
        onButtonClick: async (filter:any) => {
          try {
            const response = await this.mapsService.searchRestaurants(this.searchKeyword, filter?.location, filter?.radius, filter?.price, filter?.catalog);
            console.log(response);
            this.restaurants = response;
          } catch(error) {
            console.error('No se pudo acceder a los restaurantes', error);
          }
        }
      },
      animated: true
    })

    await modal.present();
  }
}
