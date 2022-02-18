import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../ModuloCas/login/login.component';
import { InicialComponent } from './Paginas/inicial/inicial.component';

const routes: Routes = [{
  path: '',
  component: InicialComponent
  },
  {
    path: 'cas',
    component: LoginComponent
  },];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})

export class ModuloInicioRoutingModule { }
