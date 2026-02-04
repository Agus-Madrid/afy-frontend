import { AfterViewInit, Component, effect, ElementRef, input, output, viewChild } from '@angular/core';
import Editor from '@toast-ui/editor';

@Component({
  selector: 'app-editor',
  standalone: true,
  template: `
    <div #editorContainer></div> 
    
    <button (click)="guardarArticulo()" style="margin-top: 10px;" class="btn btn-primary">
      Guardar Artículo
    </button>
  `
})
export class EditorComponent implements AfterViewInit{

  constructor() {
    //Effect para actualizar avalor de article content para editar artículos
    effect(() => {
      if (this.editor && this.articleContent() !== undefined) {
        this.editor.setMarkdown(this.articleContent() || '');
      }
    });
  }

  editorContainer = viewChild.required<ElementRef>('editorContainer');

  articleContent = input<string | undefined>('');
  contenidoGuardado = output<string>();

  editor!: Editor;

  ngAfterViewInit() {
    this.editor = new Editor({
      el: this.editorContainer().nativeElement,
      height: '500px',
      initialEditType: 'wysiwyg', //Facilidad para el usuario a la hora de escribir un articulo
      previewStyle: 'vertical',
      initialValue: this.articleContent() || 'Escribe tu artículo aquí...',
    });
  }

  guardarArticulo() {
    const markdown = this.editor.getMarkdown();
    this.contenidoGuardado.emit(markdown);
  }
}