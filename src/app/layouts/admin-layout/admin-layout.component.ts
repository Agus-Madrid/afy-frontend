import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GenreService } from '../../features/articles/services/genre.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  private readonly genreService = inject(GenreService);
  protected readonly backgroundImage$ = this.genreService.backgroundImage$;
}
