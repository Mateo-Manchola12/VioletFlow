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
  console.log('Auth Guard: URL =', state.url);
  console.log('Auth Guard: route.data =', route.data);
  console.log('Auth Guard: requiresAuth =', requiresAuth);
  console.log('Auth guard: Param =', route.data);
  return session.isSessionInitialized().pipe(
    filter((init) => init),
    take(1),
    switchMap(() => {
      return session.setUser().pipe(
        take(1),
        map((user) => {
          if (requiresAuth) {
            console.log('Auth Guard: requiresAuth is true');
            if (user) return true;
            toaster.error('Please log in to continue.');
            return router.createUrlTree(['/auth/signin']);
          } else {
            console.log('Auth Guard: requiresAuth is false');
            if (!user) return true;
            toaster.error('You are already logged in.');
            return router.createUrlTree(['/dashboard']);
          }
        }),
      );
    }),
  );
};
