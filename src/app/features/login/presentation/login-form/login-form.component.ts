import { Component, output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginSubmitModel } from "../../models/login-submit.model";

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.css',
})

export class LoginFormComponent {

    loginSubmit = output<LoginSubmitModel>();

    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })

    onSubmit() {
        if (this.loginForm.valid) {
            this.loginSubmit.emit(this.loginForm.getRawValue());
        }
    }
}
