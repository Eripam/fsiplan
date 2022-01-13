import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  HostListener,
} from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  @Output() onShowMenuHeader: EventEmitter<boolean> = new EventEmitter<boolean>();
 
  items!: MenuItem[];
  isShowMenuHeader: boolean = true;
  states = [
    { valor: 1, muestraValor: 'Administrador' },
    { valor: 2, muestraValor: 'Director Unidad DTIC' },
    { valor: 3, muestraValor: 'Decano FADE' },
    { valor: 4, muestraValor: 'Planificador FC' },
  ];

  mostrarMenu() {
    this.onShowMenuHeader.emit(!this.isShowMenuHeader);
  }

  seleccionada = this.states[1].valor;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        items: [
          { label: 'Erika Pamela Arévalo Cuadrado' },
          {
            label: 'Cerrar Sesión',
            icon: 'fas fa-power-off',
            routerLink: '/',
          },
        ],
      },
    ];
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
