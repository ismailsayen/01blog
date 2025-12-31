import { TokenService } from '../../services/token/token.service';
import { User } from '../../services/interfaces/userDTO';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, map, of, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  const tokenService = inject(TokenService);
  if (tokenService.getToken() === '') {
    return of(false);
  }

  if (authService.currentUser()) {
    return of(true);
  }


  return authService.isLogged().pipe(
    tap(user => {
      authService.currentUser.set(user)
    }),
    map(() => true),
    catchError(() => {
      authService.currentUser.set(null)
      router.navigateByUrl('/login')
      return of(false);
    })
  )


};
