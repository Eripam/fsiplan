import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService, MenuItem, ConfirmEventType } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { listaI } from '../../Interface/seguridad';
import { SwCriteriosDesService } from '../../ServiciosWeb/Criterios/swCriteriosDes.service';
import { SwEvalAccionService } from '../../ServiciosWeb/Evaluacion/swEvalAccion.service';
import { SwProspectivaService } from '../../ServiciosWeb/Prospectiva/swProspectiva.service';
import { Subscription, interval } from 'rxjs';
import * as moment from 'moment';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';

@Component({
  selector: 'app-evaluar-accion',
  templateUrl: './evaluar-accion.component.html',
  styleUrls: ['./evaluar-accion.component.scss'],
  providers:[MessageService, ConfirmationService]
})
export class EvaluarAccionComponent implements OnInit, OnDestroy {
  // Menú del home
  items: MenuItem[]=[];
  home!: MenuItem;
  sessionUser:string='';
  sessionRol:string='';
  sessionRolId:number=0;
  txtIngresar:boolean=false;
  txtModificar:boolean=false;
  sesionDep:string='';
  sessionDepC: string='';
  txtEliminar:boolean=false;
  loading: boolean = true;
  listaProspectivas:any[]=[];
  txtProspectiva:number=0;
  listaI:listaI[]=[];
  listaCriterioDesA:any[]=[];
  listaRespuestas:any[]=[];
  evaluacion:any[]=[];
  respuesta="respuesta-";
  banActivar:boolean=false;
  banActivarBtn:boolean=false;
  //bjhiuhik
  subscription?: Subscription;
  subscriptionI?: Subscription;
  factual = new Date();
  finicio = new Date();
  ffin = new Date();
  milisegundos = 1000;
  horas = 24;
  minutos = 60;
  segundos  = 60;
  tiempoDiferencia:any;
  segundosHoy:any;
  minutosHoy:any;
  horasHoy:any;
  diasHoy:any;
  segundosHoyI:any;
  minutosHoyI:any;
  horasHoyI:any;
  diasHoyI:any;
  txtTiempo:any;
  texto:any='';
  texto2:any='';

  getTimeDifference () {
      this.tiempoDiferencia = this.ffin.getTime() - new  Date().getTime();
      this.allocateTimeUnits(this.tiempoDiferencia);
  }

  getTimeDifferenceInicio () {
    this.tiempoDiferencia = this.finicio.getTime() - new  Date().getTime();
    this.allocateTimeUnitsInicio(this.tiempoDiferencia);
  }

  allocateTimeUnitsInicio (timeDifference:any) {    
    this.segundosHoyI = Math.floor((timeDifference) / (this.milisegundos) % this.segundos);
    this.minutosHoyI = Math.floor((timeDifference) / (this.milisegundos * this.minutos) % this.segundos);
    this.horasHoyI = Math.floor((timeDifference) / (this.milisegundos * this.minutos * this.segundos) % this.horas);
    this.diasHoyI = Math.floor((timeDifference) / (this.milisegundos * this.minutos * this.segundos * this.horas));
    if(this.diasHoyI<=0 && this.horasHoyI<=0 && this.minutosHoyI<=0 && this.segundosHoyI<=0){
        this.subscription = interval(1000).subscribe(x => { this.getTimeDifference(); });
    }else{
      this.banActivar=false;
      this.banActivarBtn=false;
    }
}

  allocateTimeUnits (timeDifference:any) {
        this.segundosHoy = Math.floor((timeDifference) / (this.milisegundos) % this.segundos);
        this.minutosHoy = Math.floor((timeDifference) / (this.milisegundos * this.minutos) % this.segundos);
        this.horasHoy = Math.floor((timeDifference) / (this.milisegundos * this.minutos * this.segundos) % this.horas);
        this.diasHoy = Math.floor((timeDifference) / (this.milisegundos * this.minutos * this.segundos * this.horas));
        if(this.diasHoy<=0 && this.horasHoy<=0 && this.minutosHoy<=0 && this.segundosHoy<=0){
          this.banActivar=false;
          this.banActivarBtn=false;
          this.txtTiempo='El tiempo para realizar la encuesta a terminado.';
        }else{
          this.txtTiempo=this.diasHoy+' día(s), '+this.horasHoy+' hora(s), '+this.minutosHoy+' minuto(s), '+this.segundosHoy+' segundos.';
        }
  }


