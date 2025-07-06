import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainView } from './main-view/main-view';

const routes: Routes = [
  {
    path: '',
    component: MainView,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home-module').then((m) => m.HomeModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
