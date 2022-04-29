import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProspectivaComponent} from './Paginas/prospectiva/prospectiva.component';
import { ValidateUserGuard } from '../Herramientas/Validacion/validate-user.guard';
import { ConfigprospectivaComponent } from './Paginas/configprospectiva/configprospectiva.component';
import { GenerarProspectivaComponent } from './Paginas/generar-prospectiva/generar-prospectiva.component';
import { SeleccionrAccionComponent } from './Paginas/seleccionar-accion/seleccionar-accion.component';
import { EvaluarAccionComponent } from './Paginas/evaluar-accion/evaluar-accion.component';
import { ResultadoAccionesComponent } from './Paginas/resultado-acciones/resultado-acciones.component';
import { ArbolComponent } from './Paginas/arbol/arbol.component';
import { EjesComponent } from './Paginas/ejes/ejes.component';

const routes: Routes = [
  {
    path: 'prospectiva/:opc/:enc',
    component: ProspectivaComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:6} 
  },
  {
    path: 'configpros/:opc/:pros/:enc',
    component: ConfigprospectivaComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:7} 
  },
  {
    path: 'generar/:opc/:enc',
    component: GenerarProspectivaComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:8} 
  },
  {
    path: 'seleccion/:opc/:enc',
    component: SeleccionrAccionComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:10} 
  },
  {
    path:'evaluaccion/:opc/:enc',
    component:EvaluarAccionComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:11}
  },
  {
    path:'resultado/:opc/:enc',
    component:ResultadoAccionesComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:12}
  },
  {
    path:'arbol/:opc/:enc',
    component:ArbolComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:13}
  },
  {
    path:'ejes/:opc/:enc',
    component:EjesComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:14}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloProspectivaRoutingModule { }
