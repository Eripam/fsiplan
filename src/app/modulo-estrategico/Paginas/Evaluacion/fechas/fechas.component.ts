import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { listaI } from 'src/app/modulo-estrategico/Interface/planEstrategico';
import { SwCronogramaService } from 'src/app/modulo-estrategico/ServiciosWeb/Cronograma/swCronograma.service';
import { SwPlanService } from 'src/app/modulo-estrategico/ServiciosWeb/Plan/swPlan.service';

@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FechasComponent implements OnInit {

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
  modalFechas!:boolean;
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
  listaFechas:any=[];
  eliminar:boolean=false;
  txtTipo:number=0;
  txtAnio:number=0;
  txtPlan:string="";
  txtPeriodo:number=0;
  cols: any[]=[];
  anios:any[]=[];
  listaTipos:any=[]=[];
  //Variable para mostrar el loading en la tabla
  loading: boolean = true;
  tipos:any=[]=[];
  fechaI:any;
  fechaF:any;
  
  constructor(private sesiones:SesionUsuario, private messageService: MessageService, private mensajesg:MensajesGenerales, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService, private swPlan: SwPlanService, private swConfiguracion: SwCronogramaService) { }

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
    this.listarFechas();
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
    this.listaTipos=[
      { label:'Institucional', value:1},
      { label: 'Unidades Académicas y Administrativas', value:2}
    ];

    this.tipos=[
      { label: 'Carga de evidencias', value:1},
      { label: 'Evaluación', value:2}
    ]
  }

  async listarPlanEstrategico(){
    this.cols=[];
    const dat={
      tipo:0,
      codigo:this.sessionDepC
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swPlan.ListaPlanes(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.listaPlanE=datos.data;
      var fechai, fechaf;
      for(let dat of datos.data){
         if(dat.plan_dependencia==1){
           fechai=dat.plan_fecha_inicio;
           fechaf=dat.plan_fecha_fin;
           const dat2={
              perp_plan:dat.plan_id
           }
           const datos2:listaI=await new Promise<listaI>((resolve)=> this.swConfiguracion.ListarPeriodoPlan(dat2).subscribe((translated)=>{resolve(translated)}));
           if(datos2.success){
              for(var i=1; i<=datos2.data[0].per_maximo; i++){
                this.anios.push({"value":i, "label":"Período "+i});
              }
           }
         }
       }
       var anio1=Number(moment(fechai).format('YYYY'));
       var anio2=Number(moment(fechaf).format('YYYY'));
       for(let i=anio1; i<=anio2; i++){
         this.cols.push({"anio":i});
       }
    }else{
      this.listaPlanE=[];
    }
    this.loading = false;
  }

  listarFechas(){

  }

  guardarFecha(){

  }

  hideDialogP(){
    this.modalFechas=false;
  }

  openNew(){
    if(this.txtIngresar){
      this.tituloModal="Agregar Fecha";
      this.modalFechas=true;
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.NoAutorizado, detail: this.mensajesg.NoAutorizado});
    }
  }
}