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
//Import de paginas
import { UsuariosComponent } from './Paginas/usuarios/usuarios.component';
import { DependenciasComponent } from './Paginas/dependencias/dependencias.component';
import { RolpersonaComponent } from './Paginas/rolpersona/rolpersona.component';


@NgModule({
  declarations: [UsuariosComponent, DependenciasComponent, RolpersonaComponent],
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
    TabViewModule
  ],
  exports:[UsuariosComponent]
})
export class ModuloSeguridadModule { }
