import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  if (authService.currentUser()?.role === "ROLE_ADMIN") {
    return true;
  }
  router.navigateByUrl('/')
  return false
};
