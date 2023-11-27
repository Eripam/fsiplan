import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { SwEstructuraService } from '../../ServiciosWeb/estructura/sw-estructura.service';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SwPlanService } from '../../ServiciosWeb/planes/sw-plan.service';
import { estructura, listaI } from '../../Interface/planes';

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
listaEstructuraPlan:any[]=[];
listaEstructuraPlanS:any[]=[];
listaEstructuraPlanD:any[]=[];
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
listaPlanE:any=[];
txtIdentificador:string="";
txtDepende:number=0;
eliminar:boolean=false;
txtTipo:string='';
txtAlineacion:boolean=false;
listaEje:any=[];
listaEstructuraSelect:any=[];
txtEje:string="";
Eje:boolean=false;
maximo:number=0;
anio:number=0;
fechai:string='';
fechaf:string='';
txtOrden:string="";
displayModal:boolean=false;
txtSubtitulo:string='';
banPlan:boolean=false;
txtPlanP:number=0;
//Variable para mostrar el loading en la tabla
loading: boolean = true;
modalResponsable:boolean=false;
listaDepResponsable:any=[];
listaDepCoresponsables:any=[];
txtResponsables:any=[];
txtCoresponsables:any=[];
listaResponsable:any=[];
listaCoresponsable:any=[];
listaDep:any=[];
constructor(private sesiones:SesionUsuario, private swEstructura: SwEstructuraService, private messageService: MessageService, private mensajesg:MensajesGenerales, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService, private swPlan: SwPlanService) { }

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
  var plan=this.route.snapshot.paramMap.get('plan');
  if(plan=="0"){
    this.txtPlan="0";
  }else{
    this.txtPlan=JSON.parse(plan || '{}');
  }
  this.listarPlan();
  this.listarEstructura();
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

async listarPlan(){
  const dat={
    tipo:2,
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlan.ListarPlanes(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaPlanE=datos.data;
  }else{
    this.listaPlanE=[];
  }
  this.loading = false;
}

async listarEstructura(){
  const dat={
    codigo:this.txtPlan,
    tipo:1
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swEstructura.ListarEstructuraPlan(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaEstructura=datos.data;
  }else{
    this.listaEstructura=[];
  }
  this.loading = false;
}

obtenerPlan(event:any){
  this.txtPlan=event.value;
  this.listarEstructura();
}

nuevoPlan(){
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

modificarEst(datos:any){

}

eliminarEst(datos:any){

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
          ', Nivel de alineación: '+
          this.txtAlineacion+
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
       est_orden:this.txtOrden,
       auditoria: datosAudi,
       est_muestra:this.txtAlineacion
      };
      const datos = await new Promise<any>((resolve) =>
        this.swEstructura.IngresarEstructuraP(dat).subscribe((translated) => {
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
          ', Nivel de alineación: '+
          this.txtAlineacion+
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
        est_orden:this.txtOrden,
        auditoria: datosAudi,
        est_muestra:this.txtAlineacion
      };
      const datos = await new Promise<any>((resolve) =>
        this.swEstructura.ModificarEstructuraP(dat).subscribe((translated) => {
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
          ', Nivel de alineación: '+
          this.txtAlineacion+
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
        est_orden:this.txtOrden,
        auditoria: datosAudi,
        est_muestra:this.txtAlineacion
      };
      const datos = await new Promise<any>((resolve) =>
        this.swEstructura.EliminarEstructuraP(dat).subscribe((translated) => {
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

openNew(estructura:any){
  if(this.txtIngresar){
    if(this.txtPlan=="0" || this.txtPlan==""){
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.SeleccionarPlan,
      });
    }else{
      this.tituloModal='Ingresar '+estructura.est_nombre;
      this.txtCodigo=0;
      this.txtNombre="";
      this.txtIdentificador="";
      this.txtEje="";
      this.txtTipo=estructura.est_id;
      this.txtDepende=0;
      this.modalEstructura=true;
      this.txtAlineacion=false;
      this.Eje=estructura.est_eje;
      this.eliminar=false;
      this.listaEstructuraSelect=[];
    }
  }else {
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.NoAutorizado,
    });
  }
}

editarEstructura(est:any, estructura:any){
  if(this.txtModificar){
    this.tituloModal='Modificar '+estructura.est_nombre;
    this.txtCodigo=est.eplan_id;
    this.txtNombre=est.eplan_nombre;
    this.txtIdentificador=est.eplan_codigo;
    this.Eje=estructura.est_eje;
    this.txtEje=est.eje_id;
    this.txtTipo=est.eplan_estructura;
    this.modalEstructura=true;
    this.txtEstado=est.eplan_estado;
    this.eliminar=false;
  }else {
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.NoAutorizado,
    });
  }
}

eliminarEstructura(est:any){
  if(this.txtEliminar){
    this.tituloModal='Eliminar';
    this.txtCodigo=est.eplan_id;
    this.txtNombre=est.eplan_nombre;
    this.txtIdentificador=est.eplan_codigo;
    this.txtTipo=est.eplan_estructura;
    this.modalEstructura=true;
    this.txtEstado=est.eplan_estado;
    this.eliminar=true;
}else {
  this.messageService.add({
    severity: 'error',
    summary: this.mensajesg.CabeceraError,
    detail: this.mensajesg.NoAutorizado,
  });
}
}
}
