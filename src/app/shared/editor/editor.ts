import { AfterViewInit, Component, ElementRef, output, viewChild } from '@angular/core';
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
  editorContainer = viewChild.required<ElementRef>('editorContainer');
  contenidoGuardado = output<string>();

  editor!: Editor;

  ngAfterViewInit() {
    this.editor = new Editor({
      el: this.editorContainer().nativeElement,
      height: '500px',
      initialEditType: 'wysiwyg', //Facilidad para el usuario a la hora de escribir un articulo
      previewStyle: 'vertical',
      initialValue: 'Empieza a escribir tu historia aquí...'
    });
  }

  guardarArticulo() {
    const markdown = this.editor.getMarkdown();
    console.log(markdown);
    this.contenidoGuardado.emit(markdown);
  }
}