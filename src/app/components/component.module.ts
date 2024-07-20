import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { FilterComponent } from './filter/filter.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { FormReserveComponent } from './form-reserve/form-reserve.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ToolbarComponent,
    RestaurantListComponent,
    FilterComponent,
    TypeaheadComponent,
    LogoutComponent,
    FormReserveComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ToolbarComponent,
    RestaurantListComponent,
    FilterComponent,
    TypeaheadComponent,
    FormReserveComponent
    // LogoutComponent
  ]
})
export class ComponentModule { }
