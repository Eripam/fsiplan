import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { estructura, listaI } from '../../Interface/planEstrategico';
import { SwCronogramaService } from '../../ServiciosWeb/Cronograma/swCronograma.service';
import { SwEstructuraService } from '../../ServiciosWeb/Estructura/swEstructura.service';
import { SwPlanService } from '../../ServiciosWeb/Plan/swPlan.service';

@Component({
  selector: 'app-estructura',
  templateUrl: './estructura.component.html',
  styleUrls: ['./estructura.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class EstructuraComponent implements OnInit {
// Menú del home
items: MenuItem[] = [];
home!: MenuItem;
//Variable para los estados de usuario
statuses!: any[];
//Lista prospectiva
listaEstructura: any[]=[];
sesionDep:string='';
sesionTipo:number=0;
sessionDepC:number=0;
//Variables de modales
modalEstructura!:boolean;
tituloModal:string='';
txtNombre:string='';
txtEstado:string='';
txtCodigo:number=0;
sessionUser:string='';
sessionRol:string='';
txtIngresar:boolean=false;
txtModificar:boolean=false;
txtEliminar:boolean=false;
txtPlan:string="";
txtCodigoV:number=0;
listaPlanE:any=[];
//lista tipo dependencia
listaDep: any []=[];
txtPlanEstado:boolean=true;
txtIdentificador:string="";
eliminar:boolean=false;
txtEjes:boolean=false;
txtComponentes:boolean=false;
txtPoliticas:boolean=false;
txtPlanes:boolean=false;
txtOrden:string="";
listaPeriodo:any=[];
listaPeriodoP:any=[];
modalPeriodo:boolean=false;
txtPeriodo:string='';

//Variable para mostrar el loading en la tabla
loading: boolean = true;
constructor(private sesiones:SesionUsuario, private swEstructura: SwEstructuraService, private messageService: MessageService, private mensajesg:MensajesGenerales, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService, private swPlan: SwPlanService, private swCro: SwCronogramaService) { }

async ngOnInit(){
  const datosS=await this.sesiones.obtenerDatosLogin();
  this.sesionDep=datosS.dep_nombre;
  this.sesionTipo=datosS.dep_tipo;
  this.sessionDepC=datosS.rpe_dependencia;
  this.sessionUser=datosS.rpe_persona;
  this.sessionRol=datosS.rol_nombre;
  var plan=this.route.snapshot.paramMap.get('plan');
  if(plan=="0"){
    this.txtPlan="0";
  }else{
    this.txtPlan=JSON.parse(plan || '{}');
  }
  const valores={
    rol:datosS.rpe_rol,
    opcion:this.route.snapshot.paramMap.get('opc'),
    padreop:this.route.snapshot.paramMap.get('enc')
  }
  await this.listarPlanEstrategico();
  this.listarEstructura();
  this.listarPeriodo();
  this.listarPeriodoPlan();
  const datosRol=await this.sesiones.obtenerOpcionesUsuario(valores);
  this.txtIngresar=datosRol.rop_insertar;
  this.txtModificar=datosRol.rop_modificar;
  this.txtEliminar=datosRol.rop_eliminar;
  this.items=[{label:datosRol.pop_nombre},{ label: datosRol.opc_nombre }]
  //Menu superio con enlace del home
  this.home = { icon: 'pi pi-home', routerLink: '/' };

  //Ingreso de los tipos que tiene el estado de usuario
  this.statuses = [
    { label: 'Activo', value: 1 },
    { label: 'Inactivo', value: 0 },
    { label: 'Aprobado', value: 2 }
  ];
}

async listarPlanEstrategico(){
  const dat={
    tipo:this.sesionTipo,
    codigo:this.sessionDepC
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlan.ListaPlanes(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaPlanE=datos.data;
  }else{
    this.listaPlanE=[];
  }
  if(this.txtPlan>"0"){
    for(let plan of this.listaPlanE){
      if(plan.plan_id==this.txtPlan){
        if(plan.plan_estado==2){
          this.txtPlanEstado=false;
        }else{
          this.txtPlanEstado=true;
        }
      }
    }
  }
  this.loading = false;
}

async listarEstructura(){
  const dat={
    codigo:this.txtPlan,
    tipo:1
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swEstructura.ListaEstructura(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaEstructura=datos.data;
  }else{
    this.listaEstructura=[];
  }
  this.loading = false;
}

async listarPeriodo(){
  const dat={
    tipo:1
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swCro.ListarPeriodo(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaPeriodo=datos.data;
  }else{
    this.listaPeriodo=[];
  }
  this.loading = false;
}

async listarPeriodoPlan(){
  const dat={
    perp_plan:this.txtPlan,
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swCro.ListarPeriodoPlan(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaPeriodoP=datos.data;
  }else{
    this.listaPeriodoP=[];
  }
  this.loading = false;
}

obtenerEst(event:any){
  this.txtPlan=event.value;
    for(let plan of this.listaPlanE){
      if(plan.plan_id==this.txtPlan){
        if(plan.plan_estado==2){
          this.txtPlanEstado=false;
        }else{
          this.txtPlanEstado=true;
        }
      }
    }
  this.listarEstructura();
  this.listarPeriodoPlan();
}

openNew(){
  if(this.txtIngresar){
    if(this.txtPlan=="0"){
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.SeleccionarPlan,
      });
    }else{
      this.tituloModal='Ingresar Estructura';
      this.txtCodigo=0;
      this.txtNombre="";
      this.txtIdentificador="";
      this.modalEstructura=true;
      this.txtComponentes=false;
      this.txtEjes=false;
      this.txtPoliticas=false;
      this.txtPlanes=false;
      this.txtOrden="";
      this.eliminar=false;
    }
  }else {
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.NoAutorizado,
    });
  }
}

hideDialogP(){
  this.modalEstructura=false;
}

openNewPer(){
  if(this.txtIngresar){
    if(this.txtPlan=="0"){
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.SeleccionarPlan,
      });
    }else{
      this.tituloModal='Asignar Período';
      this.txtPeriodo='';
      this.txtCodigo=0;
      this.eliminar=false;
      this.modalPeriodo=true;
    }
  }else{
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.NoAutorizado,
    });
  }
}

