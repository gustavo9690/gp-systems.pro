import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-process-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="process-card">
      <div class="step">{{ step }}</div>
      <div class="label"><ng-content></ng-content></div>
    </article>
  `,
  styles: [
    `
    .process-card { background: #fff; padding: 1rem; border-radius: 8px; box-shadow: 0 6px 18px rgba(16,24,40,0.04); text-align:center; font-weight:600; }
    .step { font-size: 1.25rem; margin-bottom:0.5rem; color:#0b3d91; }
    `
  ]
})
export class ProcessCardComponent { @Input() step = ''; }
