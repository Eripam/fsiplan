import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { swRolpersonaService } from 'src/app/modulo-seguridad/ServiciosWeb/RolPersona/swRolpersona.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() mostrarMenu!: boolean;
  @Output() showMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  cerrarM() {
    this.mostrarMenu = !this.mostrarMenu;
    this.showMenu.emit(this.mostrarMenu);
  }

  items:any[]=[];
  constructor(private session: SesionUsuario, private swRolpersona: swRolpersonaService) {}

  /*items = [{
        label: "Seguridad",
        icon: 'fas fa-user-lock',
        submenu: [
          {
            label: 'Usuario - Roles',
            router: '/seguridad/usuario',
          },
          {
            label: 'Tipo y Dependencias',
            router: '/seguridad/dependencia',
          },
          {
            label: 'Opciones',
            router: '/seguridad/opciones',
          },
          {
            label: 'Asignación de Roles y Permisos',
            router: '/seguridad/rolpersona',
          },
        ],
      },
    {
      label: "Prueba 2",
      icon: 'fas fa-tachometer-alt',
      submenu: [
        {
          label: 'Usuario',
          router: '/seguridad/roles',
        }
      ],
    }];*/

  ngOnInit() {
    this.mostrarMenu = true;
    this.listarMenu();
  }

  async listarMenu(){
    const datosS=await this.session.obtenerDatosLogin();
    const valor={
      rol:datosS.rpe_rol
    }
    const datos = await new Promise<any>((resolve)=>this.swRolpersona.ListarOpcionRol(valor).subscribe(translated=>{resolve(translated)}));
    if(datos.success){
      this.items=datos.data;
    }else{
      this.items=[];
    }
  }

  expandedIndex = 0;
}
