import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { listaI } from '../../Interface/seguridad';
import { SwArbolService } from '../../ServiciosWeb/Arbol/swArbol.service';
import { SwAuditoriaService } from '../../ServiciosWeb/Auditoria/swAuditoria.service';
import { SwCriteriosService } from '../../ServiciosWeb/Criterios/swCriterios.service';
import { SwEvalAccionService } from '../../ServiciosWeb/Evaluacion/swEvalAccion.service';
import { SwProspectivaService } from '../../ServiciosWeb/Prospectiva/swProspectiva.service';

@Component({
  selector: 'app-configprospectiva',
  templateUrl: './configprospectiva.component.html',
  styleUrls: ['./configprospectiva.component.scss'],
  providers:[MessageService, ConfirmationService]
})
export class ConfigprospectivaComponent implements OnInit {

  // Menú del home
  items: MenuItem[] = [];
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
  txtEliminar:boolean=false;
  sessionUser:string='';
  sessionRol:string='';
  txtProsEstado:boolean=true;
  listaRespuestas:any[]=[];
  txtValor:string='';
  eliminar:boolean=false;
  listaTipoArbol:any[]=[];
  txtTipoProspectiva:number=0;

  constructor(private route: ActivatedRoute, private sesiones:SesionUsuario, private swProspectiva:SwProspectivaService, private swCriterio: SwCriteriosService, private messageService: MessageService, private mensajesg:MensajesGenerales, private swAuditoria: SwAuditoriaService, private swRespuesta:SwEvalAccionService, private swTipoA: SwArbolService) { }

