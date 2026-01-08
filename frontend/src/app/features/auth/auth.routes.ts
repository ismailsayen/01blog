import { Routes } from '@angular/router';
import { guestGuard } from '../../core/guard/auth/guest-guard';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';


export const routes: Routes = [
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
    },
    {
        path: 'register',
        component: Register,
        title: 'register',
    },
    {
        path: 'login',
        component: Login,
        title: 'login',

    },
]