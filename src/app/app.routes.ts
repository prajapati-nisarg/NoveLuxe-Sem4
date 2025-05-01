import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { GenreComponent } from '../Components/genre/genre.component';
import { AdminDashboardComponent } from '../Components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from '../Components/admin-login/admin-login.component';
import { NovelDispComponent } from '../Components/novel-disp/novel-disp.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'genre',
        component: GenreComponent
    },
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent
    },
    {
        path: 'admin-login',
        component: AdminLoginComponent
    },
    {
        path: 'novel-disp',
        component: NovelDispComponent
    },
    {
        path : '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
