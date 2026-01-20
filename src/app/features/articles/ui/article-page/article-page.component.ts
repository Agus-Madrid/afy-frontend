import { NgFor, NgIf } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { ArticleDto } from "../../models/article.model";
import { GenreDto } from "../../models/genre.model";
import { ArticleCardComponent } from "../article-card/article-card.component";

@Component({
    selector: "app-article-page",
    standalone: true,
    imports: [NgFor, NgIf, ArticleCardComponent],
    templateUrl: "./article-page.component.html",
    styleUrl: "./article-page.component.css"
})

export class ArticlePageComponent {
    articles = input<ArticleDto[]>();
    loading = input<boolean>();
    error = input<string | null>();
    actualGenre = input<GenreDto>();

    retry = output<void>();
    nextGenre = output<void>();
    prevGenre = output<void>();

    protected trackArticleById(_index: number, article: ArticleDto): number | string {
        return article.id ?? `${article.title}-${article.createdAt ?? _index}`;
    }
}