  constructor(private route: ActivatedRoute, private sesiones:SesionUsuario, private swCritDes: SwCriteriosDesService, private swProspectiva:SwProspectivaService, private swRespuesta: SwEvalAccionService, private mensajesg:MensajesGenerales, private messageService: MessageService, private confirmationService: ConfirmationService) { }

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

  ngOnDestroy() {
    this.subscription?.unsubscribe();
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

  obtenerPros(event:any){
    this.txtProspectiva=event.value;
    this.listarTiempo();
    this.listarCriteriosDesA();
    this.listaRespuesta();
  }

  async listarCriteriosDesA(){
    const valores={
      codigo:this.txtProspectiva,
      usuario: this.sessionUser
    }
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swCritDes.ListarAccionesSeleccionadasUsuario(valores).subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaCriterioDesA = datos.data;
      const dat={
        codigo:this.sessionUser
      }
      const datosE:listaI = await new Promise<listaI>((resolve) =>  this.swRespuesta.ValidacionEncuesta(dat).subscribe((translated) => { resolve(translated); }));
      if(datosE.success){
        this.banActivarBtn=false;
        this.texto=datosE.data[0].esen_fecha;
        this.texto2='La encuesta fue enviada el ';
       
      }else{
        this.banActivarBtn=true;
        this.texto='';
        this.texto2='';
      }
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

  async guardarEvaluacion(){
    this.evaluacion=[];
    var sum=0;
    for(let acciones of this.listaCriterioDesA){
      if(acciones.enc_respuesta>0){
        this.evaluacion.push({"accion":acciones.acc_id, "respuesta":acciones.enc_respuesta, "cri_des":acciones.cri_id});   
      }else{
        sum++;
      }
    }
    if(sum>0){
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.SeleccionarTodo});
    }else{
      const respuestas={
        respuesta:this.evaluacion,
        usuario:this.sessionUser,
        rol:this.sessionRolId
      }
      const datos = await new Promise<any>((resolve) =>
         this.swRespuesta.IngresarRespuesta(respuestas).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const dat={
          esen_usuario:this.sessionUser,
          esen_rol:this.sessionRolId,
          esen_estado:1
        }
        const dato = await new Promise<any>((resolve) =>
        this.swRespuesta.IngresarEncuestaEstado(dat).subscribe((translated) => {resolve(translated);}));
        if(datos.success){
          this.listarCriteriosDesA();
          this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: this.mensajesg.ExitoProceso});
        }else{
          this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});  
        }
      }else{
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }
  }

  async listarTiempo(){
    const dat={
      prospectiva:this.txtProspectiva
    }
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swRespuesta.ListarTiempo(dat).subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      for(let tiempo of datos.data){
        if(tiempo.tiem_tipo==1 && tiempo.tiem_prospectiva==this.txtProspectiva){
          this.ffin=new Date(tiempo.tiem_fecha_fin);
          this.finicio=new Date(tiempo.tiem_fecha_inicio);
          if(new Date(tiempo.tiem_fecha_inicio)<new Date()){
            this.banActivar=true;
            this.banActivarBtn=true;
            this.subscription = interval(1000).subscribe(x => { this.getTimeDifference(); });
          }else{
            this.txtTiempo='La encuesta se habilitará el '+moment(tiempo.tiem_fecha_inicio).format('DD/MM/YYYY HH:mm:ss');
            this.subscriptionI=interval(1000).subscribe(x=>{this.getTimeDifferenceInicio();});
          }

          if(new Date(tiempo.tiem_fecha_fin)<new Date()){
            this.banActivar=false;
            this.banActivarBtn=false;
            this.txtTiempo='El tiempo para realizar la encuesta a terminado.';
          }
        }else{
          this.banActivar=false;
          this.banActivarBtn=false;
        }
      }
    }else{

    }
  }

  confirm1() {
    this.confirmationService.confirm({
        message: 'Una vez enviado no se podrá modificar las respuestas, ¿Esta seguro que desea enviar?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.guardarEvaluacion();
        },
        reject: (type:any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Se cancelo el envio'});
                break;
            }
        }
    });
}
}
