import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { listaI, tipoDep, dependencia} from '../../Interface/seguridad';
import { swDependencia} from '../../ServiciosWeb/Dependencia/swDependencia.service';
import { MensajesGenerales} from '../../../Herramientas/Mensajes/MensajesGenerales.component';

@Component({
  selector: 'app-dependencias',
  templateUrl: './dependencias.component.html',
  styleUrls: ['./dependencias.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DependenciasComponent implements OnInit {
  //Variable para listar tipo dependencia
  listaTipoDep: tipoDep[] = [];
  listaTipoDA: tipoDep[]=[];
  //Variable para listar dependencia
  listaDep: tipoDep[] = [];
  listaDepAc: tipoDep[]=[];
  //Titulo del modal
  tituloModal: string = '';
  //Menú del home
  items: MenuItem[] = [{ label: 'Gestión de Dependencias y sus tipos' }];
  home!: MenuItem;
  //Variable para los estados de usuario
  statuses!: any[];
  //Variable para mostrar el loading en la tabla
  loading: boolean = true;
  //Variable para abrir y cerrar el modal
  modalTipoDep!: boolean;
  modalTipoDepM!: boolean;
  modalDep!: boolean;
  modalDepM!: boolean;
  //Variables de cada dato de tipo dependencia para ingresar y modificar
  txtCodigo: string = '';
  txtNombre: string = '';
  txtEstado: string = '';
  //Variable de cada dato de dependencia para ingresar y modificar
  txtAlias: string='';
  txtTipo: number = 0;
  txtPertenece: number = 0;
  //Variable de tipo dependencia
  tipoDep: tipoDep={};
  dependencia : dependencia= {};


  constructor(private DependenciaSer: swDependencia, private messageService: MessageService ,private mensajesg: MensajesGenerales) {
  }

  ngOnInit(): void {
    this.listarTipoDependencias();
    this.listarDependencias();
    //Menu superio con enlace del home
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    //Ingreso de los tipos que tiene el estado de usuario
    this.statuses = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 0 },
    ];
  }

  //Función para listar todos los tipos de dependencias ingresados
  async listarTipoDependencias() {
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.DependenciaSer.ListaTipoDependencia().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaTipoDep = datos.data;
    }else{
      this.listaTipoDep =[];
    }
    this.loading = false;
  }

  //Función para listar todos los tipos de dependencias activas
  async listarTipoDependenciasA() {
   const datos:listaI = await new Promise<listaI>((resolve) =>  this.DependenciaSer.ListaTipoDependenciaA().subscribe((translated) => { resolve(translated); }));
   if(datos.success){
      this.listaTipoDA = datos.data;
   }else{
      this.listaTipoDA =[];
   }
    this.loading = false;
  }
    //Función para listar todos los tipos de dependencias ingresados
    async listarDependencias() {
      const datos:listaI = await new Promise<listaI>((resolve) =>  this.DependenciaSer.ListaDependencia().subscribe((translated) => { resolve(translated); }));
      if(datos.success){
        this.listaDep = datos.data;
      }else{
        this.listaDep =[];
      }
      this.loading = false;
    }
  
    //Función para listar todos los tipos de dependencias ingresados
    async listarDependenciasAc() {
      const datos:listaI = await new Promise<listaI>((resolve) =>  this.DependenciaSer.ListaDependenciaAc().subscribe((translated) => { resolve(translated); }));
      if(datos.success){
        this.listaDepAc = datos.data;
      }else{
        this.listaDepAc =[];
      }
      this.loading = false;
    }
  openNew(){
    this.txtNombre='';
    this.txtCodigo='';
    this.tituloModal = 'Ingresar Tipo Dependencia';
    this.modalTipoDep = true;
  }

  openNewD(){
    this.listarTipoDependenciasA();
    this.listarDependenciasAc();
    this.txtNombre='',
    this.txtAlias='',
    this.txtPertenece=0,
    this.txtTipo=0,
    this.txtCodigo='',
    this.tituloModal= 'Ingresar Dependencia';
    this.modalDep=true;
  }

  //Función para guardar el tipo dependencia
  async guardarTipoDep() { 
    this.tipoDep={
      tde_nombre:this.txtNombre
    };

    if (this.txtNombre == '') {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    } else {
      const datos = await new Promise<any>((resolve) =>
         this.DependenciaSer.IngresarTipoDependencia(this.tipoDep).subscribe((translated) => {
          resolve(translated);
        })
      );

      if (datos.success) {
        this.modalTipoDep = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Tipo Dependencia ' + this.mensajesg.IngresadoCorrectamente});
        this.listarTipoDependencias();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }
  }

  //Función para guardar el dependencia
  async guardarDep() { 
    this.dependencia={
      dep_nombre:this.txtNombre,
      dep_alias:this.txtAlias,
      dep_codcodigo: this.txtPertenece,
      dep_tipo: this.txtTipo
    };

    if (this.txtNombre == '' || this.txtAlias == '' || this.txtPertenece== 0 || this.txtTipo==0) {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    } else {
      console.log(this.dependencia);
      const datos = await new Promise<any>((resolve) =>
         this.DependenciaSer.IngresarDependencia(this.dependencia).subscribe((translated) => {
          resolve(translated);
        })
      );

      if (datos.success) {
        this.modalDep = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Dependencia ' + this.mensajesg.IngresadoCorrectamente});
        this.listarDependencias();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }
  }

  modificarTipoDep(tipoDep: any){
    this.tituloModal='Modificar Tipo Dependencia';
    this.txtCodigo=tipoDep.tde_codigo;
    this.txtNombre=tipoDep.tde_nombre;
    this.txtEstado=tipoDep.tde_estado;
    this.modalTipoDepM=true;
  }

  modificarDep(dependencia: any){
    this.listarTipoDependenciasA();
    this.listarDependenciasAc();
    this.tituloModal='Modificar Dependencia';
    this.txtCodigo=dependencia.dep_codigo;
    this.txtNombre=dependencia.dep_nombre;
    this.txtTipo=dependencia.dep_tipo;
    this.txtAlias=dependencia.dep_alias;
    this.txtPertenece=dependencia.dep_codcodigo;
    this.txtEstado=dependencia.dep_estado;
    this.modalDepM=true;
  }

  //Función para guardar datos modificados
  async modificarTipoDepM() {
      this.tipoDep={
        tde_codigo:parseInt(this.txtCodigo),
        tde_nombre:this.txtNombre,
        tde_estado:parseInt(this.txtEstado)
      }
  
      if (this.txtNombre == '' || this.txtCodigo == '') {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
      }  else {
        const datos = await new Promise<any>((resolve) =>
          this.DependenciaSer.ModificarTipoDependencia(this.tipoDep).subscribe((translated) => {
            resolve(translated);
          })
        );
  
        if (datos.success) {
          this.modalTipoDepM = false;
          this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Tipo Dependencia ' + this.mensajesg.ModificadoCorrectamente});
          this.listarTipoDependencias();
          this.listarDependencias();
        } else {
          this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
        }
      }
    }
  
//Función para guardar datos modificados
async modificarDepM() {
  this.dependencia={
    dep_codigo:this.txtCodigo,
    dep_nombre:this.txtNombre,
    dep_alias:this.txtAlias,
    dep_codcodigo:this.txtPertenece,
    dep_estado:parseInt(this.txtEstado)
  }

  if (this.txtNombre == '' || this.txtCodigo == '' || this.txtAlias == '' || this.txtPertenece == 0) {
    this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
  }  else {
    const datos = await new Promise<any>((resolve) =>
      this.DependenciaSer.ModificarDependencia(this.dependencia).subscribe((translated) => {
        resolve(translated);
      })
    );

    if (datos.success) {
      this.modalDepM = false;
      this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Dependencia ' + this.mensajesg.ModificadoCorrectamente});
      this.listarDependencias();
      this.listarDependenciasAc();
    } else {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
    }
  }
}

  //Función para cerrar el modal de ingresar tipo dependencia
  hideDialog() {
    this.modalTipoDep = false;
  }

  //Función para cerrar el modal de ingresar tipo dependencia
  hideDialogD() {
    this.modalDep = false;
  }

  //Función para cerrar el modal de modificar tipo dependencia
  hideDialogM() {
    this.modalTipoDepM = false;
  }
  
  //Función para cerrar el modal de modificar dependencia
  hideDialogDM() {
    this.modalDepM = false;
  }
}
