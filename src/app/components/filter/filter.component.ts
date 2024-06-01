import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent  implements OnInit {

  prices = [
    {
      id: 1,
      name: '$'
    },
    {
      id: 2,
      name: '$$'
    },
    {
      id: 3,
      name: '$$$'
    },
    {
      id: 4,
      name: '$$$$'
    }
  ]



  // Pizza&categories=Sushi&categories=Burger

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  pinFormatter(value: number) {
    console.log(`${value}Mts`);
    return `${value}Mts`;
  }



  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }

  handleChange(event:any) {
    console.log('Current value: ', event.target.value);
  }

}
