import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateUserGuard } from '../Herramientas/Validacion/validate-user.guard';
import { ConfiguracionComponent } from './Paginas/configuracion/configuracion.component';
import { CronogramaComponent } from './Paginas/cronograma/cronograma.component';
import { EstructuraPlanComponent } from './Paginas/estructura-plan/estructura-plan.component';
import { EstructuraComponent } from './Paginas/estructura/estructura.component';
import { FechasComponent } from './Paginas/Evaluacion/fechas/fechas.component';
import { MapaEstrategicoComponent } from './Paginas/mapa-estrategico/mapa-estrategico.component';
import { PlanComponent } from './Paginas/plan/plan.component';

const routes: Routes = [
  {
    path: 'plan/:opc/:enc',
    component: PlanComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:15} 
  },
  {
    path: 'estructura/:opc/:plan/:enc',
    component: EstructuraComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:16} 
  },
  {
    path: 'estructurap/:opc/:enc',
    component: EstructuraPlanComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:17} 
  },
  {
    path: 'cronograma/:opc/:plan/:enc',
    component: CronogramaComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:18} 
  },
  {
    path: 'mapa/:opc/:plan/:enc',
    component: MapaEstrategicoComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:19} 
  },
  {
    path: 'configuracion/:opc/:plan/:enc',
    component: ConfiguracionComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:20} 
  },
  {
    path: 'fechas/:opc/:enc',
    component: FechasComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:21} 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloEstrategicoRoutingModule { }
