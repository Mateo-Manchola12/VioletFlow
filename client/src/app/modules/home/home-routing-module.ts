import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { View } from './view/view';

const routes: Routes = [
  {
    path: '',
    component: View,
    data: { title: 'Inicio' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
