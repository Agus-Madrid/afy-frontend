import { Component } from "@angular/core";
import { LoginFormComponent } from "../../presentation/login-form/login-form.component";
import { LoginSubmitModel } from "../../models/login-submit.model";

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [LoginFormComponent],
    template: '<app-login-form (loginSubmit)="onLoginSubmit($event)"></app-login-form>',
})

export class LoginPageComponent {

    onLoginSubmit(event: LoginSubmitModel){
        // Handle login submission
    }
}