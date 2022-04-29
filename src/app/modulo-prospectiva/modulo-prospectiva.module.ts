import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloProspectivaRoutingModule } from './modulo-prospectiva-routing.module';
import { configServiciosWebPros} from './ConfigService/configServiciosWeb';
//Import de librerias prime ng
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import {CheckboxModule} from 'primeng/checkbox';
import {FileUploadModule} from 'primeng/fileupload';
import {CalendarModule} from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';

//Import de paginas
import { ProspectivaComponent } from './Paginas/prospectiva/prospectiva.component';
import { ConfigprospectivaComponent } from './Paginas/configprospectiva/configprospectiva.component';
import { GenerarProspectivaComponent } from './Paginas/generar-prospectiva/generar-prospectiva.component';
import { SeleccionrAccionComponent } from './Paginas/seleccionar-accion/seleccionar-accion.component';
import { EvaluarAccionComponent } from './Paginas/evaluar-accion/evaluar-accion.component';
import { ResultadoAccionesComponent } from './Paginas/resultado-acciones/resultado-acciones.component';
import { ArbolComponent } from './Paginas/arbol/arbol.component';
import { EjesComponent } from './Paginas/ejes/ejes.component';


@NgModule({
  declarations: [ProspectivaComponent, ConfigprospectivaComponent, GenerarProspectivaComponent, SeleccionrAccionComponent, EvaluarAccionComponent, ResultadoAccionesComponent, ArbolComponent, EjesComponent],
  imports: [
    CommonModule,
    ModuloProspectivaRoutingModule,
    FormsModule,
    DropdownModule,
    BreadcrumbModule,
    ButtonModule,
    TableModule,
    ProgressBarModule,
    HttpClientModule,
    ToolbarModule,
    ConfirmDialogModule,
    DialogModule,
    SidebarModule,
    ToastModule,
    TabViewModule,
    CheckboxModule,
    FileUploadModule,
    CalendarModule,
    RadioButtonModule
  ],
  providers:[configServiciosWebPros]
})
export class ModuloProspectivaModule { }
