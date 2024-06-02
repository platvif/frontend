import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Item } from '../../assets/utils/item';

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

  selectedCatalogText = '0 Items';
  selectedCatalogs: string[] = [];

  // Pizza&categories=Sushi&categories=Burger

  catalog: Item[] = [
    { text: 'Pizza', value: 'pizza' },
    { text: 'Burger', value: 'burger' },
    { text: 'Pasta', value: 'pasta' },
    { text: 'Meat', value: 'meat' },
    { text: 'Salads', value: 'Salads' },
    { text: 'HotDogs', value: 'hotdogs' },
    { text: 'Chinese Food', value: 'chinese' },
    { text: 'Japanese Food', value: 'japanese' },
    { text: 'Tacos', value: 'tacos' },
    { text: 'Vegan', value: 'vegan' },
    { text: 'Bakery', value: 'bakery' },
    { text: 'Sandwich', value: 'sandwich' },
    { text: 'Coffee', value: 'coffee' },
    { text: 'Ice Scream', value: 'ice%20scream' },
    { text: 'Desserts', value: 'desserts' }
  ];

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  pinFormatter(value: number) {
    console.log(`${value}Mts`);
    return `${value}Mts`;
  }

  private formatData(data: string[]) {
    if (data.length === 1) {
      const catalog = this.catalog.find((fruit) => fruit.value === data[0]);
      console.log('Catalog Selected?:', catalog?.text);
      return catalog!.text;
    }

    return `${data.length} items`;
  }
  
  catalogSelectionChanged(catalog: any) {
    this.selectedCatalogs = catalog;
    this.selectedCatalogText = this.formatData(this.selectedCatalogs);
    this.modalCtrl.dismiss();
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
