import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SliderComponent } from '../../shared/slider/slider.component';
import { ServiceCardComponent } from '../../shared/service-card/service-card.component';
import { ProcessCardComponent } from '../../shared/process-card/process-card.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule, SliderComponent, ServiceCardComponent, ProcessCardComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  slides = [
    { title: 'Soluciones a medida', subtitle: 'Transformamos ideas en productos', img: 'assets/slide-1.svg' },
    { title: 'Consultoría especializada', subtitle: 'Estrategia y ejecución', img: 'assets/slide-2.svg' },
    { title: 'Soporte profesional', subtitle: 'Disponibilidad y confianza', img: 'assets/slide-3.svg' }
  ];
}
