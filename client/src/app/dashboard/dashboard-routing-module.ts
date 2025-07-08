import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainView } from './main-view/main-view';
import { ErrorPage } from './pages/error-page/error-page';

const routes: Routes = [
  {
    path: '',
    component: MainView,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home-module').then((m) => m.HomeModule),
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
