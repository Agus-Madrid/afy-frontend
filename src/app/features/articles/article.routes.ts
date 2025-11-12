import { Routes } from '@angular/router';

import { ArticlePageComponent } from './containers/article-page/article-page.component';

export const articlesRoutes: Routes = [
  { path: '', component: ArticlePageComponent, title: 'Artículos' }
  // { path: ':id', component: ArticleDetailPage, title: 'Detalle de artículo' },
];

