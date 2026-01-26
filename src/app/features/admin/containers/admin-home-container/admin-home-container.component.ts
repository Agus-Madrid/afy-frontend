import { Component } from '@angular/core';
import { AdminHomeUiComponent } from "../../ui/admin-home-ui/admin-home-ui.component";

@Component({
  selector: 'app-admin-home-container',
  standalone: true,
  templateUrl: './admin-home-container.component.html',
  imports: [AdminHomeUiComponent]
})
export class AdminHomeContainerComponent {}
