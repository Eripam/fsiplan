import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any>= new EventEmitter();

  operaciones = [
    {valor:1, muestraValor:'Administrador'},
    {valor:2, muestraValor:'Director Unidad DTIC'},
    {valor:3, muestraValor:'Decano FADE'},
    {valor:4, muestraValor:'Planificador FC'}
  ];

  seleccionada = this.operaciones[1].valor;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.toggleSidebarForMe.emit();
  }
}
