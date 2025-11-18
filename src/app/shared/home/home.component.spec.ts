import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { ArticleService } from '../../features/articles/services/article.service';
import { GenreService } from '../../features/articles/services/genre.service';

class ArticleServiceStub {
  getArticles = jasmine.createSpy('getArticles').and.returnValue(of([]));
}

class GenreServiceStub {
  backgroundImage$ = of('');
  getGenres = jasmine.createSpy('getGenres').and.returnValue(of([]));
  loadGenreImageUrl = jasmine.createSpy('loadGenreImageUrl');
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: ArticleService, useClass: ArticleServiceStub },
        { provide: GenreService, useClass: GenreServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
