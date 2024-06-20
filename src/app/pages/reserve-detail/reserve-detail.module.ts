import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReserveDetailPageRoutingModule } from './reserve-detail-routing.module';

import { ReserveDetailPage } from './reserve-detail.page';
import { ComponentModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReserveDetailPageRoutingModule,
    ComponentModule
  ],
  declarations: [ReserveDetailPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReserveDetailPageModule {}
