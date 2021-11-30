import { Component, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { CompletoComponent } from '../templates/Administrador/full/full.component';
import { HeaderComponent } from '../templates/Administrador/header/header.component';
import { FooterComponent}from '../templates/Administrador/footer/footer.component';
import { PgInicialComponent} from '../templates/pg-inicial/pg-inicial.component';
import { UsuariosComponent} from '../ModuloSeguridad/usuarios/usuarios.component';

import { from } from 'rxjs';
const appRoutes: Routes = [
  {
    path: '',
    component: PgInicialComponent
  },
  {
    path: 'Template',
    component: CompletoComponent,
    children: [
      {
     path:'usuario',
     component: UsuariosComponent
      }
    ]   
  }
];

export const routingPermisos = RouterModule.forRoot(appRoutes);
