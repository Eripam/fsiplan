import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { listaI } from '../../Interface/seguridad';
import { SwAuditoriaService } from '../../ServiciosWeb/Auditoria/swAuditoria.service';
import { SwCriteriosService } from '../../ServiciosWeb/Criterios/swCriterios.service';
import { SwCriteriosDesService } from '../../ServiciosWeb/Criterios/swCriteriosDes.service';
import { SwProspectivaService } from '../../ServiciosWeb/Prospectiva/swProspectiva.service';

@Component({
  selector: 'app-seleccionr-accion',
  templateUrl: './seleccionar-accion.component.html',
  styleUrls: ['./seleccionar-accion.component.scss'],
  providers:[MessageService, ConfirmationService]
})
export class SeleccionrAccionComponent implements OnInit {
// Menú del home
items: MenuItem[] = [{ label: 'Selección de Acciones' }];
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
//Modal
modalCriterioDes:boolean=false;
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
btnGuardar:string='Guardar';
btnCancelar:string='Cancelar';

constructor(private route: ActivatedRoute, private sesiones:SesionUsuario, private swProspectiva:SwProspectivaService, private swCriterio: SwCriteriosService, private mensajesg:MensajesGenerales, private messageService: MessageService, private swCritDes: SwCriteriosDesService, private swAuditoria: SwAuditoriaService) { }

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
    cri_prospectiva:this.txtProspectiva
  }
  const datos:listaI = await new Promise<listaI>((resolve) =>  this.swCritDes.ListarCriteriosDes(valores).subscribe((translated) => { resolve(translated); }));
  if(datos.success){
    this.listaCriterioDes = datos.data;
  }else{
    this.listaCriterioDes =[];
  }
  this.loading = false;
  console.log(this.listaCriterioDes);
}

obtenerPros(event:any){
  this.txtProspectiva=event.value;
  this.listarCriterios();
  this.listarCriteriosDes();
}
}
