import { Component, OnInit } from '@angular/core';
import { InicioService } from '../../core/services/inicio.service';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  datosInicio: any;

  constructor(private inicioService: InicioService,private modal:ModalService) {}

  abrir() {
    this.modal.open({
      title: 'Confirmar acción',
      message: '¿Estás seguro de continuar?',
      showAccept: true,
      showCancel: true
    });
  }

  ngOnInit(): void {
    this.inicioService.obtenerDatosInicio().subscribe(data => {
        console.log('Datos recibidos:', data); 
        this.datosInicio = data;
    });
  }
}
 