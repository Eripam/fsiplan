import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { listaI } from '../../Interface/planEstrategico';
import { SwCronogramaService } from '../../ServiciosWeb/Cronograma/swCronograma.service';
import { SwEjesService } from '../../ServiciosWeb/EjeEstrategico/swEjes.service';
import { SwEstructuraService } from '../../ServiciosWeb/Estructura/swEstructura.service';
import { SwEstructuraPlanService } from '../../ServiciosWeb/EstructuraPlan/swEstructuraPlan.service';
import { SwPlanService } from '../../ServiciosWeb/Plan/swPlan.service';
import * as moment from 'moment';

@Component({
  selector: 'app-estructura-plan',
  templateUrl: './estructura-plan.component.html',
  styleUrls: ['./estructura-plan.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class EstructuraPlanComponent implements OnInit {
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
txtPlanEstado:boolean=true;
txtIdentificador:string="";
txtDepende:number=0;
eliminar:boolean=false;
txtTipo:string='';
txtAlineacion:number=0;
listaEje:any=[];
listaEstructuraSelect:any=[];
txtEje:string="";
Eje:boolean=false;
maximo:number=0;
anio:number=0;
fechai:string='';
fechaf:string='';
displayModal:boolean=false;
txtSubtitulo:string='';
txtCronograma:any[]=[];

//Variable para mostrar el loading en la tabla
loading: boolean = true;
constructor(private sesiones:SesionUsuario, private swEstructura: SwEstructuraService, private messageService: MessageService, private mensajesg:MensajesGenerales, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService, private swPlan: SwPlanService, private swEsPlan: SwEstructuraPlanService, private swEje: SwEjesService, private swCronograma: SwCronogramaService) { }

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
  this.listarPlanEstrategico();
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
  this.loading = false;
}

async listarEstructura(){
  const dat={
    codigo:this.txtPlan,
    tipo:2
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swEstructura.ListaEstructura(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaEstructura=datos.data;
  }else{
    this.listaEstructura=[];
  }
  this.loading = false;
}

async listarMaximo(){
  const dat={
    codigo:this.txtPlan,
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swEstructura.ListarMaximo(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.maximo=datos.data[0].max;
  }else{
    this.maximo=0;
  }
  this.loading = false;
}

async listarEjes(){
  const dat={
    codigo:this.txtPlan,
    tipo:2
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swEje.ListaEje(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaEje=datos.data;
  }else{
    this.listaEje=[];
  }
  this.loading = false;
}

async listarEstructuraPlan(estructura:any){
  const dat={
    codigo:this.txtPlan,
    estructura:estructura,
    tipo:1
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swEsPlan.ListaEstructuraPlanes(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaEstructuraPlan=datos.data; 
  }else{
    this.listaEstructuraPlan=[];
  }
  this.loading = false;
}

async listarEstructuraPlanS(orden: any){
  this.listaEstructuraPlanS=[];
  const dat={
    codigo:this.txtPlan,
    tipo:3,
    orden:orden
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swEsPlan.ListaEstructuraPlanes(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaEstructuraPlanS=[
      {label:'Ninguno', value:0}
    ] 
    for(let dato of datos.data){
      this.listaEstructuraPlanS.push({label:dato.est_codigo+'-'+dato.eplan_codigo, value:dato.eplan_id})
    }
  }else{
    this.listaEstructuraPlanS=[];
  }
  this.loading = false;
}

async listarEstructuraPlanD(){
  this.listaEstructuraPlanD=[];
  const dat={
    codigo:this.txtPlan,
    tipo:2
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swEsPlan.ListaEstructuraPlanes(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaEstructuraPlanD=[
      {label:'Ninguno', value:0}
    ] 
    for(let dato of datos.data){
      this.listaEstructuraPlanD.push({label:dato.est_codigo+'-'+dato.eplan_codigo, value:dato.eplan_id})
    }
  }else{
    this.listaEstructuraPlanD=[];
  }
  this.loading = false;
}

obtenerEst(event:any){
  this.txtPlan=event.value;
    for(let plan of this.listaPlanE){
      if(plan.plan_id==this.txtPlan){
        this.anio=plan.plan_anio;
        this.fechai=moment(plan.plan_fecha_inicio).format('YYYY');
        this.fechaf=moment(plan.plan_fecha_fin).format('YYYY');
        if(plan.plan_estado==2){
          this.txtPlanEstado=false;
        }else{
          this.txtPlanEstado=true;
        }
      }
    }
  this.listarEstructura();
  this.listarEstructuraPlan(1);
  this.listarEstructuraPlanD();
  this.listarEjes();
  this.listarMaximo();
}

async listarEstructuraSelect(event:any){
  if(event.value==0){
    this.listaEstructuraSelect=[];
  }else{
    const dat={
      codigo:event.value,
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swEsPlan.ListaEstructuraPlanesSelect(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.listaEstructuraSelect=datos.data; 
    }else{
      this.listaEstructuraSelect=[];
    }
  }
  this.loading = false;
}

hideDialogP(){
  this.modalEstructura=false;
}

async guardarEstructura(){
  if(this.txtNombre=='' || this.txtTipo==''){
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
          'Ingresar estructura - plan estratégico con los datos: {Código: ' +
          this.txtCodigo +
          ', Nombre:' +
          this.txtNombre +
          ', Plan: ' +
          this.txtPlan +
          ', Código: '+
          this.txtIdentificador+
          ', Tipo: '+
          this.txtTipo+
          ', Depende: '+
          this.txtDepende+
          ', Alineado: '+
          this.txtAlineacion+
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dat:any= {
       eplan_id: this.txtCodigo,
       eplan_nombre:this.txtNombre,
       eplan_codigo:this.txtIdentificador,
       est_estado:this.txtEstado,
       eplan_plan:this.txtPlan,
       eplan_estructura:this.txtTipo,
       eplan_depende:this.txtDepende,
       eplan_eplan_id:this.txtAlineacion,
       eplan_eje:this.txtEje,
       auditoria: datosAudi
      };
      const datos = await new Promise<any>((resolve) =>
        this.swEsPlan.IngresarEstructuraPlanes(dat).subscribe((translated) => {
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
        await this.listarEstructuraPlan(this.txtTipo);
        var suma=0;
        for(let estructura of this.listaEstructuraPlan){
          if(estructura.eplan_estructura==this.txtTipo){
            suma++;
          }
        }
        if(suma==1){
          this.listarEstructura();
        }
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
          'Modificar estructura - plan estratégico con los datos: {Códigoid: ' +
          this.txtCodigo +
          ', Nombre:' +
          this.txtNombre +
          ', Plan: ' +
          this.txtPlan +
          ', Código: '+
          this.txtIdentificador+
          ', Tipo: '+
          this.txtTipo+
          ', Depende: '+
          this.txtDepende+
          ', Alineado: '+
          this.txtAlineacion+
          ', Estado: '+
          this.txtEstado+
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dat:any= {
       eplan_id: this.txtCodigo,
       eplan_nombre:this.txtNombre,
       eplan_codigo:this.txtIdentificador,
       eplan_estado:this.txtEstado,
       eplan_plan:this.txtPlan,
       eplan_estructura:this.txtTipo,
       eplan_depende:this.txtDepende,
       eplan_eplan_id:this.txtAlineacion,
       eplan_eje:this.txtEje,
       auditoria: datosAudi
      };
      const datos = await new Promise<any>((resolve) =>
        this.swEsPlan.ModificarEstructuraPlanes(dat).subscribe((translated) => {
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
        this.listarEstructuraPlan(this.txtTipo);
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
      const validacion=await new Promise<any>((resolve)=>this.swEsPlan.ValidarEstructuraPlanes(val).subscribe((translated)=>{resolve(translated)}));
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
            'Eliminar estructura - plan estratégico con los datos: {Códigoid: ' +
            this.txtCodigo +
            ', Nombre:' +
            this.txtNombre +
            ', Plan: ' +
            this.txtPlan +
            ', Código: '+
            this.txtIdentificador+
            ', Tipo: '+
            this.txtTipo+
            ', Depende: '+
            this.txtDepende+
            ', Alineado: '+
            this.txtAlineacion+
            ', Estado: '+
            this.txtEstado+
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const dat:any= {
         eplan_id: this.txtCodigo,
         eplan_nombre:this.txtNombre,
         eplan_codigo:this.txtIdentificador,
         eplan_estado:this.txtEstado,
         eplan_plan:this.txtPlan,
         eplan_estructura:this.txtTipo,
         eplan_depende:this.txtDepende,
         eplan_eplan_id:this.txtAlineacion,
         eplan_eje:this.txtEje,
         auditoria: datosAudi
        };
        const datos = await new Promise<any>((resolve) =>
          this.swEsPlan.EliminarEstructuraPlanes(dat).subscribe((translated) => {
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
          await this.listarEstructuraPlan(this.txtTipo);
          var suma=0;
          for(let estructura of this.listaEstructuraPlan){
            if(estructura.eplan_estructura==this.txtTipo){
              suma++;
            }
          }
          if(suma==0){
            this.listarEstructura();
          }
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
      this.txtAlineacion=0;
      this.Eje=estructura.est_eje;
      this.eliminar=false;
      this.listaEstructuraSelect=[];
      this.listarEstructuraPlanS(estructura.est_orden);
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
    if(est.eplan_depende==null || est.eplan_depende==''){
      this.txtDepende=0;
    }else{
      this.txtDepende=est.eplan_depende;
    }
    if(est.eplan_eplan_id==null || est.eplan_eplan_id==''){
      this.txtAlineacion=0;
    }else{
      this.txtAlineacion=est.eplan_eplan_id;
    }
    this.modalEstructura=true;
    this.txtEstado=est.eplan_estado;
    this.eliminar=false;
    this.listarEstructuraPlanS(est.est_orden);
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
    if(est.eplan_depende==null || est.eplan_depende==''){
      this.txtDepende=0;
    }else{
      this.txtDepende=est.eplan_depende;
    }
    if(est.eplan_eplan_id==null || est.eplan_eplan_id==''){
      this.txtAlineacion=0;
    }else{
      this.txtAlineacion=est.eplan_eplan_id;
    }
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

irPagina(){
  this.router.navigate(['estrategico/mapa/18/'+this.txtPlan+'/'+this.route.snapshot.paramMap.get('enc')]);
}

irPaginaCronograma(){
  this.router.navigate(['estrategico/cronograma/19/'+this.txtPlan+'/'+this.route.snapshot.paramMap.get('enc')]);
}

listar(e:any){
  this.listarEstructuraPlan(this.listaEstructura[e.index].est_id);
}

async agregarCronograma(eplan:any){
  const dat={
    codigo:eplan.eplan_id
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swCronograma.ListarCronograma(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.tituloModal='Modificar cronograma';
    this.txtSubtitulo=eplan.codigo+'. '+eplan.eplan_nombre;
    this.txtCodigo=eplan.eplan_id;
    this.displayModal=true;
    var i=0;
    for(let cron of datos.data){
      if(i<this.anio){
        this.txtCronograma[i]=cron.cro_valor;
        i++;
      }
    }
  }else{
    this.tituloModal='Agregar cronograma';
    this.txtSubtitulo=eplan.codigo+'. '+eplan.eplan_nombre;
    this.txtCodigo=eplan.eplan_id;
    this.displayModal=true;
    this.txtCronograma=[];
  }
}

counter(i: number) {
  return new Array(i);
}

async guardarCronograma(){
  console.log(this.txtCronograma.length);
  if(this.txtCronograma.length!=this.anio){
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.CamposVacios
    });
  }else{
    var sum:number=0;
    for(let cro of this.txtCronograma){
      sum=sum+Number(cro);
    }
    if(sum!=100){
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.ErrorProceso,
        detail: 'Verifique los valores ingresados ya que la suma del cronograma debe dar el 100%, su valor es de: '+sum+'%',
      });
    }else{
      const datosAudi = {
        aud_usuario: this.sessionUser,
        aud_proceso: 'Ingresar',
        aud_descripcion:
          'Ingresar cronograma con los datos: {Código Plan: ' +
          this.txtCodigo +
          ', Valores:' +
          this.txtCronograma +
          ', Fecha Inicio: '+
          this.fechai+
          ', Fecha Fin: '+
          this.fechaf+
          '}',
        aud_rol: this.sessionRol,
        aud_dependencia: this.sessionDepC,
      };
      const dato:any={
        codigo:this.txtCodigo,
        valores:this.txtCronograma,
        fechainicio:this.fechai,
        fechafin:this.fechaf,
        auditoria:datosAudi
      }
      const datos = await new Promise<any>((resolve) =>
      this.swCronograma.IngresarCronograma(dato).subscribe((translated) => {
          resolve(translated);})
      );
      if (datos.success) {
        this.messageService.add({
        severity: 'success',
        summary: this.mensajesg.CabeceraExitoso,
        detail: this.mensajesg.IngresadoCorrectamente,
      });
      this.displayModal=false;
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
