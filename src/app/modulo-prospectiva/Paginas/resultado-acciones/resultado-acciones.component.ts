import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { listaI } from '../../Interface/seguridad';
import { SwAuditoriaService } from '../../ServiciosWeb/Auditoria/swAuditoria.service';
import { SwCriteriosDesService } from '../../ServiciosWeb/Criterios/swCriteriosDes.service';
import { SwEvalAccionService } from '../../ServiciosWeb/Evaluacion/swEvalAccion.service';
import { SwProspectivaService } from '../../ServiciosWeb/Prospectiva/swProspectiva.service';

@Component({
  selector: 'app-resultado-acciones',
  templateUrl: './resultado-acciones.component.html',
  styleUrls: ['./resultado-acciones.component.scss'],
  providers:[MessageService, ConfirmationService]
})
export class ResultadoAccionesComponent implements OnInit {

  // Menú del home
  items: MenuItem[]=[];
  home!: MenuItem;
  sessionUser:string='';
  sessionRol:string='';
  sessionRolId:number=0;
  loading: boolean = true;
  listaProspectivas:any[]=[];
  txtProspectiva:number=0;
  listaI:listaI[]=[];
  txtIngresar:boolean=false;
  txtModificar:boolean=false;
  sesionDep:string='';
  sessionDepC: string='';
  txtEliminar:boolean=false;
  listaCriterioDesA:any[]=[];
  listaRespuestas:any[]=[];
  listaResultados:any[]=[];
  listaResultados2:any[]=[];
  listaResultados3:any[]=[];
  contUmbral:boolean=false;
  txtUmbral:number=0;
  modalSeleccion:boolean=false;
  tituloModal:string='';
  txtTexto:string='';
  selectAccionA:any[]=[];
  selectAccionE:any[]=[];
  banResultado:boolean=false;
  selectAccionEA:any[]=[];

  constructor(private route: ActivatedRoute, private sesiones:SesionUsuario, private swProspectiva:SwProspectivaService, private swRespuesta: SwEvalAccionService, private mensajesg:MensajesGenerales, private messageService: MessageService, private confirmationService: ConfirmationService, private swCritDes:SwCriteriosDesService, private swEval: SwEvalAccionService, private swAuditoria: SwAuditoriaService) { }

