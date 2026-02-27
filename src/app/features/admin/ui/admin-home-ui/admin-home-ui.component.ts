import { DatePipe, NgFor } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { ArticleDto } from "src/app/features/articles/models/article.model";

@Component({
    selector: "app-admin-home-ui",
    standalone: true,
    templateUrl: "./admin-home-ui.component.html",
    imports: [NgFor, DatePipe]
})

export class AdminHomeUiComponent {
    createRequested = output<void>();
    editRequested = output<number>();
    deleteRequested = output<number>();

    articles = input<ArticleDto[]>();
    totalArticlesCount = input<number>();
    totalViewsCount = input<number>();
}
