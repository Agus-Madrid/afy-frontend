import { Component, input } from "@angular/core";
import { ArticleDto } from "../../models/article.model";
import { MarkdownPipe } from "../../../../shared/pipes/markdown.pipe";

@Component({
    selector: "app-article-detail-page",
    standalone: true,
    templateUrl: "./article-detail-page.component.html",
    styleUrls: ["./article-detail-page.component.css"],
    imports: [MarkdownPipe]
})
export class ArticleDetailPageComponent{
    article = input<ArticleDto>();
}