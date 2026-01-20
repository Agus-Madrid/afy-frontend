import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header/header.component';
import { GenreService } from '../../features/articles/services/genre.service';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AsyncPipe],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css'
})
export class PublicLayoutComponent {
  private readonly router = inject(Router);
  private readonly genreService = inject(GenreService);
  protected readonly backgroundImage$ = this.genreService.backgroundImage$;

  protected get isHome(): boolean {
    return this.router.url === '/' || this.router.url.startsWith('/home');
  }
}
