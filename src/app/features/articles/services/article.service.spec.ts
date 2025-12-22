import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ArticleDto } from '../models/article.model';
import { API_BASE_URL } from '../../../shared/config/api-base-url.token';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:8080/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ArticleService,
        {
          provide: API_BASE_URL,
          useValue: baseUrl
        }
      ]
    });

    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch articles with pageable params', () => {
    const mockArticles: ArticleDto[] = [{ id: 1, title: 'Test', content: 'Content' }];

    service.getArticles({ page: 1, size: 10 }).subscribe((articles) => {
      expect(articles).toEqual(mockArticles);
    });

    const req = httpMock.expectOne(`${baseUrl}/articles?page=1&size=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArticles);
  });

  it('should create an article', () => {
    const payload: ArticleDto = { title: 'New', content: 'Body' };
    const created: ArticleDto = { ...payload, id: 123 };

    service.createArticle(payload).subscribe((article) => {
      expect(article).toEqual(created);
    });

    const req = httpMock.expectOne(`${baseUrl}/articles`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(created);
  });

  it('should update an article', () => {
    const payload: ArticleDto = { id: 5, title: 'Updated', content: 'Body' };

    service.updateArticle(5, payload).subscribe((article) => {
      expect(article).toEqual(payload);
    });

    const req = httpMock.expectOne(`${baseUrl}/articles/5`);
    expect(req.request.method).toBe('PUT');
    req.flush(payload);
  });

  it('should delete an article', () => {
    service.deleteArticle(8).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${baseUrl}/articles/8`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
