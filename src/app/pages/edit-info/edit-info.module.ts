import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditInfoPageRoutingModule } from './edit-info-routing.module';

import { EditInfoPage } from './edit-info.page';
import { ComponentModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditInfoPageRoutingModule,
    ComponentModule,
    ReactiveFormsModule
  ],
  declarations: [EditInfoPage]
})
export class EditInfoPageModule {}
