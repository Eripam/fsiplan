import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloEstrategicoRoutingModule } from './modulo-estrategico-routing.module';
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
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { ImageModule } from 'primeng/image';
import {AccordionModule} from 'primeng/accordion';
import {SkeletonModule} from 'primeng/skeleton';
import {RippleModule} from 'primeng/ripple';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CardModule} from 'primeng/card';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {ChartModule} from 'primeng/chart';
import {InputNumberModule} from 'primeng/inputnumber';
import {PanelModule} from 'primeng/panel';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TreeTableModule} from 'primeng/treetable';
import {SelectButtonModule} from 'primeng/selectbutton';

//Paginas
import { PlanComponent } from './Paginas/plan/plan.component';
import { EstructuraComponent } from './Paginas/estructura/estructura.component';
import { configServiciosWebEst } from './ConfigService/configServiciosWeb';
import { EstructuraPlanComponent } from './Paginas/estructura-plan/estructura-plan.component';
import { MapaEstrategicoComponent } from './Paginas/mapa-estrategico/mapa-estrategico.component';
import { CronogramaComponent } from './Paginas/cronograma/cronograma.component';
import { ConfiguracionComponent } from './Paginas/configuracion/configuracion.component';
import { PlanNacionalComponent } from './Paginas/plan-nacional/plan-nacional.component';
import { FechasComponent } from './Paginas/Evaluacion/fechas/fechas.component';


@NgModule({
  declarations: [
    PlanComponent,
    EstructuraComponent,
    EstructuraPlanComponent,
    MapaEstrategicoComponent,
    CronogramaComponent,
    ConfiguracionComponent,
    PlanNacionalComponent,
    FechasComponent
  ],
  imports: [
    CommonModule,
    ModuloEstrategicoRoutingModule,
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
    RadioButtonModule,
    MultiSelectModule,
    PaginatorModule,
    ImageModule,
    AccordionModule,
    SkeletonModule,
    RippleModule,
    InputSwitchModule,
    CardModule,
    OrganizationChartModule,
    ChartModule,
    InputNumberModule,
    PanelModule,
    ScrollPanelModule,
    TreeTableModule,
    SelectButtonModule
  ],
  providers:[configServiciosWebEst]
})
export class ModuloEstrategicoModule { }
