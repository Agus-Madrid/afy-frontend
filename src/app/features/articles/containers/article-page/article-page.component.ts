import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ArticleService } from '../../services/article.service';
import { ArticleDto } from '../../models/article.model';
import { ArticleCardComponent } from '../../ui/article-card/article-card.component';
import { GenreDto } from '../../models/genre.model';
import { GenreService } from '../../services/genre.service';
import { GenreType } from '../../enum/genre-type.enum';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [NgFor, NgIf, ArticleCardComponent],
  templateUrl: './article-page.component.html'
})
export class ArticlePageComponent implements OnInit, AfterViewInit, OnDestroy {
  GenreType = GenreType;

  private readonly articleService = inject(ArticleService);
  private readonly genreService = inject(GenreService);

  private readonly pageSize = 4;
  private scrollSubscription?: Subscription;
  private actualGenreId: number | null = null;

  protected actualGenre: GenreDto | undefined = undefined;
  protected readonly articles = signal<ArticleDto[]>([]);
  protected readonly genres = signal<GenreDto[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly hasMore = signal(true);
  protected readonly canScrollLeft = signal(false);
  protected readonly canScrollRight = signal(false);

  @ViewChild('scrollContainer', { static: false }) private readonly scrollContainer?: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.getGenres();
  }

  ngAfterViewInit(): void {
    this.updateScrollButtons();
    this.setupScrollListener();
  }

  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
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

  protected trackArticleById(_index: number, article: ArticleDto): number | string {
    return article.id ?? `${article.title}-${article.createdAt ?? _index}`;
  }

  protected scrollLeft(): void {
    this.prevGenre();
    this.loadNextPage();
  }

  protected scrollRight(): void {
    this.nextGenre();
    this.loadNextPage();
  }

  //TODO: Refactorizar estos dos métodos para no repetir código, que sean uno solo
  protected nextGenre(): void {
    const genres = this.genres();
    if (genres.length === 0) return;

    const currentIndex = this.findCurrentGenreIndex(genres);
    const nextIndex = (currentIndex + 1) % genres.length;
    this.setActiveGenreByIndex(nextIndex, genres);
  }

  protected prevGenre(): void {
    const genres = this.genres();
    if (genres.length === 0) return;

    const currentIndex = this.findCurrentGenreIndex(genres);
    const prevIndex = (currentIndex - 1 + genres.length) % genres.length;
    this.setActiveGenreByIndex(prevIndex, genres);
  }

  protected onScroll(): void {
    this.updateScrollButtons();
  }

  private setupScrollListener(): void {
    const container = this.scrollContainer?.nativeElement;
    if (!container) return;

    this.scrollSubscription = fromEvent(container, 'scroll')
      .pipe(debounceTime(100))
      .subscribe(() => this.updateScrollButtons());
  }

  private updateScrollButtons(): void {
    const container = this.scrollContainer?.nativeElement;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    this.canScrollLeft.set(scrollLeft > 0);
    this.canScrollRight.set(scrollLeft + clientWidth < scrollWidth - 1);
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
