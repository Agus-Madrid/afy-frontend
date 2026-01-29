import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AdminAltaUiComponent } from '../../ui/admin-alta-ui/admin-alta-ui.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenreService } from 'src/app/features/articles/services/genre.service';
import { GenreDto } from 'src/app/features/articles/models/genre.model';
import { CreateArticleDto } from 'src/app/features/articles/models/create-article.model';
import { ArticleService } from 'src/app/features/articles/services/article.service';
import { StorageService } from 'src/app/features/articles/services/storage.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-admin-alta-container',
  standalone: true,
  imports: [AdminAltaUiComponent],
  templateUrl: './admin-alta-container.component.html',
  styleUrls: [`./admin-alta-container.component.css`],
})
export class AdminAltaContainerComponent implements OnInit {

  protected genres: GenreDto[] = [];

  private readonly genreService = inject(GenreService);
  private readonly articleService = inject(ArticleService);
  private readonly storageService = inject(StorageService);
  private readonly notificationService = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  articleForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    genre: [null, Validators.required],
    content: ['', Validators.required],
    cardImage: [null, Validators.required],
    description: ['', Validators.required],
    status: ['DRAFT', Validators.required]
  })

  ngOnInit(): void {
    this.obtenerGeneros();
  }

  campoInvalido(campo: string): boolean {
    const control = this.articleForm.get(campo);
    return control ? control.invalid && control.touched : false;
  }

  onGuardarArticulo(markdown: string): void {
    this.guardarContenidoArticulo(markdown);

    if (this.articleForm.valid) {
      const data = this.articleForm.getRawValue();

      //Mapeamos o llamamos al back
      const request: CreateArticleDto = {
        title: data.title,
        content: data.content,
        genreId: data.genre,
        cardImageKey: data.cardImage,
        description: data.description,
        status: data.status
      };

      this.guardarArticulo(request);
    }
    else {
      this.articleForm.markAllAsTouched();
    }
  }

  guardarContenidoArticulo(markdown: string): void {
    if (!markdown) return;

    this.articleForm.patchValue({
      content: markdown
    });
  }

  obtenerGeneros() {
    this.genreService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
      },
      error: (error) => {
        this.notificationService.showError('Error al obtener los géneros');
      }
    });
  }

  guardarArticulo(request: CreateArticleDto): void {
    this.articleService.createArticle(request).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Artículo creado con éxito');
        this.limpiarFormulario();
      }
    });
  }

  guardarImagenEvento(input: HTMLInputElement): void {
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    this.storageService.store(file).subscribe({
      next: (storedObject) => {
        this.articleForm.get('cardImage')?.setValue(storedObject.key);
      }
    });
  }

  limpiarFormulario(input?: HTMLInputElement): void {
    this.articleForm.reset();
    if (input) {
      input.value = '';
    }
  }
}
