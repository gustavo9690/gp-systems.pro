import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

interface MenuItem {
	icon: string;
	label: string;
	route?: string;
	children?: MenuItem[];
	expanded?: boolean;
}

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule, MatIconModule, RouterModule],
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
	@Input() isOpen = true;

	menuItems: MenuItem[] = [
		{ icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
		{
			icon: 'inventory_2',
			label: 'Productos',
			expanded: false,
			children: [
				{ icon: 'list', label: 'Lista de Productos', route: '/productos/lista' },
				{ icon: 'add_box', label: 'Agregar Producto', route: '/productos/nuevo' }
			]
		},
		{
			icon: 'people',
			label: 'Usuarios',
			expanded: false,
			children: [
				{ icon: 'person', label: 'Administradores', route: '/usuarios/admins' },
				{ icon: 'person_outline', label: 'Clientes', route: '/usuarios/clientes' }
			]
		},
		{ icon: 'settings', label: 'Configuración', route: '/config' }
	];

	toggleSubmenu(item: MenuItem): void {
		if (item.children) {
			item.expanded = !item.expanded;
		}
	}
}
