import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { indicador, listaI, meta, objetivo, politica } from '../../Interface/planEstrategico';
import { SwPlanNacionalService } from '../../ServiciosWeb/PlanNacional/swPlanNacional.service';

@Component({
  selector: 'app-plan-nacional',
  templateUrl: './plan-nacional.component.html',
  styleUrls: ['./plan-nacional.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PlanNacionalComponent implements OnInit {
  modalPlanN: boolean=false;
  listaObjetivos:any=[];
  listaObjetivos2:any=[];
  tituloModal:string='';
  txtNombre:string='';
  txtEstado:string='';
  txtCodigo:number=0;
  sessionUser:string='';
  sessionRol:string='';
  sesionDep:string='';
  sesionTipo:number=0;
  sessionDepC:number=0;
  txtIngresar:boolean=false;
  txtModificar:boolean=false;
  txtEliminar:boolean=false;
  eliminar:boolean=false;
  txtTipo:number=0;
  loading: boolean = true;
  //Variable para los estados de usuario
  statuses!: any[];
  listaPoliticas:any=[];
  listaPoliticas2:any=[];
  listaMeta2:any=[];
  listaMeta:any=[];
  txtObjetivo:number=0;
  txtPolitica:number=0;
  label1:string="";
  label2:string="";
  modalInd:boolean=false;
  txtDescripcion:string="";
  txtMeta:number=0;
  txtVInicial:string="";
  txtVAbsoluto:string="";
  txtVMeta:string="";
  stateOptions:any=[];
  txtExpresion:number=0;
  listaIndicador:any=[];

  constructor(private sesiones:SesionUsuario, private messageService: MessageService, private mensajesg:MensajesGenerales, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService, private swPlanN: SwPlanNacionalService) { }

  async ngOnInit(){
    const datosS=await this.sesiones.obtenerDatosLogin();
    this.sesionDep=datosS.dep_nombre;
    this.sesionTipo=datosS.dep_tipo;
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
    this.txtEliminar=datosRol.rop_eliminar;
    this.listarObjetivosP();
    this.listarPoliticas();
    this.listarMetas();
    this.listarIndicador();
      //Ingreso de los tipos que tiene el estado de usuario
    this.statuses = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 0 },
      { label: 'Aprobado', value: 2 }
    ];
  }

  hideDialogPlan(){
    this.modalPlanN=false;
  }

  hideDialogPlanInd(){
    this.modalInd=false;
  }
  
  async guardarPlanN(){
    if(this.txtNombre=='' || this.txtNombre==null){
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.CamposVacios
      });
    }else if(this.txtTipo==1){
      if(this.txtCodigo==0){
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Ingresar',
          aud_descripcion:
            'Ingresar objetivos con los datos: {Nombre:' +
            this.txtNombre +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const dat:objetivo={
          objpn_id: this.txtCodigo,
          objpn_nombre:this.txtNombre,
          objpn_estado:this.txtEstado,
          auditoria:datosAudi
        }
        const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.IngresarObjetivoP(dat).subscribe((translated)=> { resolve(translated)}));
        if(datos.success){
          this.modalPlanN=false;
          this.listarObjetivosP();
          this.messageService.add({
            severity: 'success',
            summary: this.mensajesg.CabeceraExitoso,
            detail: this.mensajesg.IngresadoCorrectamente,
          });
        }else{
          this.messageService.add({
            severity: 'error',
            summary: this.mensajesg.CabeceraError,
            detail: this.mensajesg.ErrorProceso,
          });
        }
      }else if(this.txtCodigo>0 && !this.eliminar){
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Modificar',
          aud_descripcion:
            'Modificar objetivos con los datos: {Código:' +
            this.txtCodigo + 
            'Nombre:' +
            this.txtNombre +
            'Estado:' +
            this.txtEstado +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const dat:objetivo={
          objpn_id: this.txtCodigo,
          objpn_nombre:this.txtNombre,
          objpn_estado:this.txtEstado,
          auditoria:datosAudi
        }
        const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.ModificarObjetivoP(dat).subscribe((translated)=> { resolve(translated)}));
        if(datos.success){
          this.modalPlanN=false;
          this.listarObjetivosP();
          this.messageService.add({
            severity: 'success',
            summary: this.mensajesg.CabeceraExitoso,
            detail: this.mensajesg.ModificadoCorrectamente,
          });
        }else{
          this.messageService.add({
            severity: 'error',
            summary: this.mensajesg.CabeceraError,
            detail: this.mensajesg.ErrorProceso,
          });
        }
      }else{
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Eliminar ',
          aud_descripcion:
            'Eliminar objetivos con los datos: {Código:' +
            this.txtCodigo + 
            'Nombre:' +
            this.txtNombre +
            'Estado:' +
            this.txtEstado +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const dat:objetivo={
          objpn_id: this.txtCodigo,
          objpn_nombre:this.txtNombre,
          objpn_estado:this.txtEstado,
          auditoria:datosAudi
        }
        const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.EliminarObjetivoP(dat).subscribe((translated)=> { resolve(translated)}));
        if(datos.success){
          this.modalPlanN=false;
          this.listarObjetivosP();
          this.messageService.add({
            severity: 'success',
            summary: this.mensajesg.CabeceraExitoso,
            detail: this.mensajesg.EliminadoCorrectamente,
          });
        }else{
          this.messageService.add({
            severity: 'error',
            summary: this.mensajesg.CabeceraError,
            detail: this.mensajesg.ErrorProceso,
          });
        }
      }
    }else if(this.txtTipo==2){
      if(this.txtCodigo==0){
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Ingresar',
          aud_descripcion:
            'Ingresar politicas con los datos: {Nombre:' +
            this.txtNombre +
            'Objtivo'+
            this.txtObjetivo+
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const dat:politica={
          polpn_id: this.txtCodigo,
          polpn_nombre:this.txtNombre,
          polpn_estado:this.txtEstado,
          polpn_objetivo:this.txtObjetivo,
          auditoria:datosAudi
        }
        const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.IngresarPoliticasP(dat).subscribe((translated)=> { resolve(translated)}));
        if(datos.success){
          this.modalPlanN=false;
          this.listarPoliticas();
          this.messageService.add({
            severity: 'success',
            summary: this.mensajesg.CabeceraExitoso,
            detail: this.mensajesg.IngresadoCorrectamente,
          });
        }else{
          this.messageService.add({
            severity: 'error',
            summary: this.mensajesg.CabeceraError,
            detail: this.mensajesg.ErrorProceso,
          });
        }
      }else if(this.txtCodigo>0 && !this.eliminar){
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Modificar',
          aud_descripcion:
            'Modificar políticas con los datos: {Código:' +
            this.txtCodigo + 
            'Nombre:' +
            this.txtNombre +
            'Objetivo:' +
            this.txtObjetivo +
            'Estado:' +
            this.txtEstado +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const dat:politica={
          polpn_id: this.txtCodigo,
          polpn_nombre:this.txtNombre,
          polpn_estado:this.txtEstado,
          polpn_objetivo:this.txtObjetivo,
          auditoria:datosAudi
        }
        const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.ModificarPoliticasP(dat).subscribe((translated)=> { resolve(translated)}));
        if(datos.success){
          this.modalPlanN=false;
          this.listarPoliticas();
          this.messageService.add({
            severity: 'success',
            summary: this.mensajesg.CabeceraExitoso,
            detail: this.mensajesg.ModificadoCorrectamente,
          });
        }else{
          this.messageService.add({
            severity: 'error',
            summary: this.mensajesg.CabeceraError,
            detail: this.mensajesg.ErrorProceso,
          });
        }
      }else{
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Eliminar ',
          aud_descripcion:
            'Eliminar políticas con los datos: {Código:' +
            this.txtCodigo + 
            'Nombre:' +
            this.txtNombre +
            'Objetivo:' +
            this.txtObjetivo +
            'Estado:' +
            this.txtEstado +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const dat:politica={
          polpn_id: this.txtCodigo,
          polpn_nombre:this.txtNombre,
          polpn_estado:this.txtEstado,
          polpn_objetivo:this.txtObjetivo,
          auditoria:datosAudi
        }
        const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.EliminarPolitica(dat).subscribe((translated)=> { resolve(translated)}));
        if(datos.success){
          this.modalPlanN=false;
          this.listarPoliticas();
          this.messageService.add({
            severity: 'success',
            summary: this.mensajesg.CabeceraExitoso,
            detail: this.mensajesg.EliminadoCorrectamente,
          });
        }else{
          this.messageService.add({
            severity: 'error',
            summary: this.mensajesg.CabeceraError,
            detail: this.mensajesg.ErrorProceso,
          });
        }
      }
    }else if(this.txtTipo==3){
      if(this.txtCodigo==0){
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Ingresar',
          aud_descripcion:
            'Ingresar metas con los datos: {Nombre:' +
            this.txtNombre +
            ',Política:' +
            this.txtPolitica +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const dat:meta={
          metapn_id: this.txtCodigo,
          metapn_nombre:this.txtNombre,
          metapn_estado:this.txtEstado,
          metapn_politica:this.txtPolitica,
          auditoria:datosAudi
        }
        const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.IngresarMetasP(dat).subscribe((translated)=> { resolve(translated)}));
        if(datos.success){
          this.modalPlanN=false;
          this.listarMetas();
          this.messageService.add({
            severity: 'success',
            summary: this.mensajesg.CabeceraExitoso,
            detail: this.mensajesg.IngresadoCorrectamente,
          });
        }else{
          this.messageService.add({
            severity: 'error',
            summary: this.mensajesg.CabeceraError,
            detail: this.mensajesg.ErrorProceso,
          });
        }
      }else if(this.txtCodigo>0 && !this.eliminar){
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Modificar',
          aud_descripcion:
            'Modificar políticas con los datos: {Código:' +
            this.txtCodigo + 
            ', Nombre:' +
            this.txtNombre +
            ', Estado:' +
            this.txtEstado +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const dat:meta={
          metapn_id: this.txtCodigo,
          metapn_nombre:this.txtNombre,
          metapn_estado:this.txtEstado,
          metapn_politica:this.txtPolitica,
          auditoria:datosAudi
        }
        const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.ModificarMetasP(dat).subscribe((translated)=> { resolve(translated)}));
        if(datos.success){
          this.modalPlanN=false;
          this.listarMetas();
          this.messageService.add({
            severity: 'success',
            summary: this.mensajesg.CabeceraExitoso,
            detail: this.mensajesg.ModificadoCorrectamente,
          });
        }else{
          this.messageService.add({
            severity: 'error',
            summary: this.mensajesg.CabeceraError,
            detail: this.mensajesg.ErrorProceso,
          });
        }
      }else{
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Eliminar ',
          aud_descripcion:
            'Eliminar meta con los datos: {Código:' +
            this.txtCodigo + 
            ', Nombre:' +
            this.txtNombre +
            ', Política'+
            +this.txtPolitica+
            ', Estado:' +
            this.txtEstado +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const dat:meta={
          metapn_id: this.txtCodigo,
          metapn_nombre:this.txtNombre,
          metapn_estado:this.txtEstado,
          metapn_politica:this.txtPolitica,
          auditoria:datosAudi
        }
        const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.EliminarMetasP(dat).subscribe((translated)=> { resolve(translated)}));
        if(datos.success){
          this.modalPlanN=false;
          this.listarMetas();
          this.messageService.add({
            severity: 'success',
            summary: this.mensajesg.CabeceraExitoso,
            detail: this.mensajesg.EliminadoCorrectamente,
          });
        }else{
          this.messageService.add({
            severity: 'error',
            summary: this.mensajesg.CabeceraError,
            detail: this.mensajesg.ErrorProceso,
          });
        }
      }
    }
  }

  async guardarIndicador(){
    if(this.txtNombre=='' || this.txtNombre==null || this.txtDescripcion=='' || this.txtDescripcion==null || this.txtVInicial=='' || this.txtVInicial==null || this.txtVAbsoluto=='' || this.txtVAbsoluto==null || this.txtVMeta=='' || this.txtVMeta==null){
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.CamposVacios
      });
    }else if(this.txtCodigo==0 && !this.eliminar){
      const datosAudi = {
        aud_usuario: this.sessionUser,
        aud_proceso: 'Ingresar',
        aud_descripcion:
          'Ingresar indicador con los datos: {Nombre:' +
          this.txtNombre +
          ', Descripción:' +
          this.txtDescripcion +
          ', Valor Inicial:' +
          this.txtVInicial +
          ', Valor Absoluto:' +
          this.txtVAbsoluto +
          ', Valor Meta:' +
          this.txtVMeta +
          ', Meta:' +
          this.txtMeta +
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dat:indicador={
        indpn_id: this.txtCodigo,
        indpn_nombre:this.txtNombre,
        indp_estado:this.txtEstado,
        indpn_expresion:this.txtExpresion,
        indpn_valor_inicial:this.txtVInicial,
        indpn_valor_absoluto:this.txtVAbsoluto,
        indpn_meta:this.txtMeta,
        indpn_valor_meta:this.txtVMeta,
        indpn_descripcion:this.txtDescripcion,
        auditoria:datosAudi
      }
      const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.IngresarIndicadorP(dat).subscribe((translated)=> { resolve(translated)}));
      if(datos.success){
        this.modalInd=false;
        this.listarIndicador();
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.IngresadoCorrectamente,
        });
      }else{
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: this.mensajesg.ErrorProceso,
        });
      }
    }else if(this.txtCodigo>0 && !this.eliminar){
      const datosAudi = {
        aud_usuario: this.sessionUser,
        aud_proceso: 'Modificar',
        aud_descripcion:
          'Modificar indicador con los datos: {Código:'+this.txtCodigo+
          ' ,Nombre:' +
          this.txtNombre +
          ', Descripción:' +
          this.txtDescripcion +
          ', Valor Inicial:' +
          this.txtVInicial +
          ', Valor Absoluto:' +
          this.txtVAbsoluto +
          ', Valor Meta:' +
          this.txtVMeta +
          ', Meta:' +
          this.txtMeta +
          ', Estado:' +
          this.txtEstado +
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dat:indicador={
        indpn_id: this.txtCodigo,
        indpn_nombre:this.txtNombre,
        indp_estado:this.txtEstado,
        indpn_expresion:this.txtExpresion,
        indpn_valor_inicial:this.txtVInicial,
        indpn_valor_absoluto:this.txtVAbsoluto,
        indpn_meta:this.txtMeta,
        indpn_valor_meta:this.txtVMeta,
        indpn_descripcion:this.txtDescripcion,
        auditoria:datosAudi
      }
      const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.ModificarIndicadorP(dat).subscribe((translated)=> { resolve(translated)}));
      if(datos.success){
        this.modalInd=false;
        this.listarIndicador();
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.ModificadoCorrectamente,
        });
      }else{
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: this.mensajesg.ErrorProceso,
        });
      }
    }else{
      const datosAudi = {
        aud_usuario: this.sessionUser,
        aud_proceso: 'Eliminar',
        aud_descripcion:
          'Eliminar indicador con los datos: {Código:'+this.txtCodigo+
          ' ,Nombre:' +
          this.txtNombre +
          ', Descripción:' +
          this.txtDescripcion +
          ', Valor Inicial:' +
          this.txtVInicial +
          ', Valor Absoluto:' +
          this.txtVAbsoluto +
          ', Valor Meta:' +
          this.txtVMeta +
          ', Meta:' +
          this.txtMeta +
          ', Estado:' +
          this.txtEstado +
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dat:indicador={
        indpn_id: this.txtCodigo,
        indpn_nombre:this.txtNombre,
        indp_estado:this.txtEstado,
        indpn_expresion:this.txtExpresion,
        indpn_valor_inicial:this.txtVInicial,
        indpn_valor_absoluto:this.txtVAbsoluto,
        indpn_meta:this.txtMeta,
        indpn_valor_meta:this.txtVMeta,
        indpn_descripcion:this.txtDescripcion,
        auditoria:datosAudi
      }
      const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.EliminarIndicadorP(dat).subscribe((translated)=> { resolve(translated)}));
      if(datos.success){
        this.modalInd=false;
        this.listarIndicador();
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.EliminadoCorrectamente,
        });
      }else{
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: this.mensajesg.ErrorProceso,
        });
      }
    }
  }

  openNewOb(titulo:any, tipo:number){
    if(this.txtIngresar){
      this.tituloModal=titulo;
      this.txtCodigo=0;
      this.txtNombre='';
      this.eliminar=false;
      this.modalPlanN=true;
      this.label1="Guardar";
      this.label2="Cancelar";
      this.txtTipo=tipo;
      console.log(this.txtTipo);
      if(tipo==2){
        this.listarObjetivosP2();
      }else{
        this.listarPoliticas2();
      }
    }else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  openNewInd(titulo:string){
    if(this.txtIngresar){
      this.tituloModal=titulo;
      this.txtCodigo=0;
      this.txtNombre="";
      this.txtDescripcion="";
      this.txtVInicial="";
      this.txtVAbsoluto="";
      this.txtVMeta="";
      this.txtEstado="";
      this.txtMeta=0;
      this.label1="Guardar";
      this.label2="Cancelar";
      this.eliminar=false;
      this.modalInd=true;
      this.listarMetas2();
    }else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  modificarObjetivo(objetivo:any, titulo:string, tipo:number){
    if(this.txtModificar){
      this.tituloModal=titulo;
      this.label1="Guardar";
      this.label2="Cancelar";
      if(tipo==1){
        this.txtCodigo=objetivo.objpn_id;
        this.txtNombre=objetivo.objpn_nombre;
        this.txtEstado=objetivo.objpn_estado;
      }else if(tipo==2){
        this.txtCodigo=objetivo.polpn_id;
        this.txtNombre=objetivo.polpn_nombre;
        this.txtObjetivo=objetivo.polpn_objetivo;
        this.txtEstado=objetivo.polpn_estado;
        this.listarObjetivosP2();
      }else if(tipo==3){
        this.txtCodigo=objetivo.metapn_id;
        this.txtNombre=objetivo.metapn_nombre;
        this.txtPolitica=objetivo.metapn_politica;
        this.txtEstado=objetivo.metapn_estado;
        this.listarPoliticas2();
      }
      this.eliminar=false;
      this.txtTipo=tipo;
      this.modalPlanN=true;
    }else{
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  modificarIndicador(indicador:indicador, titulo:string){
    if(this.txtModificar){
      this.tituloModal=titulo;
      this.txtCodigo=indicador.indpn_id;
      this.txtNombre=indicador.indpn_nombre;
      this.txtDescripcion=indicador.indpn_descripcion;
      this.txtVInicial=indicador.indpn_valor_inicial;
      this.txtVAbsoluto=indicador.indpn_valor_absoluto;
      this.txtVMeta=indicador.indpn_valor_meta;
      this.txtEstado=indicador.indp_estado;
      this.txtMeta=indicador.indpn_meta;
      this.txtExpresion=indicador.indpn_expresion;
      this.label1="Guardar";
      this.label2="Cancelar";
      this.eliminar=false;
      this.modalInd=true;
      this.listarMetas2();
    }else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  eliminarIndicador(indicador:indicador, titulo:string){
    if(this.txtModificar){
      this.tituloModal=titulo;
      this.txtCodigo=indicador.indpn_id;
      this.txtNombre=indicador.indpn_nombre;
      this.txtDescripcion=indicador.indpn_descripcion;
      this.txtVInicial=indicador.indpn_valor_inicial;
      this.txtVAbsoluto=indicador.indpn_valor_absoluto;
      this.txtVMeta=indicador.indpn_valor_meta;
      this.txtEstado=indicador.indp_estado;
      this.txtMeta=indicador.indpn_meta;
      this.txtExpresion=indicador.indpn_expresion;
      this.label1="SI";
      this.label2="NO";
      this.eliminar=true;
      this.modalInd=true;
      this.listarMetas2();
    }else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  eliminarObjetivo(obj:any, titulo:string, tipo:number){
    if(this.txtEliminar){
      this.tituloModal=titulo;
      this.eliminar=true;
      this.label1="SI";
      this.label2="NO";
      if(tipo==1){
        this.txtCodigo=obj.objpn_id;
        this.txtNombre=obj.objpn_nombre;
        this.txtEstado=obj.objpn_estado;
      }else if(tipo==2){
        this.txtCodigo=obj.polpn_id;
        this.txtNombre=obj.polpn_nombre;
        this.txtObjetivo=obj.polpn_objetivo;
        this.txtEstado=obj.polpn_estado;
        this.listarObjetivosP2();
      }else if(tipo==3){
        this.txtCodigo=obj.metapn_id;
        this.txtNombre=obj.metapn_nombre;
        this.txtPolitica=obj.metapn_politica;
        this.txtEstado=obj.metapn_estado;
        this.listarPoliticas2();
      }
      this.txtTipo=tipo;
      this.modalPlanN=true;
    }else{
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }
  
  async listarObjetivosP(){
    const dat={
      tipo:1
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.ListarObjetivoP(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.listaObjetivos=datos.data;
    }else{
      this.listaObjetivos=[];
    }
    this.loading = false;
  }
  
  async listarObjetivosP2(){
    const dat={
      tipo:2
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.ListarObjetivoP(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.listaObjetivos2=datos.data;
    }else{
      this.listaObjetivos2=[];
    }
    this.loading = false;
  }

  async listarPoliticas(){
    const dat={
      tipo:1
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.ListarPoliticasP(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.listaPoliticas=datos.data;
    }else{
      this.listaPoliticas=[];
    }
    this.loading = false;
  }

  async listarPoliticas2(){
    const dat={
      tipo:2
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.ListarPoliticasP(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.listaPoliticas2=datos.data;
    }else{
      this.listaPoliticas2=[];
    }
    this.loading = false;
  }

  async listarMetas(){
    const dat={
      tipo:1
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.ListarMetasPN(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.listaMeta=datos.data;
    }else{
      this.listaMeta=[];
    }
    this.loading = false;
  }

  async listarMetas2(){
    const dat={
      tipo:2
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.ListarMetasPN(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.listaMeta2=datos.data;
    }else{
      this.listaMeta2=[];
    }
    this.loading = false;
  }

  async listarIndicador(){
    const dat={
      tipo:1
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanN.ListarIndicadoresPN(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.listaIndicador=datos.data;
    }else{
      this.listaIndicador=[];
    }
    this.loading = false;
  }
}
