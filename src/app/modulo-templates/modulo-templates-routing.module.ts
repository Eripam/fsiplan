import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './full/full.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      // Rutas de los macro modulos
      {
        path: 'seguridad',
        loadChildren: () =>
          import('../modulo-seguridad/modulo-seguridad.module').then(
            (m) => m.ModuloSeguridadModule
          ),
      },
      {
        path:'prospectiva',
        loadChildren:()=>
          import('../modulo-prospectiva/modulo-prospectiva.module').then(
            (m)=>m.ModuloProspectivaModule
          )
      },
      {
        path:'estrategico',
        loadChildren:()=>
          import('../modulo-estrategico/modulo-estrategico.module').then(
            (m)=>m.ModuloEstrategicoModule
          )
      },
      {
        path:'planes',
        loadChildren:()=>
          import('../modulo-planes/modulo-planes.module').then(
            (m)=>m.ModuloPlanesModule
          )
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuloTemplatesRoutingModule {}
