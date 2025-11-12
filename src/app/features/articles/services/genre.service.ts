import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenreDto } from '../models/genre.model';
import { BaseApiService } from '../../../shared/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class GenreService extends BaseApiService{
private readonly resourcePath = 'genres';

  getGenres(): Observable<GenreDto[]> {
    return this.http.get<GenreDto[]>(this.buildUrl(this.resourcePath));
  }
}
