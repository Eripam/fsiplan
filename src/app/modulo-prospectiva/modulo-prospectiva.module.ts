import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloProspectivaRoutingModule } from './modulo-prospectiva-routing.module';
//Import de librerias prime ng
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { HttpClientModule } from '@angular/common/http/';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import {CheckboxModule} from 'primeng/checkbox';
import {FileUploadModule} from 'primeng/fileupload';
import {CalendarModule} from 'primeng/calendar';

//Import de paginas
import { ProspectivaComponent } from './Paginas/prospectiva/prospectiva.component';


@NgModule({
  declarations: [ProspectivaComponent],
  imports: [
    CommonModule,
    ModuloProspectivaRoutingModule,
    // FormsModule,
    // DropdownModule,
    // BreadcrumbModule,
    // ButtonModule,
    // TableModule,
    // ProgressBarModule,
    HttpClientModule,
    // ToolbarModule,
    // ConfirmDialogModule,
    // DialogModule,
    // SidebarModule,
    // ToastModule,
    // TabViewModule,
    // CheckboxModule,
    // FileUploadModule,
    // CalendarModule
  ],
  // providers:[BreadcrumbModule]
  //exports:[UsuariosComponent]
})
export class ModuloProspectivaModule { }
