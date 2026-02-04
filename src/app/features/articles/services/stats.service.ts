import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApiService } from '../../../shared/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService extends BaseApiService {
  private readonly resourcePath = 'stats';

  getTotalViewsCount(): Observable<number> {
    return this.http.get<number>(this.buildUrl(`${this.resourcePath}/articles`));
  }

  getTotalArticleViewsCount(articleId: number): Observable<number> {
    return this.http.get<number>(this.buildUrl(`${this.resourcePath}/articles/${articleId}/views`));
  }

  getTotalArticlesCount(): Observable<number> {
    return this.http.get<number>(this.buildUrl(`${this.resourcePath}/articles/total`));
  }
}
