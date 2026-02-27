import { Routes } from '@angular/router';

import { ArticleContainerComponent } from './containers/article-container/article-container.component';
import { ArticleDetailContainerComponent } from './containers/article-detail-container/article-detail-container.component';

export const articlesRoutes: Routes = [
  { path: '', component: ArticleContainerComponent, title: 'Artículos' },
  { path: ':id', component: ArticleDetailContainerComponent, title: 'Detalle de artículo' },
];

