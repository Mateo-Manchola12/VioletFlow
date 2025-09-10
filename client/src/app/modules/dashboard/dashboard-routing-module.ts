import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPage } from './error-page/error-page';
import { authGuard } from '../auth/services/auth-guard';
import { emailGuard } from '../auth/services/email-guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./view/view').then((m) => m.View),
    canActivate: [authGuard],
    data: { requiresAuth: true },
    children: [
      {
        path: 'verify-email',
        canActivate: [emailGuard],
        loadComponent: () =>
          import('../auth/pages/verify-email/verify-email').then(
            (m) => m.VerifyEmailComponent,
          ),
        data: { requiresVerification: false },
      },
      {
        path: '',
        canActivate: [emailGuard],
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
            pathMatch: 'full',
            component: ErrorPage,
            data: { requiresAuth: true },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
