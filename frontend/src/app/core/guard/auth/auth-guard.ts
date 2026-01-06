import { TokenService } from '../../services/token/token.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  const tokenService = inject(TokenService);

  if (tokenService.getToken() === '' || !authService.currentUser()) {
    console.log(tokenService.getToken());
    console.log(authService.currentUser());

    router.navigateByUrl('/auth/login')
    return false;
  }

  return true;
};
