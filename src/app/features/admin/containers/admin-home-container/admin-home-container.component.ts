import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AdminHomeUiComponent } from "../../ui/admin-home-ui/admin-home-ui.component";
import { ArticleService } from 'src/app/features/articles/services/article.service';
import { ArticleDto } from 'src/app/features/articles/models/article.model';
import { StatsService } from 'src/app/features/articles/services/stats.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-admin-home-container',
  standalone: true,
  templateUrl: './admin-home-container.component.html',
  imports: [AdminHomeUiComponent]
})
export class AdminHomeContainerComponent implements OnInit, OnDestroy {
  private readonly articleService = inject(ArticleService);
  private readonly statsService = inject(StatsService);

  subscription: Subscription | null = null;
  protected everyFiveSeconds = timer(0, 5000);
  protected articles: ArticleDto[] = [];
  protected totalArticlesCount: number = 0;
  protected totalViewsCount: number = 0;

  ngOnInit(): void {
    this.obtenerArticulos();
    this.obtenerEstadisticas();
    this.suscribeToTimer();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  
  obtenerArticulos(): void {
    this.articleService.getArticles().subscribe({
      next: (response: any) => {
        this.articles = response.content;
      }
    });
  }

  obtenerEstadisticas(): void {
    this.statsService.getTotalArticlesCount().subscribe({
      next: (count: number) => {
        this.totalArticlesCount = count;
      }
    });

    this.statsService.getTotalViewsCount().subscribe({
      next: (count: number) => {
        this.totalViewsCount = count;
      }
    });
  }

  suscribeToTimer(): void {
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.obtenerEstadisticas();
    });
  }

  deleteArticulo(articleId: number): void {
    this.articleService.deleteArticle(articleId).subscribe({
      next: () => {
        this.obtenerArticulos();
        this.obtenerEstadisticas();
      }
    });
  }
}
