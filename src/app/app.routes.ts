import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./features/articles/containers/article-page/article-page.component').then(m => m.ArticlePageComponent),
        title: 'Inicio'
      },
      {
        path: 'articles',
        loadChildren: () => import('./features/articles/article.routes').then(m => m.articlesRoutes)
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./features/login/containers/login-page/login-page.component').then(m => m.LoginPageComponent),
        title: 'Admin - Login'
      }
    ]
  },
  { path: '**', redirectTo: 'home' }
];
