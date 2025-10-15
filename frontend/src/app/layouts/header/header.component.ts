import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-header',
standalone: true,
imports: [CommonModule, MatIconModule, MatButtonModule],
templateUrl: './header.component.html',
styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	@Output() menuToggle = new EventEmitter<void>();

	emitMenuToggle() {
		this.menuToggle.emit();
	}
}
