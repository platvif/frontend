import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReserveDetailPage } from './reserve-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ReserveDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReserveDetailPageRoutingModule {}
