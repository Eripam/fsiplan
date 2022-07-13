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
  data1: TreeNode[]=[];
  selectedNode!: TreeNode;
  displayModal:boolean=false;
  tituloModal:string="";

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

  this.data1 = [{
    label: 'CEO',
    type: 'person',
    styleClass: 'p-person',
    expanded: false,
    data: {name:'Walter White', 'icono': 'walter.jpg'},
    children: [
        {
            label: 'CFO',
            type: 'person',
            styleClass: 'p-person',
            expanded: false,
            data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
            children:[{
                label: 'Tax',
                styleClass: 'department-cfo'
            },
            {
                label: 'Legal',
                styleClass: 'department-cfo'
            }],
        },
        {
            label: 'COO',
            type: 'person',
            styleClass: 'p-person',
            expanded: false,
            data: {name:'Mike E.', 'avatar': 'mike.jpg'},
            children:[{
                label: 'Operations',
                styleClass: 'department-coo'
            }]
        },
        {
            label: 'CTO',
            type: 'person',
            styleClass: 'p-person',
            expanded: false,
            data: {name:'Jesse Pinkman', 'avatar': 'jesse.jpg'},
            children:[{
                label: 'Development',
                styleClass: 'department-cto',
                expanded: false,
                children:[{
                    label: 'Analysis',
                    styleClass: 'department-cto'
                },
                {
                    label: 'Front End',
                    styleClass: 'department-cto'
                },
                {
                    label: 'Back End',
                    styleClass: 'department-cto'
                }]
            },
            {
                label: 'QA',
                styleClass: 'department-cto'
            },
            {
                label: 'R&D',
                styleClass: 'department-cto'
            }]
        }
    ]
}];
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
  console.log(this.listaEstructuraPlan);
}

  onNodeSelect(event:any) {
    this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
  }

  abrirModal(est:any){
    this.tituloModal=est.est_codigo+'-'+est.eplan_codigo;
    this.displayModal=true;
  }
}
