import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateUserGuard } from '../Herramientas/Validacion/validate-user.guard';
import { PlanesComponent } from './paginas/planes/planes.component';
import { EstructuraComponent } from './paginas/estructura/estructura.component';
import { EstructuraPlanComponent } from './paginas/estructura-plan/estructura-plan.component';

const routes: Routes = [
  {
    path: 'plan/:opc/:enc',
    component: PlanesComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:22} 
  },
  {
    path: 'estructura/:opc/:plan/:enc',
    component: EstructuraComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:23} 
  },
  {
    path: 'generarp/:opc/:enc',
    component: EstructuraPlanComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:24} 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloPlanesRoutingModule { }
