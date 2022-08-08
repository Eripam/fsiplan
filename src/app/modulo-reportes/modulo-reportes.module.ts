import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloReportesRoutingModule } from './modulo-reportes-routing.module';
import { configServiciosWebRep } from './ConfigService/configServiciosWeb';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModuloReportesRoutingModule
  ],
  providers:[configServiciosWebRep]
})
export class ModuloReportesModule { }
