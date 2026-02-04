import { DatePipe, NgFor } from "@angular/common";
import { Component, inject, input } from "@angular/core";
import { Router } from "@angular/router";
import { ArticleDto } from "src/app/features/articles/models/article.model";

@Component({
    selector: "app-admin-home-ui",
    standalone: true,
    templateUrl: "./admin-home-ui.component.html",
    imports: [NgFor, DatePipe]
})

export class AdminHomeUiComponent {
    private readonly router = inject(Router);

    articles = input<ArticleDto[]>();
    
    navigateToAlta(): void {
        this.router.navigate(['/admin/alta']);
    }

    navigateToModificacion(articleId: number): void {
        this.router.navigate([`/admin/modificacion/${articleId}`]);
    }

    navigateToEliminacion(articleId: number): void {
        // Implement navigation to deletion page
    }
}
