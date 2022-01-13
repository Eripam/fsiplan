import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './full/full.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      // Rutasde los macro modulos
      {
        path: 'seguridad',
        loadChildren: () =>
          import('./../modulo-seguridad/modulo-seguridad.module').then(
            (m) => m.ModuloSeguridadModule
          ),
      },
      {
        path: 'reportes',
        loadChildren: () =>
          import('./../modulo-seguridad/modulo-seguridad.module').then(
            (m) => m.ModuloSeguridadModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuloTemplatesRoutingModule {}
