import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token/token.service';
import { MethodPostLoaderService } from '../services/loaders/method-post-loader.service';
import { finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenService).getToken();
  const loader = inject(MethodPostLoaderService);
  req = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  if (req.method === 'POST') {
    loader.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (req.method === 'POST') {
        loader.hide();
      }

    })
  );
};
