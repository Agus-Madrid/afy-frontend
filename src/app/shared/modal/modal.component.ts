import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements AfterViewInit, OnInit {
  @ViewChild('modal') modalElement!: ElementRef;

  modalService = inject(ModalService);

  title = '';
  message = ''

  private modalInstance: Modal | null = null;

  ngAfterViewInit() {
    this.modalInstance = new Modal(this.modalElement.nativeElement, {
      backdrop: 'static',
      keyboard: false
    });
  }

  ngOnInit() {
    this.modalService.show$.subscribe(show => {
      if (show) {
        this.title = show.title;
        this.message = show.message;
        this.modalInstance?.show();
      } else {
        this.modalInstance?.hide();
      }
    });
  }

  confirm(confirmed: boolean): void {
    this.modalInstance?.hide();
    this.modalService.close(confirmed);
  }

}
