import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainView } from './main-view/main-view';

const routes: Routes = [
  {
    path: '',
    component: MainView,
    data: { title: 'Inicio' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
