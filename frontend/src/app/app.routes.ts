import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth/auth-guard';
import { guestGuard } from './core/guard/auth/guest-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth').then((m) => m.Auth),
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.routes),
    canActivate: [guestGuard]
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home-component/home-component').then((m) => m.HomeComponent),
    title: 'home',
    canActivate: [authGuard],
  },
];
