import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { listaI, objetivo } from '../../Interface/planEstrategico';
import { SwCronogramaService } from '../../ServiciosWeb/Cronograma/swCronograma.service';
import { SwPlanService } from '../../ServiciosWeb/Plan/swPlan.service';
import { periodo } from '../../Interface/planEstrategico';
import { ThrowStmt } from '@angular/compiler';
import { SwPlanNacionalService } from '../../ServiciosWeb/PlanNacional/swPlanNacional.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ConfiguracionComponent implements OnInit {
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
modalPeriodo!:boolean;
tituloModal:string='';
txtNombre:string='';
txtEstado:string='';
txtCodigo:number=0;
sessionUser:string='';
sessionRol:string='';
txtIngresar:boolean=false;
txtModificar:boolean=false;
txtEliminar:boolean=false;
listaPlanE:any=[];
listaPeriodo:any=[];
eliminar:boolean=false;
txtPlanEstado:boolean=true;
txtMaximo:number=0;
//Variable para mostrar el loading en la tabla
loading: boolean = true;

constructor(private sesiones:SesionUsuario, private messageService: MessageService, private mensajesg:MensajesGenerales, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService, private swPlan: SwPlanService, private swPeriodo: SwCronogramaService, private swPlanN: SwPlanNacionalService) { }

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
  this.items=[{label:datosRol.pop_nombre},{ label: datosRol.opc_nombre }]
  //Menu superio con enlace del home
  this.home = { icon: 'pi pi-home', routerLink: '/' };
  this.listarPeriodo();
  //Ingreso de los tipos que tiene el estado de usuario
  this.statuses = [
    { label: 'Activo', value: 1 },
    { label: 'Inactivo', value: 0 },
    { label: 'Aprobado', value: 2 }
  ];
}

hideDialogP(){
  this.modalPeriodo=false;
}

async guardarPeriodo(){
  if(this.txtNombre=='' || this.txtNombre==null || this.txtMaximo==0){
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.CamposVacios
    });
  }else{
    if(this.txtCodigo==0 && !this.eliminar){
      const datosAudi = {
        aud_usuario: this.sessionUser,
        aud_proceso: 'Ingresar',
        aud_descripcion:
          'Modificar período con los datos: {Código: '+
          this.txtCodigo+
          ', Nombre:' +
          this.txtNombre +
          ', Máximo: ' +
          this.txtMaximo +
          ', Estado: ' +
          this.txtEstado +
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dat:periodo={
        per_id: this.txtCodigo,
        per_nombre:this.txtNombre,
        per_maximo:this.txtMaximo,
        per_estado:this.txtEstado,
        auditoria:datosAudi
      }
      const datos:listaI=await new Promise<listaI>((resolve)=> this.swPeriodo.IngresarPeriodo(dat).subscribe((translated)=> { resolve(translated)}));
      console.log(datos);
      if(datos.success){
        this.modalPeriodo=false;
        this.listarPeriodo();
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
          'Modificar período con los datos: {Código: '+
          this.txtCodigo+
          ', Nombre:' +
          this.txtNombre +
          ', Máximo: ' +
          this.txtMaximo +
          ', Estado: ' +
          this.txtEstado +
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dat:periodo={
        per_id: this.txtCodigo,
        per_nombre:this.txtNombre,
        per_maximo:this.txtMaximo,
        per_estado:this.txtEstado,
        auditoria:datosAudi
      }
      const datos:listaI=await new Promise<listaI>((resolve)=> this.swPeriodo.ModificarPeriodo(dat).subscribe((translated)=> { resolve(translated)}));
      if(datos.success){
        this.modalPeriodo=false;
        this.listarPeriodo();
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
          'Eliminar período con los datos: {Código: '+
          this.txtCodigo+
          ', Nombre:' +
          this.txtNombre +
          ', Máximo: ' +
          this.txtMaximo +
          ', Estado: ' +
          this.txtEstado +
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dat:periodo={
        per_id: this.txtCodigo,
        per_nombre:this.txtNombre,
        per_maximo:this.txtMaximo,
        per_estado:this.txtEstado,
        auditoria:datosAudi
      }
      const datos:listaI=await new Promise<listaI>((resolve)=> this.swPeriodo.EliminarPeriodo(dat).subscribe((translated)=> { resolve(translated)}));
      if(datos.success){
        this.modalPeriodo=false;
        this.listarPeriodo();
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

async listarPeriodo(){
  const dat={
    tipo:2
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swPeriodo.ListarPeriodo(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaPeriodo=datos.data;
  }else{
    this.listaPeriodo=[];
  }
  this.loading = false;
}

openNew(){
  if(this.txtIngresar){
    this.tituloModal='Ingresar Período';
    this.txtCodigo=0;
    this.txtNombre='';
    this.txtMaximo=0;
    this.eliminar=false;
    this.modalPeriodo=true;
  }else {
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.NoAutorizado,
    });
  }
}

modificarPer(per:periodo){
  if(this.txtModificar){
  this.tituloModal='Modificar Período';
  this.txtCodigo=per.per_id;
  this.txtNombre=per.per_nombre;
  this.txtMaximo=per.per_maximo;
  this.txtEstado=per.per_estado;
  this.modalPeriodo=true;
  this.eliminar=false;
}else{
  this.messageService.add({
    severity: 'error',
    summary: this.mensajesg.CabeceraError,
    detail: this.mensajesg.NoAutorizado,
  });
}
}

eliminarPer(per:periodo){
  if(this.txtEliminar){
    this.tituloModal='Eliminar Período';
    this.txtCodigo=per.per_id;
    this.txtNombre=per.per_nombre;
    this.txtMaximo=per.per_maximo;
    this.txtEstado=per.per_estado;
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