  async ngOnInit() {
    const datosS=await this.sesiones.obtenerDatosLogin();
    this.sesionDep=datosS.dep_nombre;
    this.sessionDepC=datosS.rpe_dependencia;
    this.sessionUser=datosS.rpe_persona;
    this.sessionRol=datosS.rol_nombre;
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
    this.txtEliminar=datosRol.rop_eliminar;
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items=[{label:datosRol.pop_nombre},{ label: datosRol.opc_nombre }];
    this.statuses = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 0 }
    ];
    this.listarProspectivas();
    this.listarFases();
    this.listarCriterios();
    this.listaRespuesta();
    this.listarTipoArbol();
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
    for(let pros of this.listaProspectivas){
      if(pros.pro_id==this.txtProspectiva){
        this.txtTipoProspectiva=pros.pro_tipo;
        if(pros.pro_estado==2){
          this.txtProsEstado=false;
        }else{
          this.txtProsEstado=true;
        }
      }
    }
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

  async listaRespuesta(){
    const dat={
      codigo:this.txtProspectiva
    }
    const datos:listaI= await new Promise<listaI>((resolve)=> this.swRespuesta.ListarRespuestaC(dat).subscribe((translated)=>{ resolve(translated); }));
    if(datos.success){
      this.listaRespuestas=datos.data;
    }else{
      this.listaRespuestas=[];
    }
  }

  async listarTipoArbol(){
    const dat={
      codigo:this.txtProspectiva
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swTipoA.ListaPartesC(dat).subscribe((translated)=>{ resolve(translated);}));
    console.log(datos);
    if(datos.success){
      this.listaTipoArbol=datos.data;
    }else{
      this.listaTipoArbol=[];
    }
  }

  obtenerPros(event:any){
    this.txtProspectiva=event.value;
    for(let pros of this.listaProspectivas){
      if(pros.pro_id==this.txtProspectiva){
        if(pros.pro_estado==2){
          this.txtProsEstado=false;
        }else{
          this.txtProsEstado=true;
        }
      }
    }
    this.listarCriterios();
    this.listaRespuesta();
    this.listarTipoArbol();
  }

  openNew(fase:any){
    if(this.txtIngresar){
      if(this.txtProspectiva== "0"){
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: "Debe seleccionar la prospectiva"});
      }else{
        if(fase==4){
          this.tituloModal='Ingresar Respuesta';
        }else if(fase==5){
          this.tituloModal='Ingresar Tipo de Árbol';
        }else{
          this.tituloModal='Ingresar Criterio';
        }
        this.txtCodigo=0;
        this.txtNombre='';
        this.txtEstado='';
        this.txtFase=fase;
        this.eliminar=false;
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
     cri_prospectiva:this.txtProspectiva,
     cri_fase:this.txtFase
    };
    if (this.txtNombre == '') {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    } else if(this.txtCodigo==0 && this.txtFase!=4 && this.txtFase!=5){
      const datos = await new Promise<any>((resolve) =>
         this.swCriterio.IngresarCriterios(datoscri).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar criterios con los datos: {nombre: "+this.txtNombre+", prospectiva: "+this.txtProspectiva+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterios = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Criterio ' + this.mensajesg.IngresadoCorrectamente});
        this.listarCriterios();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else if(this.txtCodigo==0 && this.txtFase==4){
      const datosres={
        res_nombre:this.txtNombre,
        res_valor:this.txtValor,
        res_prospectiva:this.txtProspectiva
      }
      const datos = await new Promise<any>((resolve) =>
         this.swCriterio.IngresarRespuesta(datosres).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar respuesta con los datos: {Nombre: "+this.txtNombre+", Prospectiva: "+this.txtProspectiva+", Valor: "+this.txtValor+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterios = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Respuesta ' + this.mensajesg.IngresadoCorrectamente});
        this.listaRespuesta();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else if(this.txtCodigo==0 && this.txtFase==5){
      const datosres={
        tarb_nombre:this.txtNombre,
        tarb_prospectiva:this.txtProspectiva
      }
      const datos = await new Promise<any>((resolve) =>
         this.swTipoA.IngresarTipoArbol(datosres).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar tipo árbol con los datos: {Nombre: "+this.txtNombre+", Prospectiva: "+this.txtProspectiva+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterios = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Respuesta ' + this.mensajesg.IngresadoCorrectamente});
        this.listarTipoArbol();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else if(this.txtCodigo!=0 && this.txtFase!=4 && this.txtFase!=5){
      const datos = await new Promise<any>((resolve) =>
         this.swCriterio.ModificarCriterios(datoscri).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Modificar",
          aud_descripcion:"Modificar criterios con los datos: {código:"+this.txtCodigo+", nombre: "+this.txtNombre+", prospectiva: "+this.txtProspectiva+", estado: "+this.txtEstado+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterios = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Criterio ' + this.mensajesg.ModificadoCorrectamente});
        this.listarCriterios();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else if(this.txtCodigo!=0 && this.txtFase==4 && !this.eliminar){
      const datosres={
        res_id: this.txtCodigo,
        res_nombre:this.txtNombre,
        res_valor:this.txtValor,
        res_prospectiva:this.txtProspectiva,
        res_estado:this.txtEstado
      }
      const datos = await new Promise<any>((resolve) =>
         this.swCriterio.ModificarRespuesta(datosres).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Modificar",
          aud_descripcion:"Modificar respuesta con los datos: {código:"+this.txtCodigo+", nombre: "+this.txtNombre+", prospectiva: "+this.txtProspectiva+", estado: "+this.txtEstado+", valor: "+this.txtValor+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterios = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Respuesta ' + this.mensajesg.ModificadoCorrectamente});
        this.listaRespuesta();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else if(this.txtCodigo!=0 && this.txtFase==5 && !this.eliminar){
      const datosres={
        tarb_id: this.txtCodigo,
        tarb_nombre:this.txtNombre,
        tarb_prospectiva:this.txtProspectiva,
        tarb_estado:this.txtEstado
      }
      const datos = await new Promise<any>((resolve) =>
         this.swTipoA.ModificarTipoArbol(datosres).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Modificar",
          aud_descripcion:"Modificar tipo de árbol con los datos: {código:"+this.txtCodigo+", nombre: "+this.txtNombre+", prospectiva: "+this.txtProspectiva+", estado: "+this.txtEstado+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterios = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Respuesta ' + this.mensajesg.ModificadoCorrectamente});
        this.listarTipoArbol();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else if(this.txtCodigo!=0 && this.eliminar && this.txtFase==4){
      const datosres={
        res_id: this.txtCodigo,
        res_nombre:this.txtNombre,
        res_valor:this.txtValor,
        res_prospectiva:this.txtProspectiva
      }
      const datos = await new Promise<any>((resolve) =>
         this.swCriterio.EliminarRespuesta(datosres).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Eliminar",
          aud_descripcion:"Eliminar respuesta con los datos: {código:"+this.txtCodigo+", nombre: "+this.txtNombre+", prospectiva: "+this.txtProspectiva+", estado: "+this.txtEstado+", valor: "+this.txtValor+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterios = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Respuesta ' + this.mensajesg.EliminadoCorrectamente});
        this.listaRespuesta();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else if(this.txtCodigo!=0 && this.eliminar && this.txtFase==5){
      const datosres={
        tarb_id: this.txtCodigo,
        tarb_nombre:this.txtNombre,
        tarb_prospectiva:this.txtProspectiva
      }
      const datos = await new Promise<any>((resolve) =>
         this.swTipoA.EliminarTipoArbol(datosres).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Eliminar",
          aud_descripcion:"Eliminar tipo de árbol con los datos: {código:"+this.txtCodigo+", nombre: "+this.txtNombre+", prospectiva: "+this.txtProspectiva+", estado: "+this.txtEstado+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterios = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Respuesta ' + this.mensajesg.EliminadoCorrectamente});
        this.listarTipoArbol();
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
      this.txtFase=criterio.cri_fase;
      this.modalCriterios=true;
      this.eliminar=false;
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  modificarRespuesta(respuesta:any, fase:any){
    if(this.txtModificar){
      if(fase==4){
        this.tituloModal='Modificar Respuesta';
        this.txtCodigo=respuesta.res_id;
        this.txtNombre=respuesta.res_nombre;
        this.txtEstado=respuesta.res_estado;
        this.txtValor=respuesta.res_valor;
      }else{
        this.tituloModal='Modificar Tipo de Árbol';
        this.txtCodigo=respuesta.tarb_id;
        this.txtNombre=respuesta.tarb_nombre;
        this.txtEstado=respuesta.tarb_estado;
      }
      this.txtFase=fase;
      this.eliminar=false;
      this.modalCriterios=true;
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  eliminarRespuesta(respuesta:any, fase:any){
    if(this.txtEliminar){
      if(fase==4){
        this.tituloModal="Eliminar Respuesta";
        this.txtCodigo=respuesta.res_id;
        this.txtNombre=respuesta.res_nombre;
        this.txtEstado=respuesta.res_estado;
        this.txtValor=respuesta.res_valor;
      }else{
        this.tituloModal="Eliminar Tipo de Árbol";
        this.txtCodigo=respuesta.tarb_id;
        this.txtNombre=respuesta.tarb_nombre;
        this.txtEstado=respuesta.tarb_estado;
      }
      this.txtFase=fase;
      this.eliminar=true;
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
      this.eliminar=false;
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
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar encabezado con los datos: {código:"+this.txtCodigoE+", nombre: "+this.txtEncabezado+", criterio: "+this.txtCodigo+", encabezado acciones: "+this.txtEncabezadoA+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
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
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Modificar",
          aud_descripcion:"Modificar encabezado con los datos: {código:"+this.txtCodigoE+", nombre: "+this.txtEncabezado+", criterio: "+this.txtCodigo+", encabezado acciones: "+this.txtEncabezadoA+", estado: "+this.txtEstado+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
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
      this.eliminar=false;
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }
}
