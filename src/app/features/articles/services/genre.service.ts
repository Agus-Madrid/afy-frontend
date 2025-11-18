import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenreDto } from '../models/genre.model';
import { BaseApiService } from '../../../shared/services/base-api.service';

const DEFAULT_GENRE_BACKGROUND_URL =
  'https://plus.unsplash.com/premium_photo-1669750822199-fc9114724dd4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFpc2FqZSUyMG5hdHVyYWxlemF8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000';

@Injectable({
  providedIn: 'root'
})
export class GenreService extends BaseApiService {
  private readonly resourcePath = 'genres';
  private readonly backgroundImageSubject = new BehaviorSubject<string>(DEFAULT_GENRE_BACKGROUND_URL);

  readonly backgroundImage$ = this.backgroundImageSubject.asObservable();

  getGenres(): Observable<GenreDto[]> {
    return this.http.get<GenreDto[]>(this.buildUrl(this.resourcePath));
  }

  loadGenreImageUrl(genreUrl?: string): void {
    const sanitizedUrl = genreUrl?.trim();
    this.backgroundImageSubject.next(sanitizedUrl || DEFAULT_GENRE_BACKGROUND_URL);
  }
}
