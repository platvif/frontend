import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapsService } from 'src/app/assets/services/maps.service';
// import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';

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
    private mapsService: MapsService
  ) { }

  ngOnInit() {
    // https://swiperjs.com/swiper-api#navigation => Lo usaremos luego para los ratings...
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id');
    });

    console.log(this.id);

    this.mapsService.getRestaurantDetails(this.id).then((res) => {
      console.log('Detalles del restaurante: ', res);
      this.restaurant = res;

      this.start = this.mapsService.splitTime(this.restaurant.hours[0].open[0].start);
      this.end = this.mapsService.splitTime(this.restaurant.hours[0].open[0].end);
  
      console.log(this.start, this.end);
    })

    
  }

  
}
