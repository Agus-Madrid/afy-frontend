import { Component, inject } from "@angular/core";
import { LoginFormComponent } from "../../presentation/login-form/login-form.component";
import { LoginSubmitModel } from "../../models/login-submit.model";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login-container',
    standalone: true,
    imports: [LoginFormComponent],
    template: '<app-login-form (loginSubmit)="onLoginSubmit($event)"></app-login-form>',
})

export class LoginContainerComponent {

    private readonly router = inject(Router);

    onLoginSubmit(event: LoginSubmitModel){
        // Handle login submission
        console.log('Login submitted:', event);
        //checkeo del backend sobre login
        console.log('Simulando llamada al backend para login...');
        //Checkeo exitoso entonces redirijo a home
        console.log('Login exitoso, redirigiendo a la página principal...');
        this.router.navigate(['/admin/home']);
    }
}