hideDialogPL(){
  this.modalPeriodo=false;
}

async guardarEstructura(){
  if(this.txtNombre==''|| this.txtIdentificador==''){
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.CamposVacios,
    });
  }else{
    if(this.txtCodigo===0 && !this.eliminar){
      const datosAudi = {
        aud_usuario: this.sessionUser,
        aud_proceso: 'Ingresar',
        aud_descripcion:
          'Ingresar estructura del plan estratégico con los datos: {Código: ' +
          this.txtCodigo +
          ', Nombre:' +
          this.txtNombre +
          ', Plan: ' +
          this.txtPlan +
          ', Identificador: '+
          this.txtIdentificador+
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dat:estructura= {
       est_id: this.txtCodigo,
       est_nombre:this.txtNombre,
       est_codigo:this.txtIdentificador,
       est_estado:this.txtEstado,
       est_plan:this.txtPlan,
       est_componente:this.txtComponentes,
       est_eje:this.txtEjes,
       est_politicas:this.txtPoliticas,
       est_planes:this.txtPlanes,
       est_orden:this.txtOrden,
       auditoria: datosAudi
      };
      const datos = await new Promise<any>((resolve) =>
        this.swEstructura.IngresarEstructura(dat).subscribe((translated) => {
          resolve(translated);
        })
      );
      if (datos.success) {
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.IngresadoCorrectamente,
        });
        this.modalEstructura=false;
        this.listarEstructura();
      } else {
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
          'Modificar estructura del plan estratégico con los datos: {Código: ' +
          this.txtCodigo +
          ', Nombre:' +
          this.txtNombre +
          ', Plan: ' +
          this.txtPlan +
          ', Identificador: '+
          this.txtIdentificador+
          ', Estado: '+
          this.txtEstado+
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dat:estructura= {
       est_id: this.txtCodigo,
       est_nombre:this.txtNombre,
       est_codigo:this.txtIdentificador,
       est_estado:this.txtEstado,
       est_plan:this.txtPlan,
       est_componente:this.txtComponentes,
       est_eje:this.txtEjes,
       est_politicas:this.txtPoliticas,
       est_planes:this.txtPlanes,
       est_orden:this.txtOrden,
       auditoria: datosAudi
      };
      const datos = await new Promise<any>((resolve) =>
        this.swEstructura.ModificarEstructura(dat).subscribe((translated) => {
          resolve(translated);
        })
      );
      if (datos.success) {
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.ModificadoCorrectamente,
        });
        this.modalEstructura=false;
        this.listarEstructura();
      } else {
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
          'Eliminar estructura del plan estratégico con los datos: {Código: ' +
          this.txtCodigo +
          ', Nombre:' +
          this.txtNombre +
          ', Plan: ' +
          this.txtPlan +
          ', Identificador: '+
          this.txtIdentificador+
          ', Estado: '+
          this.txtEstado+
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dat:estructura= {
       est_id: this.txtCodigo,
       est_nombre:this.txtNombre,
       est_codigo:this.txtIdentificador,
       est_estado:this.txtEstado,
       est_plan:this.txtPlan,
       est_componente:this.txtComponentes,
       est_eje:this.txtEjes,
       est_politicas:this.txtPoliticas,
       est_planes:this.txtPlanes,
       est_orden:this.txtOrden,
       auditoria: datosAudi
      };
      const datos = await new Promise<any>((resolve) =>
        this.swEstructura.EliminarEstructura(dat).subscribe((translated) => {
          resolve(translated);
        })
      );
      if (datos.success) {
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.EliminadoCorrectamente,
        });
        this.modalEstructura=false;
        this.listarEstructura();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: this.mensajesg.ErrorProceso,
        });
      }
    }
  }
}

