import { Component, inject, OnInit } from "@angular/core";
import { ArticleDetailUiComponent } from "../../ui/article-detail-ui/article-detail-ui.component";
import { ArticleDto } from "../../models/article.model";
import { ArticleService } from "../../services/article.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-article-detail-container",
    standalone: true,
    templateUrl: "./article-detail-container.component.html",
    imports: [ArticleDetailUiComponent]
})

export class ArticleDetailContainerComponent implements OnInit{
    private readonly route = inject(ActivatedRoute);

    article!: ArticleDto;
    articleId!: number;
    articleService = inject(ArticleService);

    ngOnInit(): void {
       this.loadArticleId();
       this.loadArticle();
    }

    private loadArticle(): void {
        this.articleService.getArticleById(this.articleId).subscribe({
            next: (article) => {
                this.article = article;
            },
            error: (error) => {
                console.error("Error loading article:", error);
            }
        });
    }

    private loadArticleId(): void {
        this.articleId = Number(this.route.snapshot.paramMap.get("id"));
    }
}
