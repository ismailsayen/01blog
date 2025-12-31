import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth/auth-guard';
import { guestGuard } from './core/guard/auth/guest-guard';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./features/auth/pages/register/register').then((m) => m.Register),
    title: 'register',
    canActivate:[guestGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login').then((m) => m.Login),
    title: 'login',
    canActivate:[guestGuard]

  },
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home-component/home-component').then((m) => m.HomeComponent),
    canActivate:[authGuard],
    title: 'home',
  },
];
