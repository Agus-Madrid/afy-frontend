import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ArticlePageComponent } from './article-page.component';
import { ArticleService } from '../../services/article.service';

class ArticleServiceStub {
  getArticles = jasmine.createSpy('getArticles').and.returnValue(of([]));
}

describe('ArticlePageComponent', () => {
  let component: ArticlePageComponent;
  let fixture: ComponentFixture<ArticlePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlePageComponent],
      providers: [{ provide: ArticleService, useClass: ArticleServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

