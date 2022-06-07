import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { listaI, tipo_arbol } from '../../Interface/seguridad';
import { SwArbolService } from '../../ServiciosWeb/Arbol/swArbol.service';
import { SwAuditoriaService } from '../../ServiciosWeb/Auditoria/swAuditoria.service';
import { SwEvalAccionService } from '../../ServiciosWeb/Evaluacion/swEvalAccion.service';
import { SwProspectivaService } from '../../ServiciosWeb/Prospectiva/swProspectiva.service';

@Component({
  selector: 'app-arbol',
  templateUrl: './arbol.component.html',
  styleUrls: ['./arbol.component.scss'],
  providers:[MessageService, ConfirmationService]
})
export class ArbolComponent implements OnInit {

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
   listaResultados:any[]=[]
   listaPartes:tipo_arbol[]=[];
   listaEstructura:any[]=[];
   modalArbol:boolean=false;
   tituloModal:string='';
   txtCodigo:number=0;
   txtNombre:string='';
   txtTipo:number=0;
   eliminar:boolean=false;
   txtProsEstado:boolean=true;

  constructor(private route: ActivatedRoute, private sesiones:SesionUsuario, private swProspectiva:SwProspectivaService, private swRespuesta: SwEvalAccionService, private swArbol: SwArbolService, private mensajesg: MensajesGenerales, private messageService: MessageService, private swAuditoria: SwAuditoriaService) { }

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
    for(let pros of this.listaProspectivas){
      if(pros.pro_id==this.txtProspectiva){
        if(pros.pro_estado==2){
          this.txtProsEstado=false;
        }else{
          this.txtProsEstado=true;
        }
      }
    }
    this.listaResultadosE();
    this.listaPartesArbol();
    this.listaEstructuraArbol();
  }

  async listaResultadosE(){
    const dat={
      codigo:this.txtProspectiva,
      tipo:3
    }
    const datos:listaI= await new Promise<listaI>((resolve)=> this.swRespuesta.ListaRespuestaE(dat).subscribe((translated)=>{ resolve(translated); }));
    if(datos.success){
       this.listaResultados=datos.data;
    }else{
       this.listaResultados=[];
    }
  }

  async listaPartesArbol(){
    const dat={
      codigo:this.txtProspectiva
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swArbol.ListaPartes(dat).subscribe((translated)=>{ resolve(translated);}));
    if(datos.success){
      this.listaPartes=datos.data;
    }else{
      this.listaPartes=[];
    }
  }

  async guardarPartes(accion:any){
    if(this.txtIngresar){
      const dat={
        estr_descripcion:accion.acc_descripcion,
        estr_tipo:accion.estr_tipo,
        estr_accion:accion.acc_id,
        estr_prospectiva:this.txtProspectiva
      }
      if(accion.estr_tipo==0){
        const datos = await new Promise<any>((resolve) => this.swArbol.EliminarArbol(dat).subscribe((translated) => {resolve(translated);}));
        if (datos.success) {
          const datosAudi={
            aud_usuario:this.sessionUser,
            aud_proceso:"Ingresar",
            aud_descripcion:"Ingresar estructura árbol con los datos: {Descripción:"+accion.acc_descripcion+", tipo: "+accion.estr_tipo+", acción: "+accion.acc_id+", prospectiva: "+this.txtProspectiva+"}",
            aud_rol:this.sessionRol,
            aud_dependencia:this.sessionDepC
          }
          const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
          this.messageService.add({severity:'success', summary:this.mensajesg.CabeceraExitoso, detail: this.mensajesg.EliminadoCorrectamente});
        }else{
          this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
        }
      }else{
        const datos = await new Promise<any>((resolve) => this.swArbol.IngresarArbol(dat).subscribe((translated) => {resolve(translated);}));
        if (datos.success) {
          const datosAudi={
            aud_usuario:this.sessionUser,
            aud_proceso:"Ingresar",
            aud_descripcion:"Ingresar estructura árbol con los datos: {Descripción:"+accion.acc_descripcion+", tipo: "+accion.estr_tipo+", acción: "+accion.acc_id+", prospectiva: "+this.txtProspectiva+"}",
            aud_rol:this.sessionRol,
            aud_dependencia:this.sessionDepC
          }
          const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
          this.messageService.add({severity:'success', summary:this.mensajesg.CabeceraExitoso, detail: this.mensajesg.IngresadoCorrectamente});
        }else{
          this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
        }
      }
      this.listaResultadosE();
      this.listaEstructuraArbol();
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  async listaEstructuraArbol(){
    const dat={
      codigo:this.txtProspectiva
    }
    const datos:listaI=await new Promise<listaI>((resolve)=> this.swArbol.ListaEstructura(dat).subscribe((translated)=>{ resolve(translated);}));
    if(datos.success){
      this.listaEstructura=datos.data;
    }else{
      this.listaEstructura=[];
    }
  }

  agregarNuevo(tipo:any){
    if(this.txtIngresar){
      this.txtTipo=tipo.tarb_id;
      this.tituloModal='Agregar '+tipo.tarb_nombre;
      this.txtNombre='';
      this.txtCodigo=0;
      this.modalArbol=true;
      this.eliminar=false;
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  hideDialogA(){
    this.modalArbol=false;
  }

  async guardarDatos(){
    const dat={
      estr_descripcion:this.txtNombre,
      estr_tipo:this.txtTipo,
      estr_accion:0,
      estr_prospectiva:this.txtProspectiva,
      estr_id:this.txtCodigo
    }
    var datos;
    if(this.txtCodigo>0 && !this.eliminar){
      datos = await new Promise<any>((resolve) => this.swArbol.ModificarArbol(dat).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Modificar",
          aud_descripcion:"Modificar estructura árbol con los datos: {Código: "+this.txtCodigo+", Descripción:"+this.txtNombre+", prospectiva: "+this.txtProspectiva+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.messageService.add({severity:'success', summary:this.mensajesg.CabeceraExitoso, detail: this.mensajesg.ModificadoCorrectamente});
        this.modalArbol=false;
        this.listaEstructuraArbol();
      }else{
        this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else if(this.txtCodigo==0){
      datos = await new Promise<any>((resolve) => this.swArbol.IngresarArbol(dat).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar estructura árbol con los datos: {Descripción:"+this.txtNombre+", acción: 0,tipo: "+this.txtTipo+", prospectiva: "+this.txtProspectiva+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.messageService.add({severity:'success', summary:this.mensajesg.CabeceraExitoso, detail: this.mensajesg.IngresadoCorrectamente});
        this.modalArbol=false;
        this.listaEstructuraArbol();
      }else{
        this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else{
      datos = await new Promise<any>((resolve) => this.swArbol.EliminarArbolID(dat).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Eliminar",
          aud_descripcion:"Eliminar estructura árbol con los datos: {Código: "+this.txtCodigo+", Descripción:"+this.txtNombre+", prospectiva: "+this.txtProspectiva+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.messageService.add({severity:'success', summary:this.mensajesg.CabeceraExitoso, detail: this.mensajesg.EliminadoCorrectamente});
        this.modalArbol=false;
        this.listaEstructuraArbol();
      }else{
        this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }
  }

  modificarDato(datos:any, tipo:string){
    if(this.txtModificar){
      this.txtTipo=0;
      this.tituloModal='Modificar '+tipo;
      this.txtNombre=datos.estr_descripcion;
      this.txtCodigo=datos.estr_id
      this.modalArbol=true;
      this.eliminar=false;
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  eliminarDato(datos:any, tipo:string){
    if(this.txtEliminar){
      this.txtTipo=0;
      this.tituloModal='Eliminar '+tipo;
      this.txtNombre=datos.estr_descripcion;
      this.txtCodigo=datos.estr_id
      this.modalArbol=true;
      this.eliminar=true;
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }
}
