import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  //Página inicial
  path: '',
  loadChildren:()=>import ('./modulo-templates/modulo-templates.module').then((m)=>m.ModuloTemplatesModule)
  //component:FullComponent
},
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
