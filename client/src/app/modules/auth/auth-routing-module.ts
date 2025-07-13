import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './services/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout').then((m) => m.Layout),
    canActivate: [authGuard],
    data: { requiresAuth: false },
    children: [
      {
        path: 'signin',
        loadComponent: () =>
          import('./pages/sign-in/sign-in').then((m) => m.SignIn),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./pages/sign-up/sign-up').then((m) => m.SignUp),
      },
      {
        path: '**',
        redirectTo: 'signin',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
