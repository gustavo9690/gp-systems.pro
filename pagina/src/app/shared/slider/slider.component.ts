import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// Slide shape used by the template — include optional img for background images
export interface Slide { title: string; subtitle?: string; img?: string }

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnDestroy {
  // slide shape used by the template — declared at module scope
  @Input() slides: Slide[] = [];
  @Input() interval = 5000;
  current = 0;
  intervalId?: any;
  animate = true;

  constructor() { this.start(); }

  start() {
    this.stop();
    if (!this.slides || this.slides.length === 0) return;
    this.intervalId = setInterval(() => this.next(), this.interval);
  }
  stop() { if (this.intervalId) { clearInterval(this.intervalId); this.intervalId = undefined; } }
  next() { if (!this.slides || this.slides.length === 0) return; this.current = (this.current + 1) % this.slides.length; }
  prev() { if (!this.slides || this.slides.length === 0) return; this.current = (this.current - 1 + this.slides.length) % this.slides.length; }
  goTo(i: number) { this.current = i; }
  ngOnDestroy(): void { this.stop(); }
}
