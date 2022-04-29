import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { listaI } from '../../Interface/seguridad';
import { SwAuditoriaService } from '../../ServiciosWeb/Auditoria/swAuditoria.service';
import { SwCriteriosService } from '../../ServiciosWeb/Criterios/swCriterios.service';
import { SwCriteriosDesService } from '../../ServiciosWeb/Criterios/swCriteriosDes.service';
import { SwEvalAccionService } from '../../ServiciosWeb/Evaluacion/swEvalAccion.service';
import { SwProspectivaService } from '../../ServiciosWeb/Prospectiva/swProspectiva.service';
import * as moment from 'moment';

@Component({
  selector: 'app-seleccionr-accion',
  templateUrl: './seleccionar-accion.component.html',
  styleUrls: ['./seleccionar-accion.component.scss'],
  providers:[MessageService, ConfirmationService]
})
export class SeleccionrAccionComponent implements OnInit {
// Menú del home
items: MenuItem[] = [];
home!: MenuItem;
//Variable para los estados de usuario
statuses!: any[];
sesionDep:string='';
sessionDepC: string='';
//Variable para mostrar el loading en la tabla
loading: boolean = true;
listaProspectivas:any[]=[];
txtProspectiva:number=0;
txtIngresar:boolean=false;
txtModificar:boolean=false;
listaCriterios:any[]=[];
listaI:listaI[]=[];
listaFase:any[]=[];
listaCriterioDes:any[]=[];
listaCriterioDesA:any[]=[];
//Modal
modalSeleccion:boolean=false;
tituloModal:string='';
txtTexto:string='';
txtNombre:string='';
txtCodigoC:number=0;
txtCodigoCD:number=0;
txtCriterioD:string='';
txtTipo:number=0;
txtCodigoCA:number=0;
txtEliminar:boolean=false;
txtCEliminar:boolean=false;
txtTipoEliminar:number =0;
sessionUser:string='';
sessionRol:string='';
btnGuardar:string='SI';
btnCancelar:string='NO';
selectAccion:any[]=[];
listaAcciones:any[]=[];
selectAccionA:any[]=[];
selectAccionE:any[]=[];
modalTiempos:boolean=false;
txtFechaI: String='';
txtFechaF:String='';

constructor(private route: ActivatedRoute, private sesiones:SesionUsuario, private swProspectiva:SwProspectivaService, private swCriterio: SwCriteriosService, private mensajesg:MensajesGenerales, private messageService: MessageService, private swCritDes: SwCriteriosDesService, private swAuditoria: SwAuditoriaService, private swEval:  SwEvalAccionService) { }

async ngOnInit() {
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
  this.txtEliminar=datosRol.rop_eliminar;
  this.home = { icon: 'pi pi-home', routerLink: '/' };
  this.items=[{label:datosRol.pop_nombre},{ label: datosRol.opc_nombre }]
  this.listarProspectivas();
}

async listarProspectivas(){
  const dat={
    codigo:this.sessionDepC
  }
  const datos:listaI = await new Promise<listaI>((resolve) =>  this.swProspectiva.ListarProspectiva(dat).subscribe((translated) => { resolve(translated); }));
  if(datos.success){
    this.listaProspectivas = datos.data;
  }else{
    this.listaProspectivas =[];
  }
  this.loading = false;
}

async listarCriterios(){
  const dat={
    codigo:this.txtProspectiva
  }
  const datos:listaI = await new Promise<listaI>((resolve) =>  this.swCriterio.ListarCriteriosActivos(dat).subscribe((translated) => { resolve(translated); }));
  if(datos.success){
    this.listaCriterios = datos.data;
  }else{
    this.listaCriterios =[];
  }
  this.loading = false;
}

async listarCriteriosDes(){
  const valores={
    cri_prospectiva:this.txtProspectiva,
    tipo:2
  }
  const datos:listaI = await new Promise<listaI>((resolve) =>  this.swCritDes.ListarCriteriosDes(valores).subscribe((translated) => { resolve(translated); }));
  if(datos.success){
    this.listaCriterioDes = datos.data;
  }else{
    this.listaCriterioDes =[];
  }
  this.loading = false;
}

async listarCriteriosDesA(){
  const valores={
    cri_prospectiva:this.txtProspectiva,
    tipo:3
  }
  const datos:listaI = await new Promise<listaI>((resolve) =>  this.swCritDes.ListarCriteriosDes(valores).subscribe((translated) => { resolve(translated); }));
  if(datos.success){
    this.listaCriterioDesA = datos.data;
  }else{
    this.listaCriterioDesA =[];
  }
  this.loading = false;
}

obtenerPros(event:any){
  this.txtProspectiva=event.value;
  this.listarCriterios();
  this.listarCriteriosDes();
  this.listarCriteriosDesA();
}

GuardarSeleccion(tipo:number){
  this.selectAccionA=[];
  if(tipo==1){
  this.tituloModal='¿Está seguro que desea guardar estas acciones seleccionadas?';
  this.listaAcciones=Object.values(this.selectAccion);
  for(let accion of this.selectAccion){
    this.selectAccionA.push(accion.acc_id);
  }
  }else{
    this.tituloModal='¿Está seguro que desea eliminar estas acciones seleccionadas?';
    this.listaAcciones=Object.values(this.selectAccionE);
    for(let accion of this.selectAccionE){
      this.selectAccionA.push(accion.acc_id);
    }
  }
  this.modalSeleccion=true;
}

hidenModal(){
  this.modalSeleccion=false;
}

hidenModalT(){
  this.modalTiempos=false;
}

async ingresarSeleccion(){
  var suma=0, suman=0, estado, proceso;
  if(this.selectAccionE.length>0){
    estado=1;
    proceso='Eliminar';
  }else{
    estado=2;
    proceso='Ingresar';
  }
  if(this.selectAccionA.length>0){
    for(let accion of this.selectAccionA){
      const dat={
        codigo:accion,
        estado:estado
      }
      const datos = await new Promise<any>((resolve) =>  this.swCritDes.SeleccionarAccion(dat).subscribe((translated) => { resolve(translated); }));
      if(datos.success){
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:proceso,
          aud_descripcion:proceso+" de selección de acciones: {Código:"+accion+", estado: "+estado+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        suma++;
      }else{
        suman++;
      }
    }
    this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Se seleccionaron '+suma+' acciones'});
    this.modalSeleccion=false;
    this.listarCriterios();
    this.listarCriteriosDes();
    this.listarCriteriosDesA();
    this.selectAccion=[];
    this.selectAccionA=[];
    this.selectAccionE=[];
  }else{
    this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.NoSeleccionado+' acción'});
  }
}

