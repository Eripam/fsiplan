import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DependenciasComponent } from './Paginas/dependencias/dependencias.component';
import { UsuariosComponent } from './Paginas/usuarios/usuarios.component';
import { RolpersonaComponent } from './Paginas/rolpersona/rolpersona.component';
import { OpcionesComponent } from './Paginas/opciones/opciones.component';
import { ValidateUserGuard } from '../Herramientas/Validacion/validate-user.guard';
import { UsuarioRolComponent } from './Paginas/usuario-rol/usuario-rol.component';

const routes: Routes = [
  {
    path: 'usuario/:opc/:enc',
    component: UsuariosComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:2} 
  },
  {
    path:'dependencia/:opc/:enc',
    component:DependenciasComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:3} 
  },
  {
    path:'rolpersona/:opc/:enc',
    component:RolpersonaComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:5}
  },
  {
    path:'opciones/:opc/:enc',
    component:OpcionesComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:4}
  },
  {
    path:'usuariorol/:opc/:enc',
    component:UsuarioRolComponent,
    canActivate:[ValidateUserGuard],
    data:{opcion:9}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloSeguridadRoutingModule { }
