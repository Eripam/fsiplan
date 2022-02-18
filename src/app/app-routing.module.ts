import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorAccesoComponent } from './Herramientas/PaginasError/error-acceso/error-acceso.component';

const routes: Routes = [
  {
  //Página inicial
  path: '',
  loadChildren:()=>import ('./modulo-inicio/modulo-inicio.module').then((m)=>m.ModuloInicioModule)
 },
 {
  path: '/templa',
  loadChildren:()=>import ('./modulo-templates/modulo-templates.module').then((m)=>m.ModuloTemplatesModule)
 },
 {
   path:'error',
   component: ErrorAccesoComponent
 }
// {
//   path:'Template',
//   component:FullComponent,
//   children:[
//     {
//       path:'usuario',
//       component:UsuariosComponent
//     }
//   ]
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
