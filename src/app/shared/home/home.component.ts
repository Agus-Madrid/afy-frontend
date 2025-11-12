import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { finalize, fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ArticleService } from '../../features/articles/services/article.service';
import { ArticleDto } from '../../features/articles/models/article.model';
import { ArticleCardComponent } from '../../features/articles/ui/article-card/article-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, ArticleCardComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly articleService = inject(ArticleService);
  private readonly pageSize = 12;
  private currentPage = 0;
  private scrollSubscription?: Subscription;

  protected readonly articles = signal<ArticleDto[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly hasMore = signal(true);
  protected readonly canScrollLeft = signal(false);
  protected readonly canScrollRight = signal(false);

  @ViewChild('scrollContainer', { static: false }) private readonly scrollContainer?: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.loadNextPage();
  }

  ngAfterViewInit(): void {
    this.updateScrollButtons();
    this.setupScrollListener();
  }

  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
  }

  protected loadNextPage(): void {
    if (this.loading() || !this.hasMore() || this.error()) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.articleService
      .getArticles({ page: this.currentPage, size: this.pageSize })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (articleBatch) => {
          this.articles.update((current) => [...current, ...articleBatch]);
          this.currentPage += 1;

          if (articleBatch.length < this.pageSize) {
            this.hasMore.set(false);
          }

          setTimeout(() => this.updateScrollButtons(), 100);
        },
        error: () => {
          this.error.set('No se pudo cargar el listado de artículos.');
        }
      });
  }

  protected retry(): void {
    this.error.set(null);
    this.loadNextPage();
  }

  protected trackArticleById(_index: number, article: ArticleDto): number | string {
    return article.id ?? `${article.title}-${article.createdAt ?? _index}`;
  }

  protected scrollLeft(): void {
    const container = this.scrollContainer?.nativeElement;
    if (!container || !this.canScrollLeft()) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }

  protected scrollRight(): void {
    const container = this.scrollContainer?.nativeElement;
    if (!container || !this.canScrollRight()) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    // Cargar más artículos si estamos cerca del final
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const scrolledPercentage = (scrollLeft + clientWidth) / scrollWidth;
    
    if (scrolledPercentage > 0.7 && this.hasMore() && !this.loading()) {
      this.loadNextPage();
    }
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
}