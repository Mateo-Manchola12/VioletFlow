import { CanActivateFn, Router } from '@angular/router';
import { Session } from './session';
import { filter, map, switchMap, take } from 'rxjs';
import { inject } from '@angular/core';
import { Toast } from '../../common/services/toast';

export const authGuard: CanActivateFn = (route, state) => {
  const session = inject(Session);
  const router = inject(Router);
  const toaster = inject(Toast);
  const requiresAuth = route.data['requiresAuth'] ?? true;
  return session.isSessionInitialized().pipe(
    filter((init) => init),
    take(1),
    switchMap(() => {
      return session.setUser().pipe(
        take(1),
        map((user) => {
          if (requiresAuth) {
            if (user) return true;
            toaster.error('Please log in to continue.');
            return router.createUrlTree(['/auth/signin']);
          } else {
            if (!user) return true;
            toaster.error('You are already logged in.');
            return router.createUrlTree(['/dashboard']);
          }
        }),
      );
    }),
  );
};
