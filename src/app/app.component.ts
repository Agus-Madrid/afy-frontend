import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header/header.component';
import { GenreService } from './features/articles/services/genre.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'afy-frontend';
  private readonly genreService = inject(GenreService);
  protected readonly backgroundImage$ = this.genreService.backgroundImage$;
}
