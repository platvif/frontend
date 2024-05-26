import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent  implements OnInit {

  @Input() restaurants: any;

  constructor() {     
  }

  ngOnInit() {
  }

}
