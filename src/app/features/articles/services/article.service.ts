import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ArticleDto, ArticleQueryParams } from '../models/article.model';
import { BaseApiService } from '../../../shared/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends BaseApiService {
  private readonly resourcePath = 'articles';

  getArticles(query?: ArticleQueryParams): Observable<ArticleDto[]> {
    const params = this.buildParams(query);
    return this.http.get<ArticleDto[]>(this.buildUrl(this.resourcePath), { params });
  }

  createArticle(article: ArticleDto): Observable<ArticleDto> {
    return this.http.post<ArticleDto>(this.buildUrl(this.resourcePath), article);
  }

  updateArticle(id: number, article: ArticleDto): Observable<ArticleDto> {
    return this.http.put<ArticleDto>(this.buildUrl(`${this.resourcePath}/${id}`), article);
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(this.buildUrl(`${this.resourcePath}/${id}`));
  }
}
