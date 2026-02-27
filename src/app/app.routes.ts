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
        loadComponent: () => import('./features/articles/containers/article-container/article-container.component').then(m => m.ArticleContainerComponent),
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
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.routes),
  },
  { path: '**', redirectTo: 'home' }
];
