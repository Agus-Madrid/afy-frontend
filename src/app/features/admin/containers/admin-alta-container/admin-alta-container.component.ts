import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-alta-container',
  standalone: true,
  imports: [],
  template: `<p>admin-alta-container works!</p>`,
  styleUrl: './admin-alta-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAltaContainerComponent { }
