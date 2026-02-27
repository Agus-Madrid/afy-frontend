import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AdminHomeUiComponent } from "../../ui/admin-home-ui/admin-home-ui.component";
import { ArticleService } from 'src/app/features/articles/services/article.service';
import { ArticleDto } from 'src/app/features/articles/models/article.model';
import { StatsService } from 'src/app/features/articles/services/stats.service';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-admin-home-container',
  standalone: true,
  templateUrl: './admin-home-container.component.html',
  imports: [AdminHomeUiComponent]
})
export class AdminHomeContainerComponent implements OnInit, OnDestroy {
  private readonly articleService = inject(ArticleService);
  private readonly statsService = inject(StatsService);
  private readonly router = inject(Router);
  private readonly modalService = inject(ModalService);

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

  navigateToAlta(): void {
    this.router.navigate(['/admin/alta']);
  }

  navigateToModificacion(articleId: number): void {
    this.router.navigate([`/admin/modificar/${articleId}`]);
  }

  confirmDelete(articleId: number): void {
    const title = 'Confirmacion';
    const message = 'Estas seguro de que deseas eliminar este articulo?';
    this.modalService.confirm(title, message).then((confirmed) => {
      if (confirmed) {
        this.deleteArticulo(articleId);
      }
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
