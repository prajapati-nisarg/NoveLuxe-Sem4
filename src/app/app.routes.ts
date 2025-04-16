import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { GenreComponent } from '../Components/genre/genre.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'genre',
        component: GenreComponent
    }
];
