import { Component, Input } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';

import { ArticleDto } from '../../models/article.model';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: ArticleDto;

  protected buildPreview(article: ArticleDto): string {
    const summary = article.summary?.trim();
    if (summary) {
      return summary;
    }

    const content = article.content?.trim() ?? '';
    if (content.length <= 220) {
      return content;
    }

    return `${content.slice(0, 220).trimEnd()}…`;
  }
}

