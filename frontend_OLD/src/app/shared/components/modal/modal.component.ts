import { Component } from '@angular/core';
import { ModalConfig, ModalService } from '../../../core/services/modal.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  config: ModalConfig | null = null;

  constructor(private modalService: ModalService) {
    // Escucha los cambios de estado del servicio
    this.modalService.modalState$.subscribe(cfg => this.config = cfg);
  }

  close() {
    this.modalService.close();
  }

  accept() {
    if (this.config?.onAccept) {
      this.config.onAccept(); // 👉 Ejecuta la función de Aceptar
    }
    this.close();
  }

  cancel() {
    if (this.config?.onCancel) {
      this.config.onCancel(); // 👉 Ejecuta la función de Cancelar (si la hay)
    }
    this.close();
  }
}
