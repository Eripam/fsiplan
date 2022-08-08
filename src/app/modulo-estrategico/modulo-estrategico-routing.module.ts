import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateUserGuard } from '../Herramientas/Validacion/validate-user.guard';
import { CronogramaComponent } from './Paginas/cronograma/cronograma.component';
import { EstructuraPlanComponent } from './Paginas/estructura-plan/estructura-plan.component';
import { EstructuraComponent } from './Paginas/estructura/estructura.component';
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
    path: 'mapa/:opc/:plan/:enc',
    component: MapaEstrategicoComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:18} 
  },
  {
    path: 'cronograma/:opc/:plan/:enc',
    component: CronogramaComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:19} 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloEstrategicoRoutingModule { }
