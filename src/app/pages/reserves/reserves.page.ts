import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
import { YelpService } from 'src/app/assets/services/yelp.service';
import { UserService } from 'src/app/assets/services/user.service';
import { User } from 'src/app/assets/utils/user';
import { FilterComponent } from 'src/app/components/filter/filter.component';

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.page.html',
  styleUrls: ['./reserves.page.scss'],
})
export class ReservesPage implements OnInit {

  public restaurants:any = [];

  public searchKeyword:string = '';

  user?:User;

  constructor(
    private yelpService: YelpService,
    private modalController: ModalController,
    private userService: UserService
  ) {
    
   }

  async ngOnInit() {
    await this.getRestaurants('');
    this.userService.current.subscribe((res) => {
      this.user = res;
    })
    console.log('this.user en reserves', this.user);
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
      const response = await this.yelpService.searchRestaurants(keyword, ''); 
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
            const response = await this.yelpService.searchRestaurants(this.searchKeyword, filter?.location, filter?.radius, filter?.price, filter?.catalog);
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
