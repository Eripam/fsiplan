import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService, TreeNode } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { listaI } from '../../Interface/planEstrategico';
import { SwEstructuraPlanService } from '../../ServiciosWeb/EstructuraPlan/swEstructuraPlan.service';
import { SwPlanService } from '../../ServiciosWeb/Plan/swPlan.service';

@Component({
  selector: 'app-mapa-estrategico',
  templateUrl: './mapa-estrategico.component.html',
  styleUrls: ['./mapa-estrategico.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class MapaEstrategicoComponent implements OnInit {
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
  listaEstructuraPlan:any=[];
  estructura: TreeNode[]=[];
  selectedNode!: TreeNode;
  displayModal:boolean=false;
  displayModal2:boolean=false;
  tituloModal:string="";
  tituloModal2:string="";
  dato:any=[];
  //Datos barras
  basicData: any;
  basicOptions: any;

constructor(private sesiones:SesionUsuario, private messageService: MessageService, private mensajesg:MensajesGenerales, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService, private swPlan: SwPlanService, private swEsPlan: SwEstructuraPlanService) { }

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
  this.listarEstructuraPlan();
  const datosRol=await this.sesiones.obtenerOpcionesUsuario(valores);
  this.items=[{label:datosRol.pop_nombre},{ label: datosRol.opc_nombre }]
  //Menu superio con enlace del home
  this.home = { icon: 'pi pi-home', routerLink: '/' };
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

obtenerEst(event:any){
  this.txtPlan=event.value;
  this.listarPlanEstrategico();
  this.listarEstructuraPlan();
}

async listarEstructuraPlan(){
  const dat={
    codigo:this.txtPlan
  }
  const datos:listaI=await new Promise<listaI>((resolve)=> this.swEsPlan.ListaEstructuraPlanMapa(dat).subscribe((translated)=> { resolve(translated)}));
  if(datos.success){
    this.listaEstructuraPlan=datos.data; 
  }else{
    this.listaEstructuraPlan=[];
  }
  this.loading = false;
}

  onNodeSelect(event:Event) {
    console.log(event);
    this.messageService.add({severity: 'success', summary: 'Node Selected', detail: 'Prueba'});
  }

  async abrirModal(est:any){
    this.estructura=[];
    this.tituloModal=est.est_codigo+'-'+est.eplan_codigo;
    const dat={
      codigo:est.eplan_id
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swEsPlan.ListaEstructuraPlanMapaHijos(dat).subscribe((translated)=> { resolve(translated)}));
    if(datos.success){
      this.estructura=datos.data; 
      this.dato=datos.data;
    }else{
      this.dato=[];
      this.estructura=[];
    }
    this.displayModal=true;
  }

  mostrarResultados(est:any){
    console.log(est);
    this.tituloModal2="Resultados";
    this.displayModal2=true;
    this.basicData = {
      labels: ['I cuatrimestre', 'II cuatrimestre', 'III cuatrimestre'],
      datasets: [
          {
              label: 'Eficacia',
              backgroundColor: ['rgba(0,128,0, 0.4)','rgba(247,255,0, 0.4)','rgba(0,128,0, 0.4)'],
              data: [75, 50, 80]
          },
          {
              label: 'Eficiencia',
              backgroundColor: ['rgba(255,0,0, 0.4)', 'rgba(247,255,0, 0.4)', 'rgba(0,128,0, 0.4)'],
              data: [10, 40, 70]
          },
          {
            label: 'Efectividad',
            backgroundColor: ['rgba(247,255,0, 0.4)', 'rgba(247,255,0, 0.4)', 'rgba(0,128,0, 0.4)'],
            data: [42.5, 45, 75]
        }
      ]
  };
  }
}
