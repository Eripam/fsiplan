import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { listaI, rolpersona, dependencia, Data} from '../../Interface/seguridad';
import { swRolpersonaService} from '../../ServiciosWeb/RolPersona/swRolpersona.service';
import { swDependencia} from '../../ServiciosWeb/Dependencia/swDependencia.service';
import { swRoles} from '../../ServiciosWeb/Roles/swRoles.service';
import { swPersona} from '../../ServiciosWeb/Usuarios/swPersona.service';
import { MensajesGenerales} from '../../../Herramientas/Mensajes/MensajesGenerales.component';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-rolpersona',
  templateUrl: './rolpersona.component.html',
  styleUrls: ['./rolpersona.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RolpersonaComponent implements OnInit {
  //Variable para listar
  listaRolP: rolpersona[] = [];
  listaUsuarios: any[]=[];
  listaDependencias: dependencia[]=[];
  listaRoles: Data[]=[];
  //Menú del home
  items: MenuItem[] = [{ label: 'Gestión de Asignación de roles y permisos' }];
  home!: MenuItem;
  //Variable para los estados de usuario
  statuses!: any[];
  //Variable para mostrar el loading en la tabla
  loading: boolean = true;
  //Variable para abrir y cerrar el modal
  modalRolPer!: boolean;
  modalRolPerM!: boolean;
  //Titulo del modal
  tituloModal: string = '';
  //Declaración de variables para ingreso y modificaicón
  txtUsuario:string='';
  txtDependencia:number=0;
  txtDependenciaM:number=0;
  txtRolM: number=0;
  txtRol:number=0;
  txtEstado: string = '';
  rolpersona: rolpersona={};
  
  constructor(private RolPersonaSer: swRolpersonaService, private swDep: swDependencia, private swRoles: swRoles, private swUsuario: swPersona, private messageService: MessageService ,private mensajesg: MensajesGenerales) {
  }


  ngOnInit(): void {
    this.listarRolPersona();
    //Menu superio con enlace del home
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    //Ingreso de los tipos que tiene el estado de usuario
    this.statuses = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 0 },
    ];
  }

  //Función para listar todos los roles de usuarios ingresados
  async listarRolPersona() {
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.RolPersonaSer.ListaRolesPersona().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaRolP = datos.data;
    }else{
      this.listaRolP =[];
    }
    this.loading = false;
  }

  //Función para listar todos los usuario activos
  async listarUsuarios() {
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swUsuario.ListaUsuariosActivos().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaUsuarios = datos.data;
    }else{
      this.listaUsuarios =[];
    }
    this.loading = false;
  }

  //Función para listar todos los usuario activos
  async listarDependencias() {
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swDep.ListaDependenciaAc().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaDependencias = datos.data;
    }else{
      this.listaDependencias =[];
    }
    this.loading = false;
  }

  //Función para listar todos los usuario activos
  async listarRoles() {
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swRoles.ListaRolesActivos().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaRoles = datos.data;
    }else{
      this.listaRoles =[];
    }
    this.loading = false;
  }

  openNew(){
    this.txtDependencia=0;
    this.txtRol=0;
    this.txtUsuario="";
    this.tituloModal="Asignar Rol";
    this.listarUsuarios();
    this.listarDependencias();
    this.listarRoles();
    this.modalRolPer=true;
  }

  modificarRolPersona(rolper: any){
    this.tituloModal="Modificar Asignación de Rol";
    this.listarUsuarios();
    this.listarDependencias();
    this.listarRoles();
    this.txtDependencia=rolper.rpe_dependencia;
    this.txtDependenciaM=rolper.rpe_dependencia;
    this.txtUsuario=rolper.rpe_persona;
    this.txtRol=rolper.rpe_rol;
    this.txtRolM=rolper.rpe_rol;
    this.txtEstado=rolper.rpe_estado;
    this.modalRolPerM=true;
  }

  hideDialog(){
    this.modalRolPer=false;
  }

  hideDialogM(){
    this.modalRolPerM=false;
  }

  async guardarRolPersona(){
    this.rolpersona={
      rpe_persona:this.txtUsuario,
      rpe_rol:this.txtRol,
      rpe_dependencia: this.txtDependencia
    };

    if (this.txtUsuario == '' || this.txtDependencia == 0 || this.txtRol== 0) {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    } else {
      const datos = await new Promise<any>((resolve) =>
         this.RolPersonaSer.IngresarRolPersona(this.rolpersona).subscribe((translated) => {
          resolve(translated);
        })
      );

      if (datos.success) {
        this.modalRolPer = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Asignación de usuario ' + this.mensajesg.IngresadoCorrectamente});
        this.listarRolPersona();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
      }
    }
  }

  async guardarRolPersonaM(){
    this.rolpersona={
      rpe_dependencia: this.txtDependencia,
      rpe_dependencia_m: this.txtDependenciaM,
      rpe_persona:this.txtUsuario,
      rpe_rol:this.txtRol,
      rpe_rol_m:this.txtRolM,
      rpe_estado:parseInt(this.txtEstado)
    }
  
    if (this.txtDependencia == 0 || this.txtRol == 0 || this.txtUsuario == '') {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    }  else {
      const datos = await new Promise<any>((resolve) =>
        this.RolPersonaSer.ModificarUsuario(this.rolpersona).subscribe((translated) => {
          resolve(translated);
        })
      );
  
      if (datos.success) {
        this.modalRolPerM = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Asignar Rol a persona ' + this.mensajesg.ModificadoCorrectamente});
        this.listarRolPersona();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
      }
    }
  }
}
