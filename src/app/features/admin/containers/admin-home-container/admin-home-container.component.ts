import { Component, inject, OnInit } from '@angular/core';
import { AdminHomeUiComponent } from "../../ui/admin-home-ui/admin-home-ui.component";
import { ArticleService } from 'src/app/features/articles/services/article.service';
import { ArticleDto } from 'src/app/features/articles/models/article.model';
import { StatsService } from 'src/app/features/articles/services/stats.service';

@Component({
  selector: 'app-admin-home-container',
  standalone: true,
  templateUrl: './admin-home-container.component.html',
  imports: [AdminHomeUiComponent]
})
export class AdminHomeContainerComponent implements OnInit {
  private readonly articleService = inject(ArticleService);
  private readonly statsService = inject(StatsService);
  protected articles: ArticleDto[] = [];
  protected totalArticlesCount: number = 0;
  protected totalViewsCount: number = 0;

  ngOnInit(): void {
    this.obtenerArticulos();
    this.obtenerEstadisticas();
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

}
