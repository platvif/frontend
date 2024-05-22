import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservesPageRoutingModule } from './reserves-routing.module';

import { ReservesPage } from './reserves.page';

import { ComponentModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservesPageRoutingModule,
    ComponentModule
  ],
  declarations: [ReservesPage]
})
export class ReservesPageModule {}
