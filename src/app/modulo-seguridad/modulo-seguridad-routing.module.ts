import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DependenciasComponent } from './Paginas/dependencias/dependencias.component';
import { UsuariosComponent } from './Paginas/usuarios/usuarios.component';
import { RolpersonaComponent } from './Paginas/rolpersona/rolpersona.component';
import { OpcionesComponent } from './Paginas/opciones/opciones.component';

const routes: Routes = [
  {
    path: 'usuario',
    component: UsuariosComponent
  },
  {
    path:'dependencia',
    component:DependenciasComponent
  },
  {
    path:'rolpersona',
    component:RolpersonaComponent
  },
  {
    path:'opciones',
    component:OpcionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloSeguridadRoutingModule { }
