import { Component, Input, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showMenuToggle = true;
  ngOnInit() { this.updateShowToggle(); }
  @HostListener('window:resize') updateShowToggle() { this.showMenuToggle = window.innerWidth < 769; }
  @Input() menuAbierto = false;
  @Output() menuToggle = new EventEmitter<void>();
  // Local state so header works even when parent doesn't bind menuAbierto
  localMenuOpen = false;

  toggleMenu() {
    this.localMenuOpen = !this.localMenuOpen;
    // Emit so parent can react if it's listening
    this.menuToggle.emit();
  }
}
