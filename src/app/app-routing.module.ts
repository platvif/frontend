import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './assets/services/auth.guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reserves',
    canActivate: [AuthGuardService],
    // loadChildren: () => import('./pages/reserves/reserves.module').then( m => m.ReservesPageModule),
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/reserves/reserves.module').then( m => m.ReservesPageModule),
      },
      {
        path: 'detail/:id',
        loadChildren: () => import('../app/pages/reserve-detail/reserve-detail.module')
        .then(m => m.ReserveDetailPageModule)
      }
    ]
  },
  {
    path: 'edit-info',
    loadChildren: () => import('./pages/edit-info/edit-info.module').then( m => m.EditInfoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
