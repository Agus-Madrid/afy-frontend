import { Component, inject } from "@angular/core";
import { EditorComponent } from "../../../../shared/editor/editor";
import { ɵInternalFormsSharedModule } from "@angular/forms";
import { StorageService } from "src/app/features/articles/services/storage.service";

@Component({
    selector: "app-admin-alta-ui",
    standalone: true,
    templateUrl: "./admin-alta-ui.component.html",
    styleUrls: ["./admin-alta-ui.component.css"],
    imports: [EditorComponent, ɵInternalFormsSharedModule]
})

export class AdminAltaUiComponent {
    private readonly storageService = inject(StorageService);


    manageSelectionChange(event: any): void {
        const input = event.target as HTMLInputElement;
        if(input.files?.length == 1)  {
            const file = input.files[0];
            console.log('Archivo seleccionado:', file.name);
            this.storageService.store(file).subscribe({
                next: (storedObject) => {
                    console.log('Archivo almacenado con éxito:', storedObject);
                },
                error: (error) => {
                    console.error('Error al almacenar el archivo:', error);
                }
            });
        }
        else {
            console.debug('No se seleccionó ningún archivo o se seleccionaron múltiples archivos.');
        }
    }
}