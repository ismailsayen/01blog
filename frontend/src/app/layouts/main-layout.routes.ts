import { Routes } from "@angular/router";
import { authGuard } from "../core/guard/auth/auth-guard";
import { adminGuard } from "../core/guard/admin/admin-guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/home/home-component').then((m) => m.HomeComponent),
    pathMatch: 'full',
    title: 'home',
  },
  {
    path: 'create-blog',
    loadComponent: () => import('../features/blog/create-blog/create-blog').then(m => m.CreateBlog),
    title: "create-blog"
  },
  {
    path: 'profile/:id',
    loadComponent: () => import('../features/profile/profile').then(m => m.Profile),
    title: 'Profile'
  },
  {
    path: 'blog/:id',
    loadComponent: () => import('../features/blog/blog-page/blog-page').then(m => m.BlogPage),
    title: 'Profile'
  },
  {
    path: 'update-blog/:id',
    loadComponent: () => import('../features/blog/create-blog/create-blog').then(m => m.CreateBlog),
    title: 'Profile'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard').then((m) => m.Dashboard),
    loadChildren: () => import('./dashboard/dashboard-layout.routes').then((m) => m.routes),
    title: 'dashborad',
    canActivateChild: [authGuard,adminGuard],
  },
  {
    path: "**",
    redirectTo: ""
  }
]
