import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloSeguridadRoutingModule } from './modulo-seguridad-routing.module';
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
import { AlifeFileToBase64Module } from 'alife-file-to-base64';

//Import de paginas
import { UsuariosComponent } from './Paginas/usuarios/usuarios.component';
import { DependenciasComponent } from './Paginas/dependencias/dependencias.component';
import { RolpersonaComponent } from './Paginas/rolpersona/rolpersona.component';
import { OpcionesComponent } from './Paginas/opciones/opciones.component';
import { UsuarioRolComponent } from './Paginas/usuario-rol/usuario-rol.component';


@NgModule({
  declarations: [UsuariosComponent, DependenciasComponent, RolpersonaComponent, OpcionesComponent, UsuarioRolComponent],
  imports: [
    CommonModule,
    ModuloSeguridadRoutingModule,
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
    AlifeFileToBase64Module
  ],
  exports:[UsuariosComponent]
})
export class ModuloSeguridadModule { }
