import { NgFor, NgIf } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { ArticleDto } from "../../models/article.model";
import { GenreDto } from "../../models/genre.model";
import { ArticleCardUiComponent } from "../article-card-ui/article-card-ui.component";

@Component({
    selector: "app-article-ui",
    standalone: true,
    imports: [NgFor, NgIf, ArticleCardUiComponent],
    templateUrl: "./article-ui.component.html",
    styleUrl: "./article-ui.component.css"
})

export class ArticleUiComponent {
    articles = input<ArticleDto[]>();
    loading = input<boolean>();
    genres = input<GenreDto[]>();
    error = input<string | null>();
    actualGenre = input<GenreDto>();

    retry = output<void>();
    nextGenre = output<void>();
    prevGenre = output<void>();


    protected trackArticleById(_index: number, article: ArticleDto): number | string {
        return article.id ?? `${article.title}-${article.createdAt ?? _index}`;
    }
}

