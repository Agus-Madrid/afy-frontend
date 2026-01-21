import { Component, OnInit, inject, signal } from '@angular/core';

import { ArticleService } from '../../services/article.service';
import { ArticleDto } from '../../models/article.model';
import { GenreDto } from '../../models/genre.model';
import { GenreService } from '../../services/genre.service';
import { GenreType } from '../../enum/genre-type.enum';
import { ArticleUiComponent } from '../../ui/article-ui/article-ui.component';

@Component({
  selector: 'app-article-container',
  standalone: true,
  imports: [ArticleUiComponent],
  templateUrl: './article-container.component.html'
})
export class ArticleContainerComponent implements OnInit {
  GenreType = GenreType;

  private readonly articleService = inject(ArticleService);
  private readonly genreService = inject(GenreService);

  private readonly pageSize = 4;
  private actualGenreId: number | null = null;

  protected actualGenre: GenreDto | undefined = undefined;
  protected readonly articles = signal<ArticleDto[]>([]);
  protected readonly genres = signal<GenreDto[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly hasMore = signal(true);

  ngOnInit(): void {
    this.getGenres();
  }

  protected loadNextPage(): void {
    if (this.loading() || this.error()) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.getArticlesByGenre();
  }

  protected retry(): void {
    this.error.set(null);
    this.loadNextPage();
  }

  //TODO: Refactorizar estos dos métodos para no repetir código, que sean uno solo
  protected nextGenre(): void {
    const genres = this.genres();
    if (genres.length === 0) return;

    const currentIndex = this.findCurrentGenreIndex(genres);
    const nextIndex = (currentIndex + 1) % genres.length;
    this.setActiveGenreByIndex(nextIndex, genres);
    this.loadNextPage();
  }

  protected prevGenre(): void {
    const genres = this.genres();
    if (genres.length === 0) return;

    const currentIndex = this.findCurrentGenreIndex(genres);
    const prevIndex = (currentIndex - 1 + genres.length) % genres.length;
    this.setActiveGenreByIndex(prevIndex, genres);
    this.loadNextPage();
  }

  private getGenres(): void {
    this.genreService.getGenres().subscribe({
      next: (genres) => {
        this.genres.set(genres);
        this.setActiveGenreByIndex(0, genres);
        //Cargo acá porque depende de los generos
        this.loadNextPage();
      },
      error: () => {
        // Manejo de error si es necesario
      }
    });
  }

  private getArticlesByGenre(): void {
    console.log('Cargando artículos para el género ID:', this.actualGenreId);
    this.articleService.getArticles({ page: 0, size: this.pageSize, genreId: this.actualGenreId ?? undefined})
      .subscribe({
        next: (articleBatch: any) => {
          const batch = articleBatch.content ?? [];
          this.articles.set(batch);
          this.hasMore.set(batch.length === this.pageSize);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar el listado de artículos para el género seleccionado.');
        }
      });
  }

  private findCurrentGenreIndex(genres: GenreDto[]): number {
    const index = genres.findIndex(genre => genre.id === this.actualGenreId);
    return index === -1 ? 0 : index;
  }

  private setActiveGenreByIndex(targetIndex: number, sourceGenres: GenreDto[] = this.genres()): void {
    if (sourceGenres.length === 0) {
      this.actualGenreId = null;
      this.actualGenre = undefined;
      this.genreService.loadGenreImageUrl();
      return;
    }

    const normalizedIndex = (targetIndex + sourceGenres.length) % sourceGenres.length;
    const selectedGenre = sourceGenres[normalizedIndex];

    this.actualGenreId = selectedGenre.id;
    this.actualGenre = selectedGenre;
    this.genreService.loadGenreImageUrl(selectedGenre.urlImage);
  }
}
