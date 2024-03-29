import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { exit } from 'process';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { configServiciosWeb } from '../../ConfigService/configServiciosWeb';
import { listaI, opcion, PadreOpcion } from '../../Interface/seguridad';
import { SwAuditoriaService } from '../../ServiciosWeb/Auditoria/swAuditoria.service';
import { swPadreopcionService } from '../../ServiciosWeb/PadreOpcion/swpadreopcion.service';
import { swReglamentoService } from '../../ServiciosWeb/Reglamento/swReglamento.service';
import { SwReglamentoOpService } from '../../ServiciosWeb/ReglamentoOpc/swReglamentoOp.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class OpcionesComponent implements OnInit {

   //Variable para listar
   listaPadreOpcion: PadreOpcion[]=[];
   listaOpcion: opcion[]=[];
   listaOpcionA:opcion[]=[];
   listaReglamentos: any[]=[];
   listaRegOp:any[]=[];
   listaReglamentoA:any[]=[];
   //Menú del home
   items: MenuItem[] = [];
   home!: MenuItem;
   //Variable para los estados de usuario
   statuses!: any[];
   //Variable para mostrar el loading en la tabla
   loading: boolean = true;
   //Variable para abrir y cerrar el modal
   modalPadreOp!: boolean;
   modalPadreOpM!: boolean;
   modalOpcion!: boolean;
   modalOpcionM!:boolean;
   modalRegla!:boolean;
   modalReglaM!:boolean;
   modalReglaOp!:boolean;
   modalReglaOpM!:boolean;
   //Titulo del modal
   tituloModal: string = '';
   //Declaración de variables para ingreso y modificaicón
   txtEstado: string = '';
   padreopcion : PadreOpcion={};
   opcion : opcion={};
   txtNombre: string = '';
   txtIcono: string = '';
   txtCodigo: string = '';
   txtUrl: string='';
   txtDescripcion: string='';
   txtCodigoArchivo: number=0;
   txtNombreR: string='';
   txtOrden: string='';
   uploadedFiles: any[] = [];
   url: string;
   urlM: string;
   UrlSiplanReg:string;
   codigoR:number=0;
   elimArchivos:any=[];
   archivoNombre: any=[];
   archivoNombreM: any=[];
   reglamento: any =[];
   txtOpcion:string='';
   fechaI: string='';
   sesionDep: string='';
   sessionUser:string='';
   sessionRol:string='';
   sessionDepC:number=0;
   txtIngresar:boolean=false;
   txtModificar:boolean=false;
   files: any[]=[];
   filesname: string='';
   direccion: string='';
   archivobase64:string='';
   cont:number=0;
   
   constructor(private messageService: MessageService ,private mensajesg: MensajesGenerales, private padreopcionser: swPadreopcionService,  server: configServiciosWeb, private swReglamento: swReglamentoService,private swRegOp: SwReglamentoOpService, private sesiones: SesionUsuario, private route: ActivatedRoute, private swAuditoria:SwAuditoriaService) {
    this.UrlSiplanReg=server.urlServiciosSiplanRegla;
    this.url= this.UrlSiplanReg+'archivo';
    this.urlM=this.UrlSiplanReg+'archivoM';
   }
 
 
   async ngOnInit() {
     this.listarPadreOpcion();
     this.listarOpcion();
     this.listarReglamentos();
     this.listarReglamentosOp();
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
 
  async listarPadreOpcion(){
     const datos:listaI=await new Promise<listaI>((resolve)=> this.padreopcionser.ListaPadreOpcion().subscribe((translated)=>{resolve(translated);}))
     if(datos.success){
       this.listaPadreOpcion=datos.data;
     }else{
       this.listaPadreOpcion=[];
     }
     this.loading=false;
   }

  async listarOpcion(){
    const datos:listaI=await new Promise<listaI>((resolve)=> this.padreopcionser.ListarOpciones().subscribe((translated)=>{resolve(translated);}))
    if(datos.success){
      this.listaOpcion=datos.data;
    }else{
      this.listaOpcion=[];
    }
    this.loading=false;
  }

  async listarOpcionActivo(){
    const datos:listaI=await new Promise<listaI>((resolve)=> this.padreopcionser.ListarOpcionesA().subscribe((translated)=>{resolve(translated);}))
    if(datos.success){
      this.listaOpcionA=datos.data;
    }else{
      this.listaOpcionA=[];
    }
    this.loading=false;
  }

  async listarReglamentos(){
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swReglamento.ListarReglamento().subscribe((translated)=>{resolve(translated);}))
    if(datos.success){
      this.listaReglamentos=datos.data;
    }else{
      this.listaReglamentos=[];
    }
    this.loading=false;
  }

  async listarReglamentosOp(){
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swRegOp.ListarReglamentoO().subscribe((translated)=>{resolve(translated);}))
    if(datos.success){
      this.listaRegOp=datos.data;
    }else{
      this.listaRegOp=[];
    }
    this.loading=false;
  }

  async listarReglamentosActivos(){
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swReglamento.ListarReglamentoAc().subscribe((translated)=>{resolve(translated);}));
    if(datos.success){
      this.listaReglamentoA=datos.data;
    }else{
      this.listaReglamentoA=[];
    }
    this.loading=false;
  }

  async obtenerCodigo(){
    const datos:any=await new Promise<any>((resolve)=> this.swReglamento.ObtenerCodigo().subscribe((translated)=>{resolve(translated);}))
    this.codigoR=datos.data[0].f_codigo_seguridad;
    this.loading=false;
  }
 
   openNewPO(){
     if(this.txtIngresar){
       this.tituloModal="Crear Encabezado Opción";
       this.txtNombre='';
       this.txtIcono='';
       this.modalPadreOp=true;
     }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
   }

   openNewOP(){
    if(this.txtIngresar){
      this.tituloModal="Crear Opción";
      this.txtNombre='';
      this.txtDescripcion='';
      this.txtUrl='';
      this.modalOpcion=true;
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
  }

  openNewRegOp(){
    if(this.txtIngresar){
      this.tituloModal="Asignar Reglamento Opción";
      this.txtCodigo='';
      this.txtOpcion='';
      this.fechaI='';
      this.listarOpcionActivo();
      this.listarReglamentosActivos();
      this.modalReglaOp=true;
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
  }

  async openNewReg(){
    if(this.txtIngresar){
      await this.obtenerCodigo();
      this.tituloModal='Ingresar Reglamento';
      this.txtNombreR='';
      this.archivoNombre=[];
      this.uploadedFiles=[];
      this.modalRegla=true;
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
  }
 
   modificarPadreOp(padreop: any){
      if(this.txtModificar){
      this.tituloModal="Modificar Encabezado Opción";
       this.txtCodigo=padreop.pop_codigo;
       this.txtNombre=padreop.pop_nombre;
       this.txtIcono=padreop.pop_icono;
       this.txtEstado=padreop.pop_estado;
       this.modalPadreOpM=true;
      }else{
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
      }
   }

   modificarOpcion(opcion: any){
     if(this.txtModificar){
      this.tituloModal="Modificar Opción";
      this.txtCodigo=opcion.opc_codigo;
      this.txtNombre=opcion.opc_nombre;
      this.txtDescripcion=opcion.opc_descripcion;
      this.txtUrl=opcion.opc_url
      this.txtEstado=opcion.opc_estado;
      this.txtOrden=opcion.opc_orden;
      this.modalOpcionM=true;
     }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
  }

  modificarReglamento(reglamento: any){
    if(this.txtModificar){
      this.tituloModal='Modificar Reglamentos';
      this.txtCodigo=reglamento.reg_codigo;
      this.archivoNombre=[];
      this.archivoNombreM=[];
      for(var i=0; i<reglamento.reg_archivos.length; i++){
        this.archivoNombre.push({"rar_nombre":reglamento.reg_archivos[i].rar_nombre, "rar_codigo":reglamento.reg_archivos[i].rar_codigo, "rar_reglamento":reglamento.reg_archivos[i].rar_reglamento});
      }
      this.txtNombreR=reglamento.reg_nombre;
      this.txtEstado=reglamento.reg_estado;
      this.modalReglaM=true;
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
  }

  modificarReglamentoOp(reglamento:any){
    if(this.txtModificar){
      this.tituloModal='Modificar asignar reglamento';
      this.listarOpcionActivo();
      this.listarReglamentosActivos();
      this.txtCodigo=reglamento.reop_reglamento;
      this.txtOpcion=reglamento.reop_opcion;
      var fechai=new Date(reglamento.reop_fecha_inicio);
      var mes=fechai.getMonth()+1;
      this.fechaI=mes + '/' + fechai.getDate() + '/' + fechai.getFullYear();
      this.txtEstado=reglamento.reop_estado;
      this.txtIcono=reglamento.reop_opcion;
      this.modalReglaOpM=true;
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
  }
 
   hideDialogPO(){
     this.modalPadreOp=false;
   }
  
   hideDialogPOM(){
     this.modalPadreOpM=false; 
   }

   hideDialogOP(){
    this.modalOpcion=false;
  }
 
  hideDialogOPM(){
    this.modalOpcionM=false; 
  }

  hideDialogReg(){
    this.modalRegla=false;
  }

  hideDialogRegM(){
    this.modalReglaM=false;
  }

  hideDialogRegPM(){
    this.modalReglaOpM=false;
  }
 
  async guardarOpcion(){
     this.opcion={
       opc_nombre:this.txtNombre,
       opc_descripcion:this.txtDescripcion,
       opc_url:this.txtUrl,
       opc_orden: this.txtOrden
     };
 
     if (this.txtNombre == '' || this.txtDescripcion == '' || this.txtUrl=='' || this.txtOrden=='') {
       this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
     } else {
       const datos = await new Promise<any>((resolve) =>
          this.padreopcionser.IngresarOpcion(this.opcion).subscribe((translated) => {
           resolve(translated);
         })
       );
 
       if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar opción con los datos: {Nombre:"+this.txtNombre+", Descripción: "+this.txtDescripcion+", Url: "+this.txtUrl+", Opción: "+this.txtOrden+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
         this.modalOpcion = false;
         this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Opción ' + this.mensajesg.IngresadoCorrectamente});
         this.listarOpcion();
       } else {
         this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
       }
     }
   }

   async guardarPadreOpcion(){
    this.padreopcion={
      pop_nombre:this.txtNombre,
      pop_icono:this.txtIcono
    };

    if (this.txtNombre == '' || this.txtIcono == '') {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    } else {
      const datos = await new Promise<any>((resolve) =>
         this.padreopcionser.IngresarPadreOpcion(this.padreopcion).subscribe((translated) => {
          resolve(translated);
        })
      );

      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar padre opción con los datos: {Nombre:"+this.txtNombre+", Icono: "+this.txtIcono+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalPadreOp = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Encabezado Opción ' + this.mensajesg.IngresadoCorrectamente});
        this.listarPadreOpcion();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
      }
    }
  }

  async guardarReglamento(){
    this.reglamento={
      reg_codigo:this.codigoR,
      reg_nombre:this.txtNombreR,
      archivos:this.archivoNombre
    }

    if(this.txtNombreR=='' || this.archivoNombre.length==0){
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    }else{
      const datos = await new Promise<any>((resolve) =>
         this.swReglamento.IngresarReglamento(this.reglamento).subscribe((translated) => {
           resolve(translated);
         })
       );
   
       if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar reglamento con los datos: {Código: "+this.codigoR+", nombre:"+this.txtNombreR+", archivos: "+this.archivoNombre+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
         this.modalRegla = false;
         this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Reglamento ' + this.mensajesg.IngresadoCorrectamente});
         this.listarReglamentos();
       } else {
         this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
       }
     }
  }
  
  async guardarPadreOM(){
     this.padreopcion={
       pop_codigo:parseInt(this.txtCodigo),
       pop_nombre:this.txtNombre,
       pop_icono:this.txtIcono,
       pop_estado:parseInt(this.txtEstado)
     }
   
     if (this.txtCodigo == '' || this.txtNombre == '' || this.txtIcono == '') {
       this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
     }  else {
       const datos = await new Promise<any>((resolve) =>
         this.padreopcionser.ModificarPadreOpcion(this.padreopcion).subscribe((translated) => {
           resolve(translated);
         })
       );
   
       if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Modificar",
          aud_descripcion:"Modificar Padre opción con los datos: {Código: "+this.txtCodigo+", Nombre:"+this.txtNombre+", Icono: "+this.txtIcono+", Estado: "+this.txtEstado+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
         this.modalPadreOpM = false;
         this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Encabezado Opción ' + this.mensajesg.ModificadoCorrectamente});
         this.listarPadreOpcion();
       } else {
         this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
       }
     }
   }

   async guardarOpcionM(){
    this.opcion={
      opc_codigo:parseInt(this.txtCodigo),
      opc_nombre:this.txtNombre,
      opc_descripcion:this.txtDescripcion,
      opc_url:this.txtUrl,
      opc_orden:this.txtOrden,
      opc_estado:parseInt(this.txtEstado)
    }
  
    if (this.txtCodigo == '' || this.txtNombre == '' || this.txtDescripcion == '' || this.txtUrl == '' || this.txtOrden == '') {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    }  else {
      const datos = await new Promise<any>((resolve) =>
        this.padreopcionser.ModificarOpcion(this.opcion).subscribe((translated) => {
          resolve(translated);
        })
      );
  
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Modificar",
          aud_descripcion:"Modificar opción con los datos: {Código: "+this.txtCodigo+", Nombre:"+this.txtNombre+", Descripción: "+this.txtDescripcion+", Url: "+this.txtUrl+", Opción: "+this.txtOrden+",Estado: "+this.txtEstado+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalOpcionM = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Opción ' + this.mensajesg.ModificadoCorrectamente});
        this.listarOpcion();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
      }
    }
  }

  async guardarReglamentoM(){
    this.reglamento={
      reg_codigo:this.txtCodigo,
      reg_nombre:this.txtNombreR,
      reg_estado:this.txtEstado,
      archivos:this.archivoNombreM
    }

    if(this.txtNombreR=='' || (this.archivoNombre.length==0 && this.archivoNombreM==0)){
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    }else{
      const datos = await new Promise<any>((resolve) =>
         this.swReglamento.ModificarReglamentos(this.reglamento).subscribe((translated) => {
           resolve(translated);
         })
       );
   
       if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Modificar",
          aud_descripcion:"Modificar reglamento con los datos: {Código: "+this.txtCodigo+", Nombre:"+this.txtNombreR+", Archivos: "+this.archivoNombreM+", Estado: "+this.txtEstado+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
         this.modalReglaM = false;
         this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Reglamento ' + this.mensajesg.ModificadoCorrectamente});
         this.listarReglamentosOp();
       } else {
         this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
       }
     }
  }

  async guardarRegOpcion(){
    this.reglamento={
      reop_reglamento:this.txtCodigo,
      reop_opcion:this.txtOpcion,
      reop_fecha_inicio:this.fechaI
    }

    if(this.txtCodigo=='' || this.txtOpcion=='' || this.fechaI==''){
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    }else{
      const datos = await new Promise<any>((resolve) =>
         this.swRegOp.IngresaReglamentoO(this.reglamento).subscribe((translated) => {
           resolve(translated);
         })
       );
   
       if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar reglamento opción con los datos: {Reglamento:"+this.txtCodigo+", Opción: "+this.txtOpcion+", Fecha Inicio: "+this.fechaI+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
         this.modalReglaOp = false;
         this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Reglamento Opción ' + this.mensajesg.IngresadoCorrectamente});
         this.listarReglamentosOp();
       } else {
         this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
       }
     }
  }

  async guardarRegOpcionM(){
    this.reglamento={
      reop_reglamento:this.txtCodigo,
      reop_opcion:this.txtOpcion,
      reop_fecha_inicio:this.fechaI,
      reop_estado:this.txtEstado,
      reop_opcion_m:this.txtIcono
    }

    if(this.txtCodigo=='' || this.txtOpcion=='' || this.fechaI==''){
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    }else{
      const datos = await new Promise<any>((resolve) =>
         this.swRegOp.ModificarReglamentoO(this.reglamento).subscribe((translated) => {
           resolve(translated);
         })
       );
   
       if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Modificar",
          aud_descripcion:"Modificar Reglamento Opción con los datos: {Reglamento:"+this.txtCodigo+", Opción: "+this.txtOpcion+", Fecha Inicio: "+this.fechaI+", Estado: "+this.txtEstado+", Opción M: "+this.txtIcono+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
         this.modalReglaOpM = false;
         this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Reglamento Opción ' + this.mensajesg.ModificadoCorrectamente});
         this.listarReglamentosOp();
       } else {
         this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
       }
     }
  }

  onUpload(event:any) {
    for(let file of event.files) {
      var nombre = this.codigoR+'-'+file.name;
        if(!this.archivoNombre.includes(nombre)){
          this.uploadedFiles.push(file);
          this.archivoNombre.push(this.codigoR+'-'+file.name);
          this.messageService.add({severity: 'info', summary: 'Archivo Ingresado correctamente', detail: ''});
        }else{
          this.messageService.add({severity: 'error', summary: 'Archivo ya ingresado', detail: ''});
        }
    }
  }

  async onUploadM(event:any, codigo:string) {
    this.reglamento={
      reg_codigo:codigo,
      demoM:this.uploadedFiles
    }
    const datos = await new Promise<any>((resolve) => this.swReglamento.EnviarCodigo(this.reglamento).subscribe((translated) => {
      resolve(translated);
    }));
    const dato2= await new Promise<any>((resolve)=>this.swReglamento.GuardarArchivo(this.reglamento).subscribe((translated)=>{
      resolve(translated);
    }));
    for(let file of event.files) {
      var nombre = codigo+'-'+file.name;
        if(!this.archivoNombre.includes(nombre) && !this.archivoNombreM.includes(nombre)){
          this.uploadedFiles.push(file);
          this.archivoNombre.push({"rar_nombre":codigo+'-'+file.name, "rar_codigo":0, "rar_reglamento":codigo});
          this.archivoNombre.push(codigo+'-'+file.name);
          this.archivoNombreM.push(codigo+'-'+file.name);
          this.messageService.add({severity: 'info', summary: 'Archivo Ingresado correctamente', detail: ''});
        }else{
          this.messageService.add({severity: 'error', summary: 'Archivo ya ingresado', detail: ''});
        }
    }
  }

  async eliminarArchivo(nombre:any){
    var index = this.uploadedFiles.indexOf(nombre);
    this.uploadedFiles.splice(index,1);
    /*this.elimArchivos={
      archivo:nombre
    }
    const datos = await new Promise<any>((resolve) =>this.swReglamento.EliminarArchivo(this.elimArchivos).subscribe((translated) => {
          resolve(translated);
        })
      );
  
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Eliminar",
          aud_descripcion:"Eliminar archivo con los datos: {Archivo: "+nombre+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        var index = this.archivoNombre.indexOf(nombre);
        this.archivoNombre.splice(index,1);
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Archivo ' + this.mensajesg.EliminadoCorrectamente});

      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorNoExisteDatos});
      }*/
  }

  async eliminarArchivoM(file:any){
    this.elimArchivos={
      rar_codigo:file.rar_codigo,
      rar_nombre:file.rar_nombre,
      rar_reglamento:file.rar_reglamento
    }
    const datos = await new Promise<any>((resolve) =>this.swReglamento.EliminarArchivoDB(this.elimArchivos).subscribe((translated) => {
      resolve(translated);
      })
    );

    if (datos.success) {
      const datosAudi={
        aud_usuario:this.sessionUser,
        aud_proceso:"Eliminar",
        aud_descripcion:"Eliminar archivo con los datos: {Código: "+file.rar_codigo+", Nombre: "+file.rar_nombre+", Reglamento: "+file.rar_reglamento+"}",
        aud_rol:this.sessionRol,
        aud_dependencia:this.sessionDepC
      }
      const datosAud = await new Promise<any>((resolve) =>
      this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
      this.eliminarArchivo(file.rar_nombre);
    } else {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorEliminarArchivos});
    }
    this.listarReglamentos();
  }

  guardarFile(evento:any){
    this.files=evento;
  }

  subirArchivo(){
    this.cont=0;
    //if(this.files==null || this.files==[]){
      if(this.files==null){
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ArchivoVacio});
    }else if(this.files[0].type=='application/pdf'){
      this.filesname=this.codigoR+'-'+this.files[0].name;
      this.direccion='SIPLANI/Prospectiva/Seguridad/Reglamentos/'+this.filesname;
      for(let files of this.uploadedFiles){
        if(files==this.filesname){
          this.cont++;
        }
      }
      if(this.cont>0){
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: 'Archivo ya subido'});
      }else{
        this.uploadedFiles.push(this.filesname);
        this.archivobase64=this.files[0].base64;
      }
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ExtensionErronea+' pdf'});
    }
  }
 }
 