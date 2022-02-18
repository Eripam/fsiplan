import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProspectivaComponent} from './Paginas/prospectiva/prospectiva.component';
import { ValidateUserGuard } from '../Herramientas/Validacion/validate-user.guard';

const routes: Routes = [
  {
    path: 'prospectiva',
    component: ProspectivaComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:6} 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloProspectivaRoutingModule { }
