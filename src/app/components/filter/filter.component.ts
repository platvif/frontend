import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Item } from '../../assets/utils/item';
import { Filter } from 'src/app/assets/utils/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent  implements OnInit {

  @Input() onButtonClick!: (domain: string) => void;

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
  selectedCatalog: string = '';

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

  public filter: any = {
    range: '',
    price: 0,
    location: '',
    catalog: ''
  }


  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  pinFormatter(value: number) {
    console.log(`${value}Mts`);
    const range = `${value}`;
    return range;
  }

  onChangeRange(value:any) {
    const range = `${value.target.value}`;
    this.filter.range = range;
    console.log('this.filter.range', this.filter.range)
  }

  private formatData(data: string[]) {
    if (data.length === 1) {
      const catalog = this.catalog.find((fruit) => fruit.value === data[0]);
      console.log('Catalog Selected?:', catalog?.text);
      return catalog!.text;
    }

    return `${data.length} items`;
  }

  private formatCatalog(selectedCatalogs: any): string {
    if (!selectedCatalogs || selectedCatalogs.length === 0) {
        return '';
    }
    
    // Assuming selectedCatalogs is an array of strings
    let formattedText = selectedCatalogs.map((item: string, index: number) => {
        return index === 0 ? item : `categories=${item}`;
    }).join('&');

    return formattedText;
}
  
  catalogSelectionChanged(catalog: any) {
    this.selectedCatalogs = catalog;
    this.selectedCatalog = this.formatCatalog(catalog);
    this.selectedCatalogText = this.formatData(this.selectedCatalogs);
    console.log('this.selectedCatalogs', this.selectedCatalog);
    this.filter.catalog = this.selectedCatalog;
    this.filter.catalog = this.selectedCatalog;
    this.modalCtrl.dismiss();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.onButtonClick(this.filter);
    return this.modalCtrl.dismiss('confirm');
  }

  onChangeLocation(event:any) {
    const value = event.target.value;
    console.log(event.target.value);
    this.filter.location = value;
  }

  onChangePrice(event:any) {
    console.log('Current value: ', event.target.value);
    const price = event.target.value;
    this.filter.price = price.id;
    console.log('this.filter.price', this.filter.price)
  }

  
}
