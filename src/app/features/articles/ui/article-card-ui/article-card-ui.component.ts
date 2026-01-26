import { Component, inject, Input, OnInit } from '@angular/core';
import { DatePipe, NgIf, NgStyle } from '@angular/common';

import { ArticleDto } from '../../models/article.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-card-ui',
  standalone: true,
  imports: [NgIf, DatePipe, NgStyle],
  templateUrl: './article-card-ui.component.html',
  styleUrl: './article-card-ui.component.css'
})
export class ArticleCardUiComponent {
  @Input({ required: true }) article!: ArticleDto;

  router = inject(Router);

  protected buildPreview(article: ArticleDto): string {
    const summary = article.description?.trim();
    if (summary) {
      return summary;
    }

    const content = article.content?.trim() ?? '';
    if (content.length <= 220) {
      return content;
    }

    return `${content.slice(0, 220).trimEnd()}…`;
  }

  protected navigateToArticle(): void {
    if (this.article.id) {
      this.router.navigate(['/articles', this.article.id]);
    }
  }
}

