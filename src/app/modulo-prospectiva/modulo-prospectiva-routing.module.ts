import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProspectivaComponent} from './Paginas/prospectiva/prospectiva.component';
import { ValidateUserGuard } from '../Herramientas/Validacion/validate-user.guard';
import { ConfigprospectivaComponent } from './Paginas/configprospectiva/configprospectiva.component';
import { GenerarProspectivaComponent } from './Paginas/generar-prospectiva/generar-prospectiva.component';
import { SeleccionrAccionComponent } from './Paginas/seleccionar-accion/seleccionar-accion.component';

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
    path: 'selaccion/:opc/:enc',
    component: SeleccionrAccionComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:10} 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloProspectivaRoutingModule { }
