import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-admin-home-ui",
    standalone: true,
    templateUrl: "./admin-home-ui.component.html"
})

export class AdminHomeUiComponent {
    private readonly router = inject(Router);
    
    navigateToAlta(): void {
        this.router.navigate(['/admin/alta']);
    }
}
