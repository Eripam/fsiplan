import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloInicioRoutingModule } from './modulo-inicio-routing.module';
import { InicialComponent } from './Paginas/inicial/inicial.component';


@NgModule({
  declarations: [
    InicialComponent
  ],
  imports: [
    CommonModule,
    ModuloInicioRoutingModule
  ]
})
export class ModuloInicioModule { }
