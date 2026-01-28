import { Component, inject, input, output } from "@angular/core";
import { EditorComponent } from "../../../../shared/editor/editor";
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { StorageService } from "src/app/features/articles/services/storage.service";
import { NgFor, NgIf } from "@angular/common";
import { GenreDto } from "src/app/features/articles/models/genre.model";

@Component({
    selector: "app-admin-alta-ui",
    standalone: true,
    templateUrl: "./admin-alta-ui.component.html",
    styleUrls: ["./admin-alta-ui.component.css"],
    imports: [EditorComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, NgIf, NgFor]
})

export class AdminAltaUiComponent {
    formGroup = input<FormGroup>();
    genres = input<GenreDto[]>();
    fileSelected = output<Event>();
    guardarContenidoArticulo = output<string>();
    guardarImagenEvento = output<HTMLInputElement>();
    limpiarFileSelected = output<HTMLInputElement>();

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
        this.limpiarFileSelected.emit(inputFile);
    }

    volver(): void {
        globalThis.history.back();
    }
}