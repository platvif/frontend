import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    RestaurantListComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ToolbarComponent,
    RestaurantListComponent,
    FilterComponent
  ]
})
export class ComponentModule { }
