import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./shared/home/home.component').then(m => m.HomeComponent),
    title: 'Inicio'
  },
  {
    path: 'articles',
    loadChildren: () => import('./features/articles/article.routes').then(m => m.articlesRoutes)
  },
  { path: '**', redirectTo: 'home' }
];
