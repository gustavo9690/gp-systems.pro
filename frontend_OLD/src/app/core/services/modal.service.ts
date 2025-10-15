import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/** Configuración que podremos pasar al abrir el modal */
export interface ModalConfig {
  title?: string;            // Título del modal
  message?: string;          // Mensaje principal
  showAccept?: boolean;      // Mostrar botón Aceptar
  showCancel?: boolean;      // Mostrar botón Cancelar
  onAccept?: () => void;     // Función a ejecutar al Aceptar
  onCancel?: () => void;     // Función a ejecutar al Cancelar
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  // Subject para emitir el estado y configuración del modal
  private modalState = new Subject<ModalConfig | null>();

  // Observable para que el componente Modal escuche los cambios
  modalState$ = this.modalState.asObservable();

  /** Abrir modal con la configuración deseada */
  open(config: ModalConfig) {
    this.modalState.next(config);
  }

  /** Cerrar modal (lo deja en null) */
  close() {
    this.modalState.next(null);
  }
}