async guardarPlan(){
  if(this.txtPeriodo==''){
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.CamposVacios,
    });
  }else{
    if(this.txtCodigo===0 && !this.eliminar){
      const datosAudi = {
        aud_usuario: this.sessionUser,
        aud_proceso: 'Ingresar',
        aud_descripcion:
          'Ingresar período plan con los datos: {Plan estratégico: ' +
          this.txtPlan +
          ', Período:' +
          this.txtPeriodo +
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dat= {
       perp_plan: this.txtPlan,
       perp_periodo:this.txtPeriodo,
       auditoria: datosAudi
      };
      const datos = await new Promise<any>((resolve) =>
        this.swCro.IngresarPeriodoPlan(dat).subscribe((translated) => {
          resolve(translated);
        })
      );
      if (datos.success) {
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.IngresadoCorrectamente,
        });
        this.modalPeriodo=false;
        this.listarPeriodoPlan();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: 'Solo puede existir un período activo, verifique los datos ingresados',
        });
      }
    }else if(this.txtCodigo>0 && !this.eliminar){
      const datosAudi = {
        aud_usuario: this.sessionUser,
        aud_proceso: 'Modificar',
        aud_descripcion:
          'Modificar período plan estratégico con los datos: {Periodo:' +
          this.txtPeriodo +
          ', Plan: ' +
          this.txtPlan +
          ', Estado: '+
          this.txtEstado+
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dat= {
       perp_periodo: this.txtPeriodo,
       perp_plan:this.txtPlan,
       perp_estado:this.txtEstado,
       auditoria: datosAudi
      };
      const datos = await new Promise<any>((resolve) =>
        this.swCro.ModificarPeriodoPlan(dat).subscribe((translated) => {
          resolve(translated);
        })
      );
      if (datos.success) {
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.ModificadoCorrectamente,
        });
        this.modalPeriodo=false;
        this.listarPeriodoPlan();
      } else {
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
          'Eliminar período de  plan estratégico con los datos: {Plan: ' +
          this.txtPlan +
          ', Estado: '+
          this.txtEstado+
          ', Periodo: '+
          this.txtPeriodo+
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dat= {
        perp_periodo: this.txtPeriodo,
        perp_plan:this.txtPlan,
        perp_estado:this.txtEstado,
        auditoria: datosAudi
      };
      const datos = await new Promise<any>((resolve) =>
        this.swCro.EliminarPeriodoPlan(dat).subscribe((translated) => {
          resolve(translated);
        })
      );
      if (datos.success) {
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.EliminadoCorrectamente,
        });
        this.modalPeriodo=false;
        this.listarPeriodoPlan();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: this.mensajesg.ErrorProceso,
        });
      }
    }
  }
}

modificarEst(est:estructura){
  if(this.txtModificar){
    this.tituloModal="Modificar Estructura";
    this.txtCodigo=est.est_id;
    this.txtNombre=est.est_nombre;
    this.txtIdentificador=est.est_codigo;
    this.txtEstado=est.est_estado;
    this.modalEstructura=true;
    this.txtEjes=est.est_eje;
    this.txtComponentes=est.est_componente;
    this.txtPoliticas=est.est_politicas;
    this.txtPlanes=est.est_planes;
    this.txtOrden=est.est_orden;
    this.eliminar=false;
  }else{
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.NoAutorizado,
    });
  }
}

eliminarEst(est:estructura){
  if(this.txtEliminar){
    this.tituloModal="Eliminar Estructura";
    this.txtCodigo=est.est_id;
    this.txtNombre=est.est_nombre;
    this.txtIdentificador=est.est_codigo;
    this.txtEstado=est.est_estado;
    this.modalEstructura=true;
    this.eliminar=true;
  }else{
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.NoAutorizado,
    });
  }
}

modificarPeriodo(per:any){
  if(this.txtModificar){
    this.tituloModal="Modificar Período Plan";
    this.txtPeriodo=per.perp_periodo;
    this.txtEstado=per.perp_estado;
    this.modalPeriodo=true;
    this.txtCodigo=1;
    this.eliminar=false;
  }else{
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.NoAutorizado,
    });
  }
}

eliminarPeriodo(per:any){
  if(this.txtEliminar){
    this.tituloModal="Eliminar Período Plan";
    this.txtPeriodo=per.perp_periodo;
    this.txtEstado=per.perp_estado;
    this.txtCodigo=1;
    this.modalPeriodo=true;
    this.eliminar=true;
  }else{
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.NoAutorizado,
    });
  }
}
}
