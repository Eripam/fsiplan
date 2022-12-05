import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { listaI } from '../../Interface/planEstrategico';
import { SwPlanService } from '../../ServiciosWeb/Plan/swPlan.service';
import {TreeNode} from 'primeng/api';
import { SwCronogramaService } from '../../ServiciosWeb/Cronograma/swCronograma.service';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
declare var jQuery:any;

import { SwEstrategicoReporteService } from 'src/app/modulo-reportes/ServiciosWeb/Estrategico/swEstrategicoReporte.service';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CronogramaComponent implements OnInit {
  // Menú del home
  items: MenuItem[] = [];
  home!: MenuItem;
  sesionDep:string='';
  sesionTipo:number=0;
  sessionDepC:number=0;
  loading: boolean = true;
  sessionUser:string='';
  sessionRol:string='';
  txtPlan:string="";
  listaPlanE:any=[];
  cols: any[]=[];
  estructura: TreeNode[]=[];
  modalReporte:boolean=false;
  url:any;
  tipo:any;
  anios:number=0;
  periodo: number=0;
  periodoa: any[]=[];
  txtIngresar:boolean=false;
  txtModificar:boolean=false;
  txtPlanEstado:boolean=true;

  constructor(private sesiones:SesionUsuario, private messageService: MessageService, private mensajesg:MensajesGenerales, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService, private swPlan: SwPlanService, private swCronograma: SwCronogramaService, public sanitizer: DomSanitizer, public swEstrategicoRep:SwEstrategicoReporteService) { }

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
    this.listarPlanEstrategico();
    this.listarEstructura(0);
    this.listarPeriodo();
    const datosRol=await this.sesiones.obtenerOpcionesUsuario(valores);
    //this.url=this.sanitizer.bypassSecurityTrustResourceUrl(this.urlP);
    this.txtIngresar=datosRol.rop_insertar;
    this.txtModificar=datosRol.rop_modificar;
    this.items=[{label:datosRol.pop_nombre},{ label: datosRol.opc_nombre }]
    //Menu superio con enlace del home
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
  
  async listarPlanEstrategico(){
    this.cols=[];
    const dat={
      tipo:this.sesionTipo,
      codigo:this.sessionDepC
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlan.ListaPlanes(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.listaPlanE=datos.data;
      if(this.txtPlan!="0"){
        var fechai, fechaf;
        for(let dat of datos.data){
          if(dat.plan_id==this.txtPlan){
            fechai=dat.plan_fecha_inicio;
            fechaf=dat.plan_fecha_fin;
            this.anios=dat.plan_anio;
            if(dat.plan_estado==2){
              this.txtPlanEstado=false;
            }else{
              this.txtPlanEstado=true;
            }
          }
        }
        var anio1=Number(moment(fechai).format('YYYY'));
        var anio2=Number(moment(fechaf).format('YYYY'));
        for(let i=anio1; i<=anio2; i++){
          this.cols.push(i);
        }
      }
    }else{
      this.listaPlanE=[];
    }
    this.loading = false;
  }
  
  obtenerEst(event:any){
    var fechai, fechaf;
    this.cols=[];
    this.txtPlan=event.value;
    for(let plan of this.listaPlanE){
      if(event.value==plan.plan_id){
        fechai=plan.plan_fecha_inicio;
        fechaf=plan.plan_fecha_fin;
        this.anios=plan.plan_anio;
        if(plan.plan_estado==2){
          this.txtPlanEstado=false;
        }else{
          this.txtPlanEstado=true;
        }
      }
    }
    var anio1=Number(moment(fechai).format('YYYY'));
    var anio2=Number(moment(fechaf).format('YYYY'));
    for(let i=anio1; i<=anio2; i++){
      this.cols.push(i);
    }
    this.listarPlanEstrategico();
    this.listarEstructura(0);
    this.listarPeriodo();
  }

  async listarPeriodo(){
    this.periodoa=[];
    const dat={
      perp_plan:this.txtPlan
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swCronograma.ListarPeriodoPlan(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      for(let dato of datos.data){
        this.periodo=dato.per_maximo;
      } 
    }else{
      this.periodo=0;
    }
    for(var i=1; i<=this.periodo; i++){
      this.periodoa.push(i);
    }
  }

  async listarEstructura(eplan:any){
    const dat={
      codigo:this.txtPlan,
      eplan:eplan
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swCronograma.ListaEstructuraCronograma(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.estructura=datos.data; 
    }else{
      this.estructura=[];
    }
  }


  async verCronograma(){
    const dat={
      codigo:this.txtPlan
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swEstrategicoRep.ReportePDF(dat).subscribe((translated)=>{resolve(translated)}));
    this.modalReporte=true;

    
    /*Crear nueva url y abrir en otra pestaña
    const b64toBlob = (b64Data:any, contentType='', sliceSize=512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];
    
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
    
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
    
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
    
      const blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }
    
    var fileblob = b64toBlob(datos.data, 'application/pdf');
    this.url = window.URL.createObjectURL(fileblob); 
    let anchor = document.createElement("a");
    anchor.href = this.url;
    console.log(this.url);
    anchor.target = "_blank"
    anchor.click();*/

    //Mostar en modal
    this.tipo="application/pdf";
    var urlP="data:application/pdf;base64,"+datos.data;
    this.url=this.sanitizer.bypassSecurityTrustResourceUrl(urlP);


    
    /*Descargar archivo
    const linkSource = 'data:application/pdf;base64,' + datos.data;
    const downloadLink = document.createElement("a");
    const fileName = "sample.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.target='_blank';
    downloadLink.click();*/
  }

  async agregarCro(cronograma:any){
    if(this.txtIngresar && this.txtModificar){
    var suma=0;
    for(let cro of cronograma){
      suma=suma+Number(cro.cro_valor);
    }
    if(suma!=100){
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.ErrorProceso,
        detail: 'Verifique los valores ingresados ya que la suma del cronograma debe dar el 100%, su valor es de: '+suma+'%',
      });
    }else{
      var i=0;
      var eplan;
      for(let cro of cronograma){
        eplan=cro.cro_eplan;
        if(cro.cro_id==0){
          const datosAudi = {
            aud_usuario: this.sessionUser,
            aud_proceso: 'Ingresar',
            aud_descripcion:
              'Ingresar cronograma con los datos: {Código Plan: ' +
              cro.cro_eplan +
              ', Valores:' +
              cro.cro_valor +
              ', Anio: '+
              cro.cro_anio+
              ', Periodo: '+
              cro.cro_periodo+
              '}',
            aud_rol: this.sessionRol,
            aud_dependencia: this.sessionDepC,
          };
          const dato:any={
            cro_eplan:cro.cro_eplan,
            cro_valor:cro.cro_valor,
            cro_anio:cro.cro_anio,
            cro_periodo:cro.cro_periodo,
            auditoria:datosAudi
          }
          const datos = await new Promise<any>((resolve) =>
          this.swCronograma.IngresarCronograma(dato).subscribe((translated) => {
              resolve(translated);})
          );
          if (datos.success) {
            i++;
          }
        }else{
          const datosAudi = {
            aud_usuario: this.sessionUser,
            aud_proceso: 'Modificar',
            aud_descripcion:
              'Modificar cronograma con los datos: {Código: ' +
              cro.cro_id +
              ', Código Plan:' +
              cro.cro_eplan +
              ', Valores:' +
              cro.cro_valor +
              ', Anio: '+
              cro.cro_anio+
              ', Periodo: '+
              cro.cro_periodo+
              '}',
            aud_rol: this.sessionRol,
            aud_dependencia: this.sessionDepC,
          };
          const dato:any={
            cro_id:cro.cro_id,
            cro_eplan:cro.cro_eplan,
            cro_valor:cro.cro_valor,
            cro_anio:cro.cro_anio,
            cro_periodo:cro.cro_periodo,
            auditoria:datosAudi
          }
          const datos = await new Promise<any>((resolve) =>
          this.swCronograma.ModificarCronograma(dato).subscribe((translated) => {
              resolve(translated);})
          );
          if (datos.success) {
            i++;
          }
        }
      }
      if(cronograma.length==i){
        this.listarEstructura(eplan);
        this.messageService.add({
        severity: 'success',
        summary: this.mensajesg.CabeceraExitoso,
        detail: this.mensajesg.ExitoProceso,
      });
      } else {
        this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.ErrorProceso,
        });
      }
    }
  }else {
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.NoAutorizado,
    });
  }
  }
}
