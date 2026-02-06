import { DatePipe, NgFor } from "@angular/common";
import { Component, inject, input, output } from "@angular/core";
import { Router } from "@angular/router";
import { ArticleDto } from "src/app/features/articles/models/article.model";
import { ModalService } from "src/app/shared/services/modal.service";

@Component({
    selector: "app-admin-home-ui",
    standalone: true,
    templateUrl: "./admin-home-ui.component.html",
    imports: [NgFor, DatePipe]
})

export class AdminHomeUiComponent {
    private readonly router = inject(Router);
    private readonly modalService = inject(ModalService);
    
    deleteArticulo = output<number>();
    articles = input<ArticleDto[]>();
    totalArticlesCount = input<number>();
    totalViewsCount = input<number>();

    navigateToAlta(): void {
        this.router.navigate(['/admin/alta']);
    }

    navigateToModificacion(articleId: number): void {
        this.router.navigate([`/admin/modificar/${articleId}`]);
    }

    handleDelete(articleId: number): void {
        const title = 'Confirmación';
        const message = '¿Estás seguro de que deseas eliminar este artículo?';
        this.modalService.confirm(title, message).then(confirmed => {
            if (confirmed) {
                this.deleteArticulo.emit(articleId);
            }
        });
    }
}
