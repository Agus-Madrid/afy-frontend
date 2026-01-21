import { Component, input } from "@angular/core";
import { ArticleDto } from "../../models/article.model";
import { MarkdownPipe } from "../../../../shared/pipes/markdown.pipe";
import { UpperCasePipe } from "@angular/common";

@Component({
    selector: "app-article-detail-ui",
    standalone: true,
    templateUrl: "./article-detail-ui.component.html",
    styleUrls: ["./article-detail-ui.component.css"],
    imports: [MarkdownPipe, UpperCasePipe]
})
export class ArticleDetailUiComponent{
    article = input<ArticleDto>();
}
