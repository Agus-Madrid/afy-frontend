import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


export interface ModalContent {
    title: string;
    message: string;
}

@Injectable({
  providedIn: 'root'
})


export class ModalService {
    //Los subjects son una especie de Observable que permite emitir valores a los suscriptores.
    // En este caso, se utiliza para controlar la visibilidad del modal.
    private readonly showSubject = new Subject<ModalContent>();
    public show$ = this.showSubject.asObservable();

    // este se usa para almacenar la función de resolución de la promesa que se devuelve en el método confirm.
    private resolveRef: ((value: boolean) => void) | null = null;

    //Este es el confirm, que lo llamas desde donde queres el confirm
    confirm(title: string, message: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this.resolveRef = resolve;
            // el next es un metodo de subject que emite el valor alos subscruiptores
            this.showSubject.next({ title, message });
        });
    }

    //para cerrarlo, resolvemos la ref hacemos el next
    close(result: boolean): void {
        if(this.resolveRef) {
            this.resolveRef(result);
            this.resolveRef = null;
            this.showSubject.next({ title: '', message: '' });
        }
    }
}