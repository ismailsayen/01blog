import { Routes } from "@angular/router";

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
    path: "**",
    redirectTo: ""
  }
]
