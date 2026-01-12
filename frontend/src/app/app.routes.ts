import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth/auth-guard';
import { guestGuard } from './core/guard/auth/guest-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth').then((m) => m.Auth),
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.routes),
    canActivateChild: [guestGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout').then((m) => m.MainLayout),
    loadChildren: () => import('./layouts/main-layout.routes').then((m) => m.routes),
    title: 'home',
    canActivateChild: [authGuard],
  },
];
