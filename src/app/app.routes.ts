import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./features/articles/containers/article-page/article-page.component').then(m => m.ArticlePageComponent),
    title: 'Inicio'
  },
  {
    path: 'articles',
    loadChildren: () => import('./features/articles/article.routes').then(m => m.articlesRoutes)
  },
  { path: '**', redirectTo: 'home' }
];