LimpiarSeleccion(tipo:number){
  if(tipo==1){
    this.selectAccion=[];
  }else{
    this.selectAccionE=[];
  }
}

async GuardarTiempo(){
  if(this.txtProspectiva!=0){
    this.tituloModal="Asignar fechas para encuestas";
    const dat={
      prospectiva:this.txtProspectiva
    }
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swEval.ListarTiempo(dat).subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      if(datos.data.length>0){
        for(let valores of datos.data){
          if(valores.tiem_tipo==1){
            this.txtCodigoC=valores.tiem_id;
            this.txtNombre=valores.tiem_nombre;
            this.txtFechaI=moment(valores.tiem_fecha_inicio).format("YYYY-MM-DDTkk:mm");
            this.txtFechaF=moment(valores.tiem_fecha_fin).format("YYYY-MM-DDTkk:mm");
          }
        }
      }else{
        this.txtNombre='';
        this.txtFechaF='';
        this.txtFechaI='';
        this.txtCodigoC=0;
      }
    }else{
      this.txtNombre='';
      this.txtFechaF='';
      this.txtFechaI='';
      this.txtCodigoC=0;
    }
    this.btnGuardar='Guardar';
    this.btnCancelar='Cancelar';
    this.modalTiempos=true;
  }else{
    this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: 'Debe seleccionar la prospectiva'});
  }
}

async ingresarTiempo(){
  const dat={
    tiem_nombre:this.txtNombre,
    tiem_fecha_inicio:this.txtFechaI,
    tiem_fecha_fin:this.txtFechaF,
    tiem_tipo:1,
    tiem_id:this.txtCodigoC,
    tiem_prospectiva:this.txtProspectiva
  }
  if(this.txtCodigoC==0){
    const datos = await new Promise<any>((resolve) =>  this.swEval.IngresarTiempo(dat).subscribe((translated) => { resolve(translated); }));
        if(datos.success){
          const datosAudi={
            aud_usuario:this.sessionUser,
            aud_proceso:"Ingresar",
            aud_descripcion:"Ingresar tiempo con los datos: {Nombre:"+this.txtNombre+", Fecha inicio: "+this.txtFechaI+", Fecha fin: "+this.txtFechaF+", Prospectiva: "+this.txtProspectiva+", Tipo: 1}",
            aud_rol:this.sessionRol,
            aud_dependencia:this.sessionDepC
          }
          const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
          this.modalTiempos=false;
          this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: this.mensajesg.IngresadoCorrectamente});
        }else{
          this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
        }
    }else{
      const datos = await new Promise<any>((resolve) =>  this.swEval.ModificarTiempo(dat).subscribe((translated) => { resolve(translated); }));
      if(datos.success){
        if(datos.success){
          const datosAudi={
            aud_usuario:this.sessionUser,
            aud_proceso:"Modificar",
            aud_descripcion:"Modificar tiempo con los datos: {Código: "+this.txtCodigoC+" ,Nombre:"+this.txtNombre+", Fecha inicio: "+this.txtFechaI+", Fecha fin: "+this.txtFechaF+", Prospectiva: "+this.txtProspectiva+", Tipo: 1}",
            aud_rol:this.sessionRol,
            aud_dependencia:this.sessionDepC
          }
          const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalTiempos=false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: this.mensajesg.ModificadoCorrectamente});
      }else{
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }
}
}
}