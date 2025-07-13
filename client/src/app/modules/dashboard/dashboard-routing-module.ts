import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { View } from './view/view';
import { ErrorPage } from './error-page/error-page';
import { authGuard } from '../auth/services/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./view/view').then((m) => m.View),
    canActivate: [authGuard],
    data: { requiresAuth: true },
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home-module').then((m) => m.HomeModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: ErrorPage,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: ErrorPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
