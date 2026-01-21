import { Component } from '@angular/core';
import { AdminAltaUiComponent } from '../../ui/admin-alta-ui/admin-alta-ui.component';

@Component({
  selector: 'app-admin-alta-container',
  standalone: true,
  imports: [AdminAltaUiComponent],
  templateUrl: './admin-alta-container.component.html',
  styleUrl: './admin-alta-container.component.css',
})
export class AdminAltaContainerComponent { }
