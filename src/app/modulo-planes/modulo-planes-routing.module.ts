import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateUserGuard } from '../Herramientas/Validacion/validate-user.guard';
import { PlanesComponent } from './paginas/planes/planes.component';

const routes: Routes = [
  {
    path: 'plan/:opc/:enc',
    component: PlanesComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:22} 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloPlanesRoutingModule { }
