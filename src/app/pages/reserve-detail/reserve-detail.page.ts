import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YelpService } from 'src/app/assets/services/yelp.service';
// import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import * as L from "leaflet";
import { LoadingController, ModalController } from '@ionic/angular';
import { FormReserveComponent } from 'src/app/components/form-reserve/form-reserve.component';

@Component({
  selector: 'app-reserve-detail',
  templateUrl: './reserve-detail.page.html',
  styleUrls: ['./reserve-detail.page.scss'],
})
export class ReserveDetailPage implements OnInit {

  id!:any;
  public restaurant: any;
  public start:any;
  public end:any;

  options: SwiperOptions = {
    slidesPerView: 1,
    enabled: true,
    pagination: true,
    autoHeight: true,
    effect:"cards",
    allowTouchMove:false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private yelpService: YelpService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    // https://swiperjs.com/swiper-api#navigation => Lo usaremos luego para los ratings...
    const loading = await this.loadingController.create({
      message: 'Loading',
      duration: 2000,
      backdropDismiss: true,
      showBackdrop: true
    })

    await loading.present();

    this.activatedRoute.paramMap.subscribe(async (paramMap) => {
      this.id = paramMap.get('id');
    });

    // await loading.dismiss();

    console.log(this.id);

    this.yelpService.getRestaurantDetails(this.id).then((res) => {
      console.log('Detalles del restaurante: ', res);
      this.restaurant = res;

      if(this.restaurant.hours) {
        this.start = this.yelpService.splitTime(this.restaurant?.hours[0]?.open[0]?.start);
        this.end = this.yelpService.splitTime(this.restaurant?.hours[0]?.open[0]?.end);
      } else {
        this.start = '09:00';
        this.end = '20:00';
      }
  
      console.log(this.start, this.end);
      if(res) {
        this.loadMap(res);
      }
    })
      
  }

  async loadMap(res:any) {

    // let map = L.map('map', {
    //   center: [res.latitude, res.longitude],
    //   zoom: 13,
    //   maxZoom: 16,
    //   minZoom: 6,
    //   renderer: L.canvas()
    // });
    let latitude = res.coordinates.latitude.toFixed(2);
    let longitude = res.coordinates.longitude.toFixed(2);

    let map = L.map('map').setView([latitude, longitude], 13);

    L.Icon.Default.imagePath = "assets/icon/leaflet/";
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      // maxZoom: 16,
      // minZoom:4,
      attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>',
    }).addTo(map);
    L.marker([latitude, longitude]).addTo(map);
    map.whenReady(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 1000);
    });
  }

  async onViewModal(event:any) {
    const modal = await this.modalController.create({
      component: FormReserveComponent,
      mode: 'ios',
      animated: true,
      componentProps: {
        restaurant: this.restaurant
      }
    })
    await modal.present();
  }
}
