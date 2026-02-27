import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AdminAmUiComponent } from '../../ui/admin-am-ui/admin-am-ui.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenreService } from 'src/app/features/articles/services/genre.service';
import { GenreDto } from 'src/app/features/articles/models/genre.model';
import { CreateArticleDto } from 'src/app/features/articles/models/create-article.model';
import { ArticleService } from 'src/app/features/articles/services/article.service';
import { StorageService } from 'src/app/features/articles/services/storage.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ArticleDto } from 'src/app/features/articles/models/article.model';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-am-container',
  standalone: true,
  imports: [AdminAmUiComponent],
  templateUrl: './admin-am-container.component.html',
  styleUrls: [`./admin-am-container.component.css`],
})
export class AdminAmContainerComponent implements OnInit {

  protected genres: GenreDto[] = [];
  protected cardImagePreviewUrl: string | null = null;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly genreService = inject(GenreService);
  private readonly articleService = inject(ArticleService);
  private readonly storageService = inject(StorageService);
  private readonly notificationService = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly location = inject(Location);

  protected article: ArticleDto | null = null;

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
    this.obtenerArticuloPorUrl();
    //Se carga el formulario si viene un artículo, por eso se llama en obtenerArticuloPorUrl
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
    this.notificationService.disableInterceptorMessages();
    this.genreService.getGenres().pipe(finalize(() => this.notificationService.enableInterceptorMessages())).subscribe({
      next: (genres) => {
        this.genres = genres;
      },
      error: () => {
        this.notificationService.showError('Error al obtener los géneros');
      }
    });
  }

  obtenerArticuloPorUrl() {
    const articleId = this.activatedRoute.snapshot.paramMap.get('id');
    const articleIdNum = articleId ? Number.parseInt(articleId, 10) : null;

    if (articleIdNum) {
      this.articleService.getArticleById(articleIdNum).subscribe({
        next: (article) => {
          this.article = article;
          this.cargarFormulario();
        }
      });
    }
  }

  guardarArticulo(request: CreateArticleDto): void {
    if (this.article) {
      this.modificacionArticulo(request);
    }
    else {
      this.altaArticulo(request);
    }
  }

  modificacionArticulo(request: CreateArticleDto): void {
    if (!this.article) return;

    this.articleService.updateArticle(this.article.id!, request).subscribe({
      next: () => {
        this.notificationService.showSuccess('Artículo modificado con éxito');
      }
    });
  }

  altaArticulo(request: CreateArticleDto): void {
    this.articleService.createArticle(request).subscribe({
      next: () => {
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
        this.cardImagePreviewUrl = storedObject.url;
      },
      error: () => {
        this.articleForm.get('cardImage')?.setValue(null);
        this.cardImagePreviewUrl = null;
        this.notificationService.showError('Error al subir la imagen');
      }
    });
  }

  cargarFormulario(): void {
    if (!this.article) return;

    this.articleForm.patchValue({
      title: this.article.title,
      genre: this.article.genre?.id,
      content: this.article.content,
      cardImage: this.article.cardImageKey,
      description: this.article.description,
      status: this.article.status
    });
    this.cardImagePreviewUrl = this.article.cardImageUrl ?? null;

  }

  limpiarFormulario(): void {
    this.articleForm.reset();
    this.cardImagePreviewUrl = null;
  }

  limpiarFileSelected(input: HTMLInputElement): void {
    input.value = '';
  }

  navigateBack(): void {
    this.location.back();
  }
}


