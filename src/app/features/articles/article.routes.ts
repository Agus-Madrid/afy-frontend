import { Routes } from '@angular/router';

import { ArticleContainerComponent } from './containers/article-container/article-container.component';

export const articlesRoutes: Routes = [
  { path: '', component: ArticleContainerComponent, title: 'Artículos' }
  // { path: ':id', component: ArticleDetailPage, title: 'Detalle de artículo' },
];

