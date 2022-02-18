import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DependenciasComponent } from './Paginas/dependencias/dependencias.component';
import { UsuariosComponent } from './Paginas/usuarios/usuarios.component';
import { RolpersonaComponent } from './Paginas/rolpersona/rolpersona.component';
import { OpcionesComponent } from './Paginas/opciones/opciones.component';
import { ValidateUserGuard } from '../Herramientas/Validacion/validate-user.guard';

const routes: Routes = [
  {
    path: 'usuario',
    component: UsuariosComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:2} 
  },
  {
    path:'dependencia',
    component:DependenciasComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:3} 
  },
  {
    path:'rolpersona',
    component:RolpersonaComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:5}
  },
  {
    path:'opciones',
    component:OpcionesComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:4}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloSeguridadRoutingModule { }
