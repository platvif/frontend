import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { FilterComponent } from './filter/filter.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    RestaurantListComponent,
    FilterComponent,
    TypeaheadComponent,
    LogoutComponent
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
    TypeaheadComponent,
    // LogoutComponent
  ]
})
export class ComponentModule { }
