import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { listaI } from '../../Interface/seguridad';
import { SwCriteriosService } from '../../ServiciosWeb/Criterios/swCriterios.service';
import { SwProspectivaService } from '../../ServiciosWeb/Prospectiva/swProspectiva.service';

@Component({
  selector: 'app-configprospectiva',
  templateUrl: './configprospectiva.component.html',
  styleUrls: ['./configprospectiva.component.scss'],
  providers:[MessageService, ConfirmationService]
})
export class ConfigprospectivaComponent implements OnInit {

  // Menú del home
  items: MenuItem[] = [{ label: 'Gestión de Prospectiva' }];
  home!: MenuItem;
  //Variable para los estados de usuario
  statuses!: any[];
  sesionDep:string='';
  sessionDepC: string='';
  //Variable para mostrar el loading en la tabla
  loading: boolean = true;
  modalCriterios:boolean=false;
  modalEncabezados:boolean=false;
  tituloModal:string='';

  listaCriterios:any[]=[];
  listaI:listaI[]=[];
  listaProspectivas:any[]=[];
  txtProspectiva:string="";
  txtCodigo:number=0;
  txtNombre:string='';
  txtEstado:string='';
  txtEncabezado:string='';
  txtEncabezadoC:string='';
  txtEncabezadoA:string='';
  txtCodigoE:number=0;
  listaFase:any[]=[];
  txtFase:number=0;
  txtIngresar:boolean=false;
  txtModificar:boolean=false;

  constructor(private route: ActivatedRoute, private sesiones:SesionUsuario, private swProspectiva:SwProspectivaService, private swCriterio: SwCriteriosService, private messageService: MessageService, private mensajesg:MensajesGenerales) { }

  async ngOnInit() {
    const datosS=await this.sesiones.obtenerDatosLogin();
    this.sesionDep=datosS.dep_nombre;
    this.sessionDepC=datosS.rpe_dependencia;
    var pros=this.route.snapshot.paramMap.get('pros');
    if(pros=="0"){
      this.txtProspectiva="0";
    }else{
      this.txtProspectiva=JSON.parse(pros || '{}');
    }
    const valores={
      rol:datosS.rpe_rol,
      opcion:this.route.snapshot.paramMap.get('opc'),
      padreop:this.route.snapshot.paramMap.get('enc')
    }
    const datosRol=await this.sesiones.obtenerOpcionesUsuario(valores);
    this.txtIngresar=datosRol.rop_insertar;
    this.txtModificar=datosRol.rop_modificar;
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.listarProspectivas();
    this.listarCriterios();
    this.listarFases();
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
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swCriterio.ListarCriterios(dat).subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaCriterios = datos.data;
    }else{
      this.listaCriterios =[];
    }
    this.loading = false;
  }

  async listarFases(){
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swCriterio.ListarFases().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaFase = datos.data;
    }else{
      this.listaFase =[];
    }
    this.loading = false;
  }

  obtenerPros(event:any){
    this.txtProspectiva=event.value;
    this.listarCriterios();
  }

  openNew(fase:any){
    if(this.txtIngresar){
      if(this.txtProspectiva== "0"){
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: "Debe seleccionar la prospectiva"});
      }else{
        this.tituloModal='Ingresar Criterio';
        this.txtCodigo=0;
        this.txtNombre='';
        this.txtEstado='';
        this.txtFase=fase;
        this.modalCriterios=true;
      }
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  hideDialogP(){
    this.modalCriterios=false;
  }

  hideDialogEn(){
    this.modalEncabezados=false;
  }

  async guardarCriterios(){
    if(this.txtProspectiva== "0"){
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: "Debe seleccionar la prospectiva"});
    }else{
    const datoscri={
     cri_id:this.txtCodigo,
     cri_nombre:this.txtNombre,
     cri_estado:this.txtEstado,
     cri_prospectiva:this.txtProspectiva
    };
    if (this.txtNombre == '') {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    } else if(this.txtCodigo==0){
      const datos = await new Promise<any>((resolve) =>
         this.swCriterio.IngresarCriterios(datoscri).subscribe((translated) => {resolve(translated);}));

      if (datos.success) {
        this.modalCriterios = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Criterio ' + this.mensajesg.IngresadoCorrectamente});
        this.listarCriterios();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else{
      const datos = await new Promise<any>((resolve) =>
         this.swCriterio.ModificarCriterios(datoscri).subscribe((translated) => {resolve(translated);}));

      if (datos.success) {
        this.modalCriterios = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Criterio ' + this.mensajesg.ModificadoCorrectamente});
        this.listarCriterios();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }
  }
  }

  modificarCriterio(criterio:any){
    if(this.txtModificar){
      this.tituloModal='Modificar Criterio';
      this.txtCodigo=criterio.cri_id;
      this.txtNombre=criterio.cri_nombre;
      this.txtEstado=criterio.cri_estado;
      this.modalCriterios=true;
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  agregarEncabezado(criterio:any){
    if(this.txtIngresar){
      this.txtEncabezado='';
      this.tituloModal='Agregar Encabezados';
      this.txtNombre=criterio.cri_nombre;
      this.txtCodigo=criterio.cri_id;
      this.txtEncabezadoA='';
      this.txtEncabezadoC='';
      this.txtEstado='';
      this.modalEncabezados=true;
      this.txtCodigoE=0;
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  async guardarEncabezado(){
    const datoscri={
     enc_id:this.txtCodigoE,
     enc_descripcion:this.txtEncabezado,
     enc_estado:this.txtEstado,
     enc_criterio:this.txtCodigo,
     enc_consecuencias:this.txtEncabezadoC,
     enc_acciones:this.txtEncabezadoA
    };
    if (this.txtEncabezado == '' || this.txtEncabezadoA=='' || this.txtEncabezadoC=='') {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    } else if(this.txtCodigoE==0){
      const datos = await new Promise<any>((resolve) =>
         this.swCriterio.IngresarEncabezado(datoscri).subscribe((translated) => {resolve(translated);}));

      if (datos.success) {
        this.modalEncabezados = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Encabezado ' + this.mensajesg.IngresadoCorrectamente});
        this.listarCriterios();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else{
      const datos = await new Promise<any>((resolve) =>
         this.swCriterio.ModificarEncabezado(datoscri).subscribe((translated) => {resolve(translated);}));

      if (datos.success) {
        this.modalEncabezados = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Encabezado ' + this.mensajesg.ModificadoCorrectamente});
        this.listarCriterios();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }
  }

  modificarEncabezado(Encabezado:any){
    if(this.txtModificar){
      this.tituloModal='Modificar Encabezados';
      this.txtCodigoE=Encabezado.enc_id;
      this.txtEncabezado=Encabezado.enc_descripcion;
      this.txtEncabezadoC=Encabezado.enc_consecuencias;
      this.txtEncabezadoA=Encabezado.enc_acciones;
      this.modalEncabezados=true;
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }
}
