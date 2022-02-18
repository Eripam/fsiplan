import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { listaI } from '../../Interface/seguridad';
import { SwProspectivaService } from '../../ServiciosWeb/Prospectiva/swProspectiva.service';

@Component({
  selector: 'app-prospectiva',
  templateUrl: './prospectiva.component.html',
  styleUrls: ['./prospectiva.component.scss']
})
export class ProspectivaComponent implements OnInit {

  //Menú del home
  items: MenuItem[] = [{ label: 'Gestión de Prospectiva' }];
  home!: MenuItem;
  //Variable para los estados de usuario
  statuses!: any[];
  //Lista prospectiva
  listaProspectivas: any[]=[];
  sesionDep:string='';
  
  //Variable para mostrar el loading en la tabla
  loading: boolean = true;
  constructor(private sesiones:SesionUsuario, private swProspectiva: SwProspectivaService) { }

  async ngOnInit(){
    const datosS=await this.sesiones.obtenerDatosLogin();
    this.sesionDep=datosS.dep_nombre;
    //Listar prosepctivas
    // this.listarProspectivas();
    //Menu superio con enlace del home
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    //Ingreso de los tipos que tiene el estado de usuario
    this.statuses = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 0 },
    ];
  }

  // async listarProspectivas(){
  //   const datos:listaI = await new Promise<listaI>((resolve) =>  this.swProspectiva.ListarProspectiva().subscribe((translated) => { resolve(translated); }));
  //   if(datos.success){
  //     this.listaProspectivas = datos.data;
  //   }else{
  //     this.listaProspectivas =[];
  //   }
  //   this.loading = false;
  // }

  openNew(){

  }

  modificarTipoDep(pros:any){

  }

}