  async ngOnInit() {
    const datosS=await this.sesiones.obtenerDatosLogin();
    this.sesionDep=datosS.dep_nombre;
    this.sessionDepC=datosS.rpe_dependencia;
    this.sessionUser=datosS.rpe_persona;
    this.sessionRol=datosS.rol_nombre;
    this.sessionRolId=datosS.rpe_rol;
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

  async obtenerPros(event:any){
    this.txtProspectiva=event.value;
    const dat={
      prospectiva:this.txtProspectiva
    }
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swEval.ListarTiempo(dat).subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      for(let tiempo of datos.data){
        if(tiempo.tiem_tipo==1 && tiempo.tiem_prospectiva==this.txtProspectiva){
          if(new Date(tiempo.tiem_fecha_inicio)>new Date()){
            this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: 'No ha iniciado la encuesta.'});
          }else if(new Date(tiempo.tiem_fecha_fin)>new Date()){
            this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: 'No ha finalizado la encuesta.'});
          }else{
            this.contUmbral=true;
            this.listarCriteriosDesA();
            this.listaRespuesta();
            this.listaResultadosE(1);
            this.listaResultadosE(3);
          }
        }
      }
    }
  }

  async listarCriteriosDesA(){
    const valores={
      prospectiva:this.txtProspectiva
    }
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swCritDes.ListarAccionesResultados(valores).subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaCriterioDesA = datos.data;
    }else{
      this.listaCriterioDesA =[];
    }
    this.loading = false;
  }

  async listaRespuesta(){
    const dat={
      codigo:this.txtProspectiva
    }
    const datos:listaI= await new Promise<listaI>((resolve)=> this.swRespuesta.ListarRespuesta(dat).subscribe((translated)=>{ resolve(translated); }));
    if(datos.success){
      this.listaRespuestas=datos.data;
    }else{
      this.listaRespuestas=[];
    }
  }

  async listaResultadosE(tipo:any){
    const dat={
      codigo:this.txtProspectiva,
      tipo:tipo,
      umbral:this.txtUmbral
    }
    if(tipo==1){
      const datos:listaI= await new Promise<listaI>((resolve)=> this.swRespuesta.ListaRespuestaE(dat).subscribe((translated)=>{ resolve(translated); }));
      if(datos.success){
        this.listaResultados=datos.data;
      }else{
        this.listaResultados=[];
      }
    }else if(tipo==2){
      const datos:listaI= await new Promise<listaI>((resolve)=> this.swRespuesta.ListaRespuestaE(dat).subscribe((translated)=>{ resolve(translated); }));
      if(datos.success){
        this.listaResultados2=datos.data;
      }else{
        this.listaResultados2=[];
      }
    }else{
      const datos:listaI= await new Promise<listaI>((resolve)=> this.swRespuesta.ListaRespuestaE(dat).subscribe((translated)=>{ resolve(translated); }));
      if(datos.success){
        this.listaResultados3=datos.data;
      }else{
        this.listaResultados3=[];
      }
    }
  }

  hidenModal(){
    this.modalSeleccion=false;
  }

  async listarSeleccionados(){
    this.banResultado=true;
    this.tituloModal='¿Está seguro que desea guardar estos datos?'
    if(this.txtUmbral==0){
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: 'Debe ingresar el umbral'});
    }else{
      await this.listaResultadosE(2);
      this.selectAccionA=[];
      for(let accion of this.listaResultados2){
        this.selectAccionA.push(accion);
      }
      this.modalSeleccion=true;
    }
  }

  async guardarAcciones(){
    var suma=0;
    if(this.selectAccionA.length>0){
      for(let accion of this.selectAccionA){
        const dat={
          tab_acc:accion.accid,
          tab_valor_total:accion.total
        }
        const datos = await new Promise<any>((resolve) =>  this.swEval.IngresarTabulacion(dat).subscribe((translated) => { resolve(translated); }));
        if(datos.success){
          const datosAudi={
            aud_usuario:this.sessionUser,
            aud_proceso:"Ingresar",
            aud_descripcion:"Ingresar acciones en la tabla tabulacion con los datos: {acción:"+accion.accid+", valor: "+accion.total+"}",
            aud_rol:this.sessionRol,
            aud_dependencia:this.sessionDepC
          }
          const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
          suma++;
        }
      }
      this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Se guardaron '+suma+' acciones'});
      this.modalSeleccion=false;
      this.listarCriteriosDesA();
      this.listaResultadosE(3);
      this.selectAccionA=[];
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.NoSeleccionado+' acción'});
    }
  }

  limpiar(){
    this.selectAccionE=[];
  }

  eliminarAcciones(){
    this.tituloModal='¿Está seguro que desea quitar de la lista a estas acciones?';
    if(this.selectAccionE.length==0){
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.NoSeleccionado});
    }else{
      for(let accion of this.selectAccionE){
        this.selectAccionEA.push(accion.acc_id);
      }
      this.banResultado=false;
      this.modalSeleccion=true;
    }
  }

  async quitarAcciones(){
    const dat={
      acciones:this.selectAccionEA
    }
    const datos = await new Promise<any>((resolve) =>  this.swEval.EliminarAccionesTab(dat).subscribe((translated) => { resolve(translated); }));
        if(datos.success){
          const datosAudi={
            aud_usuario:this.sessionUser,
            aud_proceso:"Eliminar",
            aud_descripcion:"Eliminar las acciones en la tabla tabulacion con los datos: {acciónes:"+this.selectAccionEA+"}",
            aud_rol:this.sessionRol,
            aud_dependencia:this.sessionDepC
          }
          const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
          this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: this.mensajesg.EliminadoCorrectamente});
          this.modalSeleccion=false;
          this.listarCriteriosDesA();
          this.listaResultadosE(2);
          this.listaResultadosE(3);
          this.selectAccionA=[];
          this.selectAccionE=[];
          this.selectAccionEA=[];
        }else{
          this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
        }
  }
}
