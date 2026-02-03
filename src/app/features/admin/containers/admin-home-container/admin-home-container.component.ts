import { Component, inject } from '@angular/core';
import { AdminHomeUiComponent } from "../../ui/admin-home-ui/admin-home-ui.component";
import { ArticleService } from 'src/app/features/articles/services/article.service';
import { ArticleDto } from 'src/app/features/articles/models/article.model';

@Component({
  selector: 'app-admin-home-container',
  standalone: true,
  templateUrl: './admin-home-container.component.html',
  imports: [AdminHomeUiComponent]
})
export class AdminHomeContainerComponent {
  private readonly articleService = inject(ArticleService);
  protected articles: ArticleDto[] = [];

  ngOnInit(): void {
    this.obtenerArticulos();
  }
  
  obtenerArticulos(): void {
    this.articleService.getArticles().subscribe({
      next: (response: any) => {
        this.articles = response.content;
      }
    });
  }

}
