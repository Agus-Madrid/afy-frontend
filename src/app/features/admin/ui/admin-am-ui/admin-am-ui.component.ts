import { Component, input, output } from "@angular/core";
import { EditorComponent } from "../../../../shared/editor/editor";
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { NgFor, NgIf } from "@angular/common";
import { GenreDto } from "src/app/features/articles/models/genre.model";
import { ArticleDto } from "src/app/features/articles/models/article.model";

@Component({
    selector: "app-admin-am-ui",
    standalone: true,
    templateUrl: "./admin-am-ui.component.html",
    styleUrls: ["./admin-am-ui.component.css"],
    imports: [EditorComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, NgIf, NgFor]
})

export class AdminAmUiComponent {
    formGroup = input<FormGroup>();
    genres = input<GenreDto[]>();
    article = input<ArticleDto | null>();

    fileSelected = output<Event>();
    guardarContenidoArticulo = output<string>();
    guardarImagenEvento = output<HTMLInputElement>();
    limpiarFileSelected = output<HTMLInputElement>();

    newArticleTitle = 'Crear Artículo';
    editArticleTitle = 'Editar Artículo';
    newArticleSubtitle = 'Creación de un nuevo artículo';
    editArticleSubtitle = 'Modifica los datos del artículo';

    manageSelectionChange(event: any): void {
        const input = event.target as HTMLInputElement;
        if(input.files?.length == 1)  {
            this.guardarImagenEvento.emit(input);
        }
    }

    campoInvalidoLocal(campo: string): boolean {
        const control = this.formGroup()?.get(campo);
        return control ? control.invalid && control.touched : false;
    }

    emitirEventoGuardado(markdown: string): void {
        const inputFile = document.querySelector('#archivo') as HTMLInputElement;
        this.guardarContenidoArticulo.emit(markdown);
        if(this.formGroup()?.valid) {
            this.limpiarFileSelected.emit(inputFile);
        }
    }

    volver(): void {
        globalThis.history.back();
    }

    get title(): string {
        return this.article() ? this.editArticleTitle : this.newArticleTitle;
    }

    get subtitle(): string {
        return this.article() ? this.editArticleSubtitle : this.newArticleSubtitle;
    }
}