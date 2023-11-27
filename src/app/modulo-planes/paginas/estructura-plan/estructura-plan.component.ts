import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { SwEstructuraService } from '../../ServiciosWeb/estructura/sw-estructura.service';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SwPlanService } from '../../ServiciosWeb/planes/sw-plan.service';
import { listaI } from '../../Interface/planes';
import { SwEstructuraPlanService } from '../../ServiciosWeb/estructura/sw-estructura-plan.service';

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
txtIndicador:number=0;
txtIndBoolean:boolean=false;
listaIndicador:any=[];
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
constructor(private sesiones:SesionUsuario, private swEstructura: SwEstructuraService, private messageService: MessageService, private mensajesg:MensajesGenerales, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService, private swPlan: SwPlanService, private swEsPlan:SwEstructuraPlanService) { }

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
  this.listarPlan();
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

listar(e:any){
  this.listarEstructuraPlan(this.listaEstructura[e.index].est_id);
}

async listarEstructura(){
  const dat={
    codigo:this.txtPlan,
    tipo:2
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swEstructura.ListarEstructuraPlan(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaEstructura=datos.data;
  }else{
    this.listaEstructura=[];
  }
  this.loading = false;
}

async listarEstructuraPlan(estructura:any){
  const dat={
    codigo:this.txtPlan,
    estructura:estructura,
    tipo:1
  }
  console.log(dat);
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swEsPlan.ListaEstructuraPlanes(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaEstructuraPlan=datos.data; 
  }else{
    this.listaEstructuraPlan=[];
  }

  this.loading = false;
}

async obtenerPlan(event:any){
  this.txtPlan=event.value;
  await this.listarEstructura();
  if(this.listaEstructura.length>0){
    var codigo;
    for(let est of this.listaEstructura){
      if(est.est_orden==1){
        codigo=est.est_id;
      }
    }
    this.listarEstructuraPlan(codigo);
  }
}

nuevaEst(estructura:any){
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
      this.txtTipo=estructura.est_id;
      this.modalEstructura=true;
      this.txtAlineacion=0;
      this.eliminar=false;
      this.listaEstructuraSelect=[];
      this.listarEstructuraPlanS(estructura.est_orden);
      //this.listarEstructuraPlanD(estructura.est_orden);
    }
  }else {
    this.messageService.add({
      severity: 'error',
      summary: this.mensajesg.CabeceraError,
      detail: this.mensajesg.NoAutorizado,
    });
  }
}

editarEstructura(datos:any){

}

eliminarEstructura(datos:any){

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
          'Ingresar estructura - plan con los datos: {Código: ' +
          this.txtCodigo +
          ', Nombre:' +
          this.txtNombre +
          ', Plan: ' +
          this.txtPlan +
          ', Código: '+
          this.txtIdentificador+
          ', Tipo: '+
          this.txtTipo+
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
       eplan_eplan_id:this.txtAlineacion,
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
        /*var suma=0;
        for(let estructura of this.listaEstructuraPlan){
          console.log(estructura.eplan_estructura);
          console.log(this.txtTipo);
          if(estructura.eplan_estructura==this.txtTipo){
            suma++;
          }
        }
        if(suma==1){
          this.listarEstructura();
        }*/
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
       eplan_eplan_id:this.txtAlineacion,
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
    }
  }
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
}
