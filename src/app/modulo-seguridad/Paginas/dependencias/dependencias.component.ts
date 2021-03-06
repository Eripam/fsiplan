import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { listaI, tipoDep, dependencia} from '../../Interface/seguridad';
import { swDependencia} from '../../ServiciosWeb/Dependencia/swDependencia.service';
import { MensajesGenerales} from '../../../Herramientas/Mensajes/MensajesGenerales.component';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { ActivatedRoute } from '@angular/router';
import { SwAuditoriaService } from '../../ServiciosWeb/Auditoria/swAuditoria.service';

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
  items: MenuItem[] = [];
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
  sesionDep:string='';
  sessionUser:string='';
  sessionRol:string='';
  sessionDepC:number=0;
  txtIngresar:boolean=false;
  txtModificar:boolean=false;


  constructor(private DependenciaSer: swDependencia, private messageService: MessageService, private mensajesg: MensajesGenerales, private sesiones:SesionUsuario, private route: ActivatedRoute, private swAuditoria:SwAuditoriaService) {
  }

  async ngOnInit() {
    this.listarTipoDependencias();
    this.listarDependencias();
    const datosS=await this.sesiones.obtenerDatosLogin();
    this.sesionDep=datosS.dep_nombre;
    this.sessionDepC=datosS.rpe_dependencia;
    this.sessionUser=datosS.rpe_persona;
    this.sessionRol=datosS.rol_nombre;
    const valores={
      rol:datosS.rpe_rol,
      opcion:this.route.snapshot.paramMap.get('opc'),
      padreop:this.route.snapshot.paramMap.get('enc')
    }
    const datosRol=await this.sesiones.obtenerOpcionesUsuario(valores);
    this.txtIngresar=datosRol.rop_insertar;
    this.txtModificar=datosRol.rop_modificar;
    //Menu superio con enlace del home
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items=[{label:datosRol.pop_nombre},{ label: datosRol.opc_nombre }]

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
    if(this.txtIngresar){
      this.txtNombre='';
      this.txtCodigo='';
      this.tituloModal = 'Ingresar Tipo Dependencia';
      this.modalTipoDep = true;
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
  }

  openNewD(){
    if(this.txtIngresar){
      this.listarTipoDependenciasA();
      this.listarDependenciasAc();
      this.txtNombre='',
      this.txtAlias='',
      this.txtPertenece=0,
      this.txtTipo=0,
      this.txtCodigo='',
      this.tituloModal= 'Ingresar Dependencia';
      this.modalDep=true;
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
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
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar tipo dependencia con los datos: {nombre:"+this.txtNombre+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalTipoDep = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Tipo Dependencia ' + this.mensajesg.IngresadoCorrectamente});
        this.listarTipoDependencias();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
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
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar dependencia con los datos: {Nombre:"+this.txtNombre+", Alias:"+this.txtAlias+", Depende: "+this.txtPertenece+", Tipo: "+this.txtTipo+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalDep = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Dependencia ' + this.mensajesg.IngresadoCorrectamente});
        this.listarDependencias();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
      }
    }
  }

  modificarTipoDep(tipoDep: any){
    if(this.txtModificar){
      this.tituloModal='Modificar Tipo Dependencia';
      this.txtCodigo=tipoDep.tde_codigo;
      this.txtNombre=tipoDep.tde_nombre;
      this.txtEstado=tipoDep.tde_estado;
      this.modalTipoDepM=true;
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
  }

  modificarDep(dependencia: any){
    if(this.txtModificar){
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
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
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
          const datosAudi={
            aud_usuario:this.sessionUser,
            aud_proceso:"Modificar",
            aud_descripcion:"Modificar tipo dependencia con los datos: {nombre:"+this.txtNombre+", Código: "+this.txtCodigo+", Estado: "+this.txtEstado+"}",
            aud_rol:this.sessionRol,
            aud_dependencia:this.sessionDepC
          }
          const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
          this.modalTipoDepM = false;
          this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Tipo Dependencia ' + this.mensajesg.ModificadoCorrectamente});
          this.listarTipoDependencias();
          this.listarDependencias();
        } else {
          this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
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
    dep_tipo:this.txtTipo,
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
      const datosAudi={
        aud_usuario:this.sessionUser,
        aud_proceso:"Modificar",
        aud_descripcion:"Modificar dependencia con los datos: {Código: "+this.txtCodigo+",Nombre:"+this.txtNombre+", Alias: "+this.txtAlias+", Pertenece: "+this.txtPertenece+", Tipo: "+this.txtTipo+",Estado: "+this.txtEstado+"}",
        aud_rol:this.sessionRol,
        aud_dependencia:this.sessionDepC
      }
      const datosAud = await new Promise<any>((resolve) =>
      this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
      this.modalDepM = false;
      this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Dependencia ' + this.mensajesg.ModificadoCorrectamente});
      this.listarDependencias();
      this.listarDependenciasAc();
    } else {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
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
