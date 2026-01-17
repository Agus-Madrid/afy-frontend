import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ArticleContainerComponent } from './article-container.component';
import { ArticleService } from '../../services/article.service';
import { GenreService } from '../../services/genre.service';

class ArticleServiceStub {
  getArticles = jasmine.createSpy('getArticles').and.returnValue(of([]));
}

class GenreServiceStub {
  backgroundImage$ = of('');
  getGenres = jasmine.createSpy('getGenres').and.returnValue(of([]));
  loadGenreImageUrl = jasmine.createSpy('loadGenreImageUrl');
}

describe('ArticleContainerComponent', () => {
  let component: ArticleContainerComponent;
  let fixture: ComponentFixture<ArticleContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleContainerComponent],
      providers: [
        { provide: ArticleService, useClass: ArticleServiceStub },
        { provide: GenreService, useClass: GenreServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
