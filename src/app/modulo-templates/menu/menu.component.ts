import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() mostrarMenu!: boolean;
  @Output() showMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  cerrarM() {
    this.mostrarMenu = !this.mostrarMenu;
    this.showMenu.emit(this.mostrarMenu);
  }

  constructor() {}

  items = [{
        label: "Seguridad",
        icon: 'fas fa-user-lock',
        submenu: [
          {
            label: 'Usuario - Roles',
            router: '/seguridad/usuario',
          },
          {
            label: 'Tipo y Dependencias',
            router: '/seguridad/dependencia',
          },
          {
            label: 'Opciones',
            router: '/seguridad/opciones',
          },
          {
            label: 'Asignación de Roles y Permisos',
            router: '/seguridad/rolpersona',
          },
        ],
      },
    {
      label: "Prueba 2",
      icon: 'fas fa-tachometer-alt',
      submenu: [
        {
          label: 'Usuario',
          router: '/seguridad/roles',
        }
      ],
    }];

  ngOnInit() {
    this.mostrarMenu = true;
  }

  expandedIndex = 0;
}
