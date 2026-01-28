import { Routes } from "@angular/router";

export const routes: Routes = [

    {
        path:'',
        loadComponent:()=>import ('../../features/admin/dashboard-home/dashboard-home').then(m=>m.DashboardHome),
        title:'dashboard'
    },
    {
        path:'users',
        loadComponent:()=>import ('../../features/admin/dashboard-users/dashboard-users').then(m=>m.DashboardUsers),
        title:'dashboard'
    }
    ,
    {
        path:'blogs',
        loadComponent:()=>import ('../../features/admin/dashboard-blogs/dashboard-blogs').then(m=>m.DashboardBlogs),
        title:'dashboard'
    }
    ,
    {
        path:'reports',
        loadComponent:()=>import ('../../features/admin/dashboard-reports/dashboard-reports').then(m=>m.DashboardReports),
        title:'dashboard'
    }
]