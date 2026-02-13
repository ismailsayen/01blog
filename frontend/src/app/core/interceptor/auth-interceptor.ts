import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token/token.service';
import { MethodPostLoaderService } from '../services/loaders/method-post-loader.service';
import { catchError, finalize, throwError } from 'rxjs';
import { InternalService } from '../services/errors/internal.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenService);
  const loader = inject(MethodPostLoaderService);
  const errService = inject(InternalService);
  const router = inject(Router);

  req = req.clone({
    setHeaders: {
      Authorization: token.getToken() ? `Bearer ${token.getToken()}` : '',
    },
  });
  if (req.method.toUpperCase() == 'POST') {
    loader.show();
  }

  return next(req).pipe(
    catchError((err) => {
      const status = err.status;
      const detail = err.error?.detail;

      if (
        status === 403 &&
        detail === 'Your account has been banned.' &&
        router.url !== '/auth/login'
      ) {
        errService.showPopUp(
          'banne',
          'Banned',
          'Your account has been banned. Please contact support.'
        );
        router.navigateByUrl('/auth/login')
        token.clearToken()

      } else if (status === 500) {
        errService.showPopUp(
          'server',
          'Server Error 500!',
          'Something went wrong on our server. Please refresh the page and try again.'
        );
        router.navigateByUrl('/auth/login')
        token.clearToken()
      } else if (status === 401) {
        token.clearToken()
        router.navigateByUrl('/auth/login')
      }

      return throwError(() => err);
    }),

    finalize(() => {
      if (req.method.toUpperCase() == 'POST') {
        loader.hide();
      }
    })
  );
};
