import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { FilterComponent } from './filter/filter.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ToolbarComponent,
    RestaurantListComponent,
    FilterComponent,
    TypeaheadComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent,
    RestaurantListComponent,
    FilterComponent,
    TypeaheadComponent
  ]
})
export class ComponentModule { }
