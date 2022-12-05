import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { archivo, listaI, plan_estrategico } from '../../Interface/planEstrategico';
import { SwPlanService } from '../../ServiciosWeb/Plan/swPlan.service';
import * as moment from 'moment';
import { swDependencia } from 'src/app/modulo-seguridad/ServiciosWeb/Dependencia/swDependencia.service';
import { DatosCorreo } from 'src/app/Herramientas/Correo/confOneDrive';
import { SwArchivoPlanService } from '../../ServiciosWeb/ArchivosPlan/swArchivoPlan.service';
import { resolve } from 'dns';
declare function getDatos():any;
declare function getTokenGenerado(token:any): any;
declare function onUpload(file:any, ruta:any, cedula:any): any;
declare function eliminarData(ruta:any, archivo:any): any;
declare function cargarData(ruta:any, archivo:any): any;

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class PlanComponent implements OnInit {

  // Menú del home
  items: MenuItem[] = [];
  home!: MenuItem;
  //Variable para los estados de usuario
  statuses!: any[];
  //Lista prospectiva
  listaPlanes: any[]=[];
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
  txtAlineacion: number=0;
  txtCodigo:number=0;
  sessionUser:string='';
  sessionRol:string='';
  txtIngresar:boolean=false;
  txtModificar:boolean=false;
  txtEliminar:boolean=false;
  txtVision:string='';
  txtMision:string='';
  txtProspectiva:number=0;
  txtCodigoV:number=0;
  //lista tipo dependencia
  listaDep: any []=[];
  eliminar:boolean=false;
  fechaI: string='';
  fechaF: string='';
  txtAnio:number=0;
  modalPlanAprobar:boolean=false;
  txtArchivo:any="";
  listaPlanesSelect:any=[];
  banPlan:boolean=false;
  txtPlanEst: string="";
  txtBotonG:boolean=true;
  txtDependencia:string="";
  tipo:string="application/pdf";
  modalReporte:boolean=false;
  url:string="";
  
  //Variable para mostrar el loading en la tabla
  loading: boolean = true;
  constructor(private sesiones:SesionUsuario, private swPlan: SwPlanService, private messageService: MessageService, private mensajesg:MensajesGenerales, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService, private DependenciaSer: swDependencia, private datosCorreo: DatosCorreo, private swArchivos: SwArchivoPlanService) { }

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
    this.listarDependencias();
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

  async listarPlanes(){
    const dat={
      tipo:this.sesionTipo,
      codigo:this.sessionDepC
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlan.ListaPlanesCompletos(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.listaPlanes=datos.data;
    }else{
      this.listaPlanes=[];
    }
    this.loading = false;
  }

  async listarPlanEstrategico(){
    const dat={
      tipo:0,
      codigo:this.sessionDepC
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlan.ListaPlanes(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.listaPlanesSelect=datos.data;
    }else{
      this.listaPlanesSelect=[];
    }
    this.loading = false;
  }


  openNew(){
    if(this.txtIngresar){
      this.tituloModal='Ingresar Plan Estratégico';
      this.modalPlan=true;
      this.txtCodigo=0;
      this.txtNombre="";
      this.txtMision="";
      this.txtVision="";
      this.txtFechaF="";
      this.txtFechaI="";
      this.txtAlineacion=0;
      this.eliminar=false;
      if(this.sessionDepC==1){
        this.banPlan=false;
      }else{
        this.banPlan=true;
        this.listarPlanEstrategico();
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  hideDialogP(){
    this.modalPlan=false;
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

  async guardarPlan(){
    if(this.txtNombre=='' || this.txtVision=='' || this.txtMision=='' || this.txtFechaI==''|| this.txtFechaF==''){
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.CamposVacios,
      });
    }else{
      if(this.txtCodigo===0 && !this.eliminar){
        var an1, an2;
        for(let plan of this.listaPlanesSelect){
          if(this.txtAlineacion==plan.plan_id){
            an1=plan.plan_fecha_inicio;
            an2=plan.plan_fecha_fin;
          }
        }
        if((moment(an1).format()<=moment(this.txtFechaI).format() && moment(an2).format()>=moment(this.txtFechaF).format() && this.txtAlineacion>0) || this.txtAlineacion==0){
          var anio1=moment(this.txtFechaF).format('YYYY');
          var anio2=moment(this.txtFechaI).format('YYYY');
          var anio=Number(anio1)-Number(anio2)+1;
          const datosAudi = {
            aud_usuario: this.sessionUser,
            aud_proceso: 'Ingresar',
            aud_descripcion:
              'Ingresar plan estratégico con los datos: {Código: ' +
              this.txtCodigo +
              ', Nombre:' +
              this.txtNombre +
              ', Visión: ' +
              this.txtVision +
              ', Misión: '+
              this.txtMision+
              ', Fecha Inicio: ' +
              this.txtFechaI +
              ', Fecha Fin: '+
              this.txtFechaF+
              ', Dependencia: ' +
              this.sessionDepC +
              ', Alineado con: '+
              this.txtAlineacion+
              '}',
            aud_rol: this.sessionRol,
            aud_dependencia: this.sessionDepC,
          };
          const dat:plan_estrategico= {
            plan_id:this.txtCodigo,
            plan_nombre: this.txtNombre,
            plan_vision: this.txtVision,
            plan_mision: this.txtMision,
            plan_fecha_inicio: this.txtFechaI,
            plan_fecha_fin: this.txtFechaF,
            plan_dependencia: this.sessionDepC,
            auditoria: datosAudi,
            plan_anio: anio,
            plan_planid:this.txtAlineacion,
            plan_estado:this.txtEstado
          };
          const datos = await new Promise<any>((resolve) =>
            this.swPlan.IngresarPlanes(dat).subscribe((translated) => {
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
        }else{
          this.messageService.add({
            severity: 'error',
            summary: this.mensajesg.CabeceraError,
            detail: 'Debe ingresar fechas acorder al plan alineado',
          });
        }
      }else if(this.txtCodigo>0 && !this.eliminar){
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Modificar',
          aud_descripcion:
            'Modificar plan estratégico con los datos: {Código: ' +
            this.txtCodigo +
            ', Nombre:' +
            this.txtNombre +
            ', Visión: ' +
            this.txtVision +
            ', Misión: '+
            this.txtMision+
            ', Fecha Inicio: ' +
            this.txtFechaI +
            ', Fecha Fin: '+
            this.txtFechaF+
            ', Dependencia: ' +
            this.sessionDepC +
            ', Alineado con: '+
            this.txtAlineacion+
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        var fechaf=new Date(this.fechaF);
        var fechai=new Date(this.fechaI);
        var anio1=fechaf.getFullYear().toPrecision();
        var anio2=fechai.getFullYear().toPrecision();
        var anio=Number(anio1)-Number(anio2)+1;
        const dat:plan_estrategico= {
          plan_id:this.txtCodigo,
          plan_nombre: this.txtNombre,
          plan_vision: this.txtVision,
          plan_mision: this.txtMision,
          plan_fecha_inicio: this.txtFechaI,
          plan_fecha_fin: this.txtFechaF,
          plan_dependencia: this.sessionDepC,
          auditoria: datosAudi,
          plan_anio: anio,
          plan_estado:this.txtEstado
        };
        const datos = await new Promise<any>((resolve) =>
          this.swPlan.ModificarPlanes(dat).subscribe((translated) => {
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
        const val={
          codigo:this.txtCodigo
        }
        const validacion=await new Promise<any>((resolve)=>this.swPlan.ValidarPlanes(val).subscribe((translated)=>{resolve(translated)}));
        if(validacion.data){
          this.messageService.add({
            severity: 'error',
            summary: this.mensajesg.CabeceraError,
            detail: this.mensajesg.Loestanusando,
          });
        }else{
          const datosAudi = {
            aud_usuario: this.sessionUser,
            aud_proceso: 'Eliminar',
            aud_descripcion:
              'Eliminar plan estratégico con los datos: {Código: ' +
              this.txtCodigo +
              ', Nombre:' +
              this.txtNombre +
              ', Visión: ' +
              this.txtVision +
              ', Misión: '+
              this.txtMision+
              ', Fecha Inicio: ' +
              this.txtFechaI +
              ', Fecha Fin: '+
              this.txtFechaF+
              ', Dependencia: ' +
              this.sessionDepC +
              ', Alineado con: '+
              this.txtAlineacion+
              '}',
            aud_rol: this.sessionRol,
            aud_dependencia: this.sessionDepC,
          };
          var anio1=moment(this.txtFechaF).format('YYYY');
          var anio2=moment(this.txtFechaI).format('YYYY');
          var anio=Number(anio1)-Number(anio2)+1;
          const dat:plan_estrategico= {
            plan_id:this.txtCodigo,
            plan_nombre: this.txtNombre,
            plan_vision: this.txtVision,
            plan_mision: this.txtMision,
            plan_fecha_inicio: this.txtFechaI,
            plan_fecha_fin: this.txtFechaF,
            plan_dependencia: this.sessionDepC,
            auditoria: datosAudi,
            plan_anio: anio,
            plan_estado:this.txtEstado
          };
          const datos = await new Promise<any>((resolve) =>
            this.swPlan.EliminarPlanes(dat).subscribe((translated) => {
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
  }

  modificarPlan(plan:plan_estrategico){
    if(this.txtModificar){
      this.tituloModal="Modificar Plan Estratégico";
      this.txtCodigo=plan.plan_id;
      this.txtNombre=plan.plan_nombre;
      var fechai=new Date(plan.plan_fecha_inicio);
      var mes=fechai.getMonth()+1;
      this.txtFechaI=fechai.getDate() + '/' + mes + '/' + fechai.getFullYear();
      var fechaf=new Date(plan.plan_fecha_fin);
      var mesf=fechaf.getMonth()+1;
      this.txtFechaF=fechaf.getDate() + '/' + mesf + '/' + fechaf.getFullYear();
      this.txtVision=plan.plan_vision;
      this.txtMision=plan.plan_mision;
      this.txtEstado=plan.plan_estado;
      this.modalPlan=true;
      this.eliminar=false;
      this.fechaI=plan.plan_fecha_inicio;
      this.fechaF=plan.plan_fecha_fin;
    }else{
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  eliminarPlan(plan:plan_estrategico){
    if(this.txtEliminar){
      this.tituloModal="Eliminar Plan Estratégico";
      this.txtCodigo=plan.plan_id;
      this.txtNombre=plan.plan_nombre;
      var fechai=new Date(plan.plan_fecha_inicio);
      var mes=fechai.getMonth()+1;
      this.txtFechaI=fechai.getDate() + '/' + mes + '/' + fechai.getFullYear();
      var fechaf=new Date(plan.plan_fecha_fin);
      var mesf=fechaf.getMonth()+1;
      this.txtFechaF=fechaf.getDate() + '/' + mesf + '/' + fechaf.getFullYear();
      this.txtVision=plan.plan_vision;
      this.txtMision=plan.plan_mision;
      this.txtEstado=plan.plan_estado;
      this.eliminar=true;
      this.modalPlan=true;
    }else{
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  irpagina(plan:plan_estrategico){
    this.router.navigate(['estrategico/estructura/16/'+plan.plan_id+'/'+this.route.snapshot.paramMap.get('enc')]);
  }

  aprobarPlan(plan:plan_estrategico){
    this.tituloModal='Aprobar Plan';
    this.txtPlanEst=plan.plan_nombre;
    this.txtCodigo=plan.plan_id;
    for(let dep of this.listaDep){
      if(dep.dep_codigo==plan.plan_dependencia){
        this.txtDependencia=dep.dep_nombre;
      }
    }
    this.modalPlanAprobar=true;
  }

  hideDialogAp(){
    this.modalPlanAprobar=false;
  }

  async OnDriveAlmacenar() {
    const dat={
      idAplicacion: 1,
      jwtsecret: this.datosCorreo.clavesecreta,
      activo: "true"
    }
    const datosToken = await new Promise<any>(resolve => this.swArchivos.ObtenerTokenArchivos(dat).subscribe(translated => { resolve(translated) }));
    if(datosToken.success){
      await this.serviciobuffer(datosToken.token);
    }
  }

  async capturarFile(event:any): Promise<any> {
    const MAXIMO_TAMANIO_BYTES = 5000000
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      if(event.target.files[0].size>MAXIMO_TAMANIO_BYTES){
        this.txtBotonG=false;
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: "El tamaño de archivo permitido es de "+MAXIMO_TAMANIO_BYTES/1000000+"MB",
        });
      }else if(event.target.files[0].type=="application/pdf"){
        this.txtBotonG=true;
        this.txtArchivo = event.target.files[0];
      }else{
        this.txtBotonG=false;
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: "El tipo de archivo permitido es PDF",
        });
      }
    }else{

    }
  }

  async serviciobuffer(token:any) {
    let ruta=this.datosCorreo.sistema+"/"+this.datosCorreo.planificacionEstrategica+"/"+this.txtDependencia+"/"+this.txtCodigo+"-"+this.txtArchivo.name;
    let formArchivo = new FormData();
    formArchivo.append('idAplicacion', "1");
    formArchivo.append('idCredencial', "1");
    formArchivo.append('activo', "true");
    formArchivo.append('ruta', ruta);
    formArchivo.append('file', this.txtArchivo);
    
    this.swArchivos.subirArchivos(formArchivo, token).subscribe(data => { 
      if(data.success){
        this.subirarchivo(this.txtCodigo+"-"+this.txtArchivo.name, ruta);
      }
     });
  }

  async subirarchivo(archivo:any, ruta:any){
    const aud={
      aud_usuario: this.sessionUser,
          aud_proceso: 'Ingresar',
          aud_descripcion:
            'Ingresar archivos plan con los datos: {Código: ' +
            this.txtCodigo +
            ', Nombre:' +
            this.txtNombre +
            ', Ruta: ' +
            ruta +
            ', Archivo: ' +
            archivo +
            ', Plan: ' +
            this.txtCodigo +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
    }
    const datoa={
      arch_nombre:this.txtNombre,
      arch_plan:this.txtCodigo,
      arch_archivo:archivo,
      arch_ruta:ruta,
      auditoria:aud
    }
    const datoar=await new Promise<any>(resolve=> this.swArchivos.IngresarArchivo(datoa).subscribe(translated=>{resolve(translated)}));
    if(datoar.success){
      this.listarPlanes();
      this.modalPlanAprobar=false;
      this.messageService.add({
        severity: 'success',
        summary: this.mensajesg.CabeceraExitoso,
        detail: this.mensajesg.IngresadoCorrectamente,
      });
    }else{
      this.modalPlanAprobar=false;
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.ErrorProceso,
      });
    }
  }

  async verResolucion(plan:any){
    const dat={
      idAplicacion: 1,
      jwtsecret: this.datosCorreo.clavesecreta,
      activo: "true"
    }
    const datosToken = await new Promise<any>(resolve => this.swArchivos.ObtenerTokenArchivos(dat).subscribe(translated => { resolve(translated) }));
    if(datosToken.success){
      const dato={
        ruta: plan[0].arch_ruta,
        archivo: plan[0].arch_archivo,
        idAplicacion: 1,
        idCredencial: 1,
        jwtsecret: this.datosCorreo.clavesecreta,
        activo: "true"
      }
      this.swArchivos.verArchivos(datosToken.token, dato).subscribe(data => { 
        if(data.success){
          this.datosCorreo.toDataURL(data.download, function(dataUrl:any) {
            if (dataUrl == "") {
              $("#ver-pdf").html('No se pudo cargar el PDF, vuelva a intentar mas tarde.');
          } else {
              $("#ver-pdf").html(' <embed src="' + dataUrl + '" type="application/pdf" width="100%" height="500" />');
          }
          })
          this.modalReporte=true;
        }
      });
    }
  }
}

