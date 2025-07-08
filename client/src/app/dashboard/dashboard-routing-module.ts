import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { View } from './view/view';
import { ErrorPage } from './error-page/error-page';

const routes: Routes = [
  {
    path: '',
    component: View,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../modules/home/home-module').then((m) => m.HomeModule),
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
