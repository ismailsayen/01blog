import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TokenService } from '../../services/token/token.service';
import { catchError, map, of, tap } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  const tokenService = inject(TokenService);

  if (tokenService.getToken() === '' || !authService.currentUser()) {
    return true;
  }
  
  router.navigateByUrl('')
  return false;

};
