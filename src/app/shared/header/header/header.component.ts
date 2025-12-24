import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private readonly router = inject(Router);
  protected isMenuOpen = signal(false);
  
  handleLoginClick(): void {
    this.router.navigate(['/admin/login']);
  }

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }
}
