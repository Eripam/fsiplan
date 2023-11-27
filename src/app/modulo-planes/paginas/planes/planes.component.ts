import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DatosCorreo } from 'src/app/Herramientas/Correo/confOneDrive';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { listaI, planes } from '../../Interface/planes';
import { SwPlanService } from '../../ServiciosWeb/planes/sw-plan.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PlanesComponent implements OnInit {

  // Menú del home
  items: MenuItem[] = [];
  home!: MenuItem;
  //Variable para los estados de usuario
  statuses!: any[];
  //Lista prospectiva
  listaPlanes: any[]=[];
  listaTPlanes:any[]=[];
  sesionDep:string='';
  sesionTipo:number=0;
  sessionDepC:number=0;
  //Variables de modales
  modalPlan!:boolean;
  tituloModal:string='';
  txtNombre:string='';
  txtFechaI: string='';
  txtFechaF:string='';
  txtEstado:string='';
  txtTipoPlan:number=0;
  txtCodigo:number=0;
  sessionUser:string='';
  sessionRol:string='';
  txtIngresar:boolean=false;
  txtModificar:boolean=false;
  txtEliminar:boolean=false;
  txtProspectiva:number=0;
  txtCodigoV:number=0;
  txtPlanEst:boolean=false;
  txtPOA:boolean=false;
  //lista tipo dependencia
  eliminar:boolean=false;
  fechaI: string='';
  fechaF: string='';
  txtAnio:number=0;
  modalPlanAprobar:boolean=false;
  listaPlanesSelect:any=[];
  banPlan:boolean=false;
  txtBotonG:boolean=true;
  txtDependencia:string="";
  tipo:string="application/pdf";
  modalReporte:boolean=false;
  url:string="";
  
  //Variable para mostrar el loading en la tabla
  loading: boolean = true;
  constructor(private sesiones:SesionUsuario, private messageService: MessageService, private mensajesg:MensajesGenerales, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService, private swPlanes:SwPlanService) { }

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
    this.listarPlanes();
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

  async listarTipoPlanes(){
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanes.ListarTipoPlan().subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.listaTPlanes=datos.data;
    }else{
      this.listaTPlanes=[];
    }
    this.loading = false;
  }

  async listarPlanes(){
    const dat={
      tipo:1
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlanes.ListarPlanes(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.listaPlanes=datos.data;
    }else{
      this.listaPlanes=[];
    }
    this.loading = false;
  }

  nuevoPlan(){
    this.tituloModal="Agregar Plan";
    this.listarTipoPlanes();
    this.txtNombre="";
    this.txtCodigo=0;
    this.txtFechaF="";
    this.txtFechaI="";
    this.eliminar=false;
    this.txtTipoPlan=0;
    this.modalPlan=true;
  }

  async guardarPlan(){
    if(this.txtNombre=='' || this.txtFechaI==''|| this.txtFechaF=='' || this.txtTipoPlan==0){
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
              'Ingresar plan con los datos: {Código: ' +
              this.txtCodigo +
              ', Nombre:' +
              this.txtNombre +
              ', Fecha Inicio: ' +
              this.txtFechaI +
              ', Fecha Fin: '+
              this.txtFechaF+
              ', Tipo: ' +
              this.txtTipoPlan +
              ', Plan Estrategico: '+
              this.txtPlanEst+
              ', Plan Operativo Anual: '+
              this.txtPOA+
              '}',
            aud_rol: this.sessionRol,
            aud_dependencia: this.sessionDepC,
          };
          const dat:planes= {
            plan_id:this.txtCodigo,
            plan_nombre: this.txtNombre,
            plan_fecha_inicio: this.txtFechaI,
            plan_fecha_fin: this.txtFechaF,
            auditoria: datosAudi,
            plan_estado:this.txtEstado,
            plan_tipoplan:this.txtTipoPlan,
            plan_planest:this.txtPlanEst,
            plan_poa:this.txtPOA
          };
          const datos = await new Promise<any>((resolve) =>
            this.swPlanes.IngresarPlanes(dat).subscribe((translated) => {
              resolve(translated);
            })
          );
          if (datos.success) {
            this.messageService.add({
              severity: 'success',
              summary: this.mensajesg.CabeceraExitoso,
              detail: this.mensajesg.IngresadoCorrectamente,
            });
            this.modalPlan=false;
            this.listarPlanes();
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
            'Modificar plan con los datos: {Código: ' +
            this.txtCodigo +
            ', Nombre:' +
            this.txtNombre +
            ', Fecha Inicio: ' +
            this.txtFechaI +
            ', Fecha Fin: '+
            this.txtFechaF+
            ', Tipo: ' +
            this.txtTipoPlan +
            ', Plan Estrategico: '+
            this.txtPlanEst+
            ', Plan Operativo Anual: '+
            this.txtPOA+
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const dat:planes= {
          plan_id:this.txtCodigo,
          plan_nombre: this.txtNombre,
          plan_fecha_inicio: this.txtFechaI,
          plan_fecha_fin: this.txtFechaF,
          auditoria: datosAudi,
          plan_estado:this.txtEstado,
          plan_planest:this.txtPlanEst,
          plan_tipoplan:this.txtTipoPlan,
          plan_poa:this.txtPOA
        };
        console.log(dat);
        const datos = await new Promise<any>((resolve) =>
          this.swPlanes.ModificarPlanes(dat).subscribe((translated) => {
            resolve(translated);
          })
        );
        if (datos.success) {
          this.messageService.add({
            severity: 'success',
            summary: this.mensajesg.CabeceraExitoso,
            detail: this.mensajesg.ModificadoCorrectamente,
          });
          this.modalPlan=false;
          this.listarPlanes();
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
              'Eliminar plan con los datos: {Código: ' +
              this.txtCodigo +
              ', Nombre:' +
              this.txtNombre +
              ', Fecha Inicio: ' +
              this.txtFechaI +
              ', Fecha Fin: '+
              this.txtFechaF+
              ', Tipo: ' +
              this.txtTipoPlan +
              ', Plan Estrategico: '+
              this.txtPlanEst+
              ', Plan Operativo Anual: '+
              this.txtPOA+
              '}',
            aud_rol: this.sessionRol,
            aud_dependencia: this.sessionDepC,
          };
          const dat:planes= {
            plan_id:this.txtCodigo,
            plan_nombre: this.txtNombre,
            plan_fecha_inicio: this.txtFechaI,
            plan_fecha_fin: this.txtFechaF,
            auditoria: datosAudi,
            plan_estado:this.txtEstado,
            plan_planest:this.txtPlanEst,
            plan_tipoplan:this.txtTipoPlan,
            plan_poa:this.txtPOA
          };
          const datos = await new Promise<any>((resolve) =>
            this.swPlanes.EliminarPlanes(dat).subscribe((translated) => {
              resolve(translated);
            })
          );
          if (datos.success) {
            this.messageService.add({
              severity: 'success',
              summary: this.mensajesg.CabeceraExitoso,
              detail: this.mensajesg.EliminadoCorrectamente,
            });
            this.modalPlan=false;
            this.listarPlanes();
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

  modificarPlan(plan:planes){
    if(this.txtModificar){
      this.tituloModal="Modificar Plan";
      this.txtCodigo=plan.plan_id;
      this.txtNombre=plan.plan_nombre;
      var fechai=new Date(plan.plan_fecha_inicio);
      var mes=fechai.getMonth()+1;
      this.txtFechaI=fechai.getDate() + '/' + mes + '/' + fechai.getFullYear();
      var fechaf=new Date(plan.plan_fecha_fin);
      var mesf=fechaf.getMonth()+1;
      this.txtFechaF=fechaf.getDate() + '/' + mesf + '/' + fechaf.getFullYear();
      this.txtEstado=plan.plan_estado;
      this.modalPlan=true;
      this.eliminar=false;
      this.txtTipoPlan=plan.plan_tipoplan;
      this.txtPlanEst=plan.plan_planest;
      this.txtPOA=plan.plan_poa;
      this.fechaI=plan.plan_fecha_inicio;
      this.fechaF=plan.plan_fecha_fin;
      this.listarTipoPlanes();
    }else{
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  eliminarPlan(plan:planes){
    if(this.txtEliminar){
      this.tituloModal="Eliminar Plan";
      this.txtCodigo=plan.plan_id;
      this.txtNombre=plan.plan_nombre;
      var fechai=new Date(plan.plan_fecha_inicio);
      var mes=fechai.getMonth()+1;
      this.txtFechaI=fechai.getDate() + '/' + mes + '/' + fechai.getFullYear();
      var fechaf=new Date(plan.plan_fecha_fin);
      var mesf=fechaf.getMonth()+1;
      this.txtFechaF=fechaf.getDate() + '/' + mesf + '/' + fechaf.getFullYear();
      this.txtEstado=plan.plan_estado;
      this.eliminar=true;
      this.modalPlan=true;
      this.txtTipoPlan=plan.plan_tipoplan;
      this.txtPlanEst=plan.plan_planest;
      this.txtPOA=plan.plan_poa;
      this.listarTipoPlanes();
    }else{
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  irpagina(plan:planes){
    this.router.navigate(['planes/estructura/23/'+plan.plan_id+'/'+this.route.snapshot.paramMap.get('enc')]);
  }
}
