import { Component } from '@angular/core';

import { HomeComponent } from '../../../../shared/home/home.component';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.css'
})
export class ArticlePageComponent {}
