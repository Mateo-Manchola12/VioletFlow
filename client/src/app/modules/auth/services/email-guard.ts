import { CanActivateFn, Router } from '@angular/router';
import { Session } from './session';
import { filter, map, switchMap, take } from 'rxjs';
import { inject } from '@angular/core';
import { Toast } from '../../common/services/toast';

export const emailGuard: CanActivateFn = (route, state) => {
  const session = inject(Session);
  const router = inject(Router);
  console.log(session.getUserData())
  const requiresVerification = route.data['requiresVerification'] ?? true;

  if(!requiresVerification && session.getUserData()?.is_email_verified) {
    return router.createUrlTree(['/dashboard']);
  }
  if(requiresVerification && !session.getUserData()?.is_email_verified) {
    return router.createUrlTree(['/dashboard/verify-email']);
  }
  return true;
};
