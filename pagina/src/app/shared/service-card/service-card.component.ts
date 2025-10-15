import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card">
      <div class="icon">{{ icon }}</div>
      <h4>{{ title }}</h4>
      <p><ng-content></ng-content></p>
    </article>
  `,
  styles: [
    `
    .card { background: #fff; padding: 1.25rem; border-radius: 10px; box-shadow: 0 6px 18px rgba(16,24,40,0.04); text-align:center; }
    .icon { font-size: 2rem; margin-bottom:0.5rem; }
    `
  ]
})
export class ServiceCardComponent {
  @Input() title = '';
  @Input() icon = '';
}
