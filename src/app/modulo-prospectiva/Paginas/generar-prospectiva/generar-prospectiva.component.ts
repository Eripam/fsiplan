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
  selector: 'app-generar-prospectiva',
  templateUrl: './generar-prospectiva.component.html',
  styleUrls: ['./generar-prospectiva.component.scss'],
  providers:[MessageService, ConfirmationService]
})
export class GenerarProspectivaComponent implements OnInit {

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
  listaCriteriosPadre:any[]=[];
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
  txtProsEstado:boolean=true;
  txtTipoBan: boolean =false;
  txtTitulo:string='';
  txtProspectivaPadre:number=0;
  txtSeleccion:string='';
  listaProspectivasA:any[]=[];
  txtSeleccionP:string='';
  txtCodigoCri:number=0;
  txtTipoP:number=0;
  txtBanM:boolean=false;

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

  async listarProspectivasA(){
    const dato:listaI = await new Promise<listaI>((resolve)=> this.swProspectiva.ListarProspectivaApro().subscribe((translated)=> {resolve(translated);}));
    if(dato.success){
      this.listaProspectivasA=dato.data;
    }else{
      this.listaProspectivasA=[];
    }
    this.loading=false;
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

  async listarCriteriosPadre(criterio:any){
    const valores={
      cri_prospectiva:this.txtSeleccionP,
      tipo:4,
      codigo:criterio
    }
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swCritDes.ListarCriteriosDes(valores).subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaCriteriosPadre = datos.data;
    }else{
      this.listaCriteriosPadre =[];
    }
    this.loading = false;
  }

  async listarFases(){
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swCriterio.ListarFasesGenerar().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaFase = datos.data;
    }else{
      this.listaFase =[];
    }
    this.loading = false;
  }

  async listarCriteriosDes(){
    const valores={
      cri_prospectiva:this.txtProspectiva,
      tipo:1
    }
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swCritDes.ListarCriteriosDes(valores).subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaCriterioDes = datos.data;
    }else{
      this.listaCriterioDes =[];
    }
    this.loading = false;
  }

  obtenerPros(event:any){
    this.txtProspectiva=event.value;
    for(let pros of this.listaProspectivas){
      if(pros.pro_id==this.txtProspectiva){
        this.txtTipoP=pros.pro_tipo;
        if(pros.pro_estado==2){
          this.txtProsEstado=false;
        }else{
          this.txtProsEstado=true;
        }
        if(pros.pro_tipo==1){
          this.txtTipoBan=false;
          this.txtProspectivaPadre=pros.pro_id;
        }else{
          this.txtTipoBan=true;
          this.txtProspectivaPadre=pros.pro_proid;
        }
      }
    }
    this.listarCriterios();
    this.listarFases();
    this.listarCriteriosDes();
  }

  hidenModal(){
    this.modalCriterioDes=false;
  }

  openNewCD(cri:any){
    this.listaCriteriosPadre=[];
    if(this.txtIngresar){
      this.txtTipo=1;
      this.tituloModal='Ingresar '+cri.cri_nombre;
      this.txtTitulo=cri.cri_nombre;
      this.txtCriterioD=cri.cri_nombre;
      this.txtTexto=cri.enc_descripcion;
      this.txtNombre='';
      this.txtCodigoC=cri.cri_id;
      this.txtCodigoCD=0;
      this.txtCodigoCA=0;
      this.modalCriterioDes=true;
      this.txtSeleccionP='';
      this.txtCEliminar=false;
      this.btnGuardar='Guardar';
      this.btnCancelar='Cancelar';
      this.txtSeleccion='';
      this.txtCodigoCri=cri.cri_cri_id;
      this.txtBanM=true;
      console.log(this.txtTipoP);
      if(this.txtProsEstado && this.txtTipoP!=1){
        this.txtTipoBan=true;
        this.listarProspectivasA();
      }
    }else{
      this.txtTipo=0;
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  async ingresarCrides(){
    const valores={
      cdes_criterio:this.txtCodigoC,
      cdes_descripcion:this.txtNombre,
      cdes_id:this.txtCodigoCD,
      cdes_cdesid:this.txtSeleccion
    }
    if (this.txtNombre == '' && this.txtSeleccion=='') {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    } else if(this.txtTipo==1){
      const datos = await new Promise<any>((resolve) =>
         this.swCritDes.IngresarCriteriosDes(valores).subscribe((translated) => {resolve(translated);}));

      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar criterio_descripción con los datos: {Criterio:"+this.txtCodigoC+", Descripción: "+this.txtNombre+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterioDes = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: this.txtCriterioD+' ' + this.mensajesg.IngresadoCorrectamente});
        this.listarCriteriosDes();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else if(this.txtTipo==2){
      const datos = await new Promise<any>((resolve) =>
      this.swCritDes.ModificarCriteriosDes(valores).subscribe((translated) => {resolve(translated);}));

       if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Modificar",
          aud_descripcion:"Modificar criterio_descripción con los datos: {Código:"+this.txtCodigoCD+", Descripción: "+this.txtNombre+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
         this.modalCriterioDes = false;
         this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: this.txtCriterioD+' ' + this.mensajesg.ModificadoCorrectamente});
         this.listarCriteriosDes();
       } else {
         this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
       }
    }else if(this.txtTipo==3){
      const val={
        con_cdes:this.txtCodigoCD,
        con_descripcion:this.txtNombre
      }
      const datos = await new Promise<any>((resolve) =>
         this.swCritDes.IngresarConsecuencia(val).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar consecuencia con los datos: {Criterio:"+this.txtCodigoCD+", Descripción: "+this.txtNombre+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterioDes = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Consecuencia ' + this.mensajesg.IngresadoCorrectamente});
        this.listarCriteriosDes();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else if(this.txtTipo==4){
      const val={
        acc_cdes:this.txtCodigoCD,
        acc_descripcion:this.txtNombre
      }
      const datos = await new Promise<any>((resolve) =>
         this.swCritDes.IngresarAcciones(val).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar acción con los datos: {Criterio:"+this.txtCodigoCD+", Descripción: "+this.txtNombre+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterioDes = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Acción ' + this.mensajesg.IngresadoCorrectamente});
        this.listarCriteriosDes();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else if(this.txtTipo==5){
      const val={
        con_id:this.txtCodigoCA,
        con_descripcion:this.txtNombre
      }
      const datos = await new Promise<any>((resolve) =>
         this.swCritDes.ModificarConsecuencia(val).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Modificar",
          aud_descripcion:"Modificar consecuencia con los datos: {Código:"+this.txtCodigoCA+", Descripción: "+this.txtNombre+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterioDes = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Consecuencia ' + this.mensajesg.ModificadoCorrectamente});
        this.listarCriteriosDes();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else if(this.txtTipo==6){
      const val={
        acc_id:this.txtCodigoCA,
        acc_descripcion:this.txtNombre
      }
      const datos = await new Promise<any>((resolve) =>
         this.swCritDes.ModificarAccion(val).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Modificar",
          aud_descripcion:"Modificar acción con los datos: {Código:"+this.txtCodigoCA+", Descripción: "+this.txtNombre+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterioDes = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Acción ' + this.mensajesg.ModificadoCorrectamente});
        this.listarCriteriosDes();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else if(this.txtTipo==7){
      const val={
        codigo:this.txtCodigoCD
      }
      var validacion, datos;
      if(this.txtTipoEliminar==1){
        validacion = await new Promise<any>((resolve) =>
        this.swCritDes.ValidacionEliminacion(val).subscribe((translated) => {resolve(translated);}));
        if(validacion.data){
          this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.Loestanusando});
        }else{
          values={
             codigo:this.txtCodigoCD,
             tipo:1
          }
          datos = await new Promise<any>((resolve) =>this.swCritDes.EliminarCriterioD(values).subscribe((translated) => {resolve(translated);}));
             if (datos.success) {
              const datosAudi={
                aud_usuario:this.sessionUser,
                aud_proceso:"Eliminar",
                aud_descripcion:"Eliminar criterio_descripción con los datos: {Código:"+this.txtCodigoCD+", Descripción; "+this.txtNombre+"}",
                aud_rol:this.sessionRol,
                aud_dependencia:this.sessionDepC
              }
              const datosAud = await new Promise<any>((resolve) =>
              this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
              this.modalCriterioDes = false;
              this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: this.mensajesg.EliminadoCorrectamente});
              this.listarCriteriosDes();
            } else {
              this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
            }
        }
      }else if(this.txtTipoEliminar==2){
        validacion = await new Promise<any>((resolve) =>
         this.swCritDes.ValidacionEliminacionCon(val).subscribe((translated) => {resolve(translated);}));
        if(validacion.data){
          this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: 'No se puede eliminar porque las unidades o dependencia lo estan usando'});
        }else{
          var values:any;
          values={
             codigo:this.txtCodigoCD,
             tipo:1
          }
          const datos = await new Promise<any>((resolve) =>this.swCritDes.EliminarConsecuencia(values).subscribe((translated) => {resolve(translated);}));
          if (datos.success) {
            const datosAudi={
              aud_usuario:this.sessionUser,
              aud_proceso:"Eliminar",
              aud_descripcion:"Eliminar consecuencia con los datos: {Código:"+this.txtCodigoCD+", Descripción; "+this.txtNombre+"}",
              aud_rol:this.sessionRol,
              aud_dependencia:this.sessionDepC
            }
            const datosAud = await new Promise<any>((resolve) =>
            this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
              this.modalCriterioDes = false;
              this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Consecuencia ' + this.mensajesg.EliminadoCorrectamente});
              this.listarCriteriosDes();
          } else {
              this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
          }
        }
      }else if(this.txtTipoEliminar==3){
        validacion = await new Promise<any>((resolve) =>
         this.swCritDes.ValidacionEliminacionAcc(val).subscribe((translated) => {resolve(translated);}));
        if(validacion.data){
          this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: 'No se puede eliminar porque las unidades o dependencia lo estan usando'});
        }else{
          var values:any;
          values={
            codigo:this.txtCodigoCD,
            tipo:1
          }
          const datos = await new Promise<any>((resolve) =>this.swCritDes.EliminarAccion(values).subscribe((translated) => {resolve(translated);}));
          if (datos.success) {
            const datosAudi={
              aud_usuario:this.sessionUser,
              aud_proceso:"Eliminar",
              aud_descripcion:"Eliminar acción con los datos: {Código:"+this.txtCodigoCD+", Descripción; "+this.txtNombre+"}",
              aud_rol:this.sessionRol,
              aud_dependencia:this.sessionDepC
            }
            const datosAud = await new Promise<any>((resolve) =>
            this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
              this.modalCriterioDes = false;
              this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Acción ' + this.mensajesg.EliminadoCorrectamente});
              this.listarCriteriosDes();
          } else {
              this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
          }
        }
      }else{
        validacion = await new Promise<any>((resolve) =>
         this.swCritDes.ValidacionEliminacionUtopia(val).subscribe((translated) => {resolve(translated);}));
        if(validacion.data){
          this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: 'No se puede eliminar porque las unidades o dependencia lo estan usando'});
        }else{
          const val={
            uto_id:this.txtCodigoCA
          }
          const datos = await new Promise<any>((resolve) =>
             this.swCritDes.EliminarUtopia(val).subscribe((translated) => {resolve(translated);}));
          if (datos.success) {
            const datosAudi={
              aud_usuario:this.sessionUser,
              aud_proceso:"Eliminar",
              aud_descripcion:"Eliminar utopía con los datos: {Código:"+this.txtCodigoCA+", Descripción; "+this.txtNombre+"}",
              aud_rol:this.sessionRol,
              aud_dependencia:this.sessionDepC
            }
            const datosAud = await new Promise<any>((resolve) =>
            this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
            this.modalCriterioDes = false;
            this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Utopía ' + this.mensajesg.EliminadoCorrectamente});
            this.listarCriteriosDes();
          } else {
            this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
          }
        }
      }
    }else if(this.txtTipo==8){
      const val={
        uto_cridescripcion:this.txtCodigoCD,
        uto_descripcion:this.txtNombre
      }
      const datos = await new Promise<any>((resolve) =>
         this.swCritDes.IngresarUtopia(val).subscribe((translated) => {resolve(translated);}));

      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar utopía con los datos: {Criterio:"+this.txtCodigoCD+", Descripción: "+this.txtNombre+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterioDes = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Utopía ' + this.mensajesg.IngresadoCorrectamente});
        this.listarCriteriosDes();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else if(this.txtTipo==9){
      const val={
        uto_id:this.txtCodigoCA,
        uto_descripcion:this.txtNombre
      }
      const datos = await new Promise<any>((resolve) =>
         this.swCritDes.ModificarUtopia(val).subscribe((translated) => {resolve(translated);}));
      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Modificar",
          aud_descripcion:"Modificar utopía con los datos: {Código:"+this.txtCodigoCA+", Descripción: "+this.txtNombre+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalCriterioDes = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Utopía ' + this.mensajesg.ModificadoCorrectamente});
        this.listarCriteriosDes();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }
  }

  editarCriterioD(criterio:any, cri:any){
    if(this.txtModificar){
      this.txtTipo=2;
      this.tituloModal='Modificar '+cri.cri_nombre;
      this.txtCriterioD=cri.cri_nombre;
      this.txtTexto=cri.enc_descripcion;
      this.txtNombre=criterio.cdes_descripcion;
      this.txtCodigoC=cri.cri_id;
      this.txtCodigoCD=criterio.cdes_id;
      this.txtCodigoCA=0;
      this.modalCriterioDes=true;
      this.txtCEliminar=false;
      this.btnGuardar='Guardar';
      this.btnCancelar='Cancelar';
      this.txtBanM=false;
      this.txtSeleccionP='';
    }else{
      this.txtTipo=0;
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  agregarCon(criterio:any, cri:any){
    if(this.txtIngresar){
      this.txtTipo=3;
      this.tituloModal='Ingresar consecuencias';
      this.txtCriterioD=cri.cri_nombre;
      this.txtTexto=cri.enc_consecuencias;
      this.txtNombre='';
      this.txtCodigoC=cri.cri_id;
      this.txtCodigoCD=criterio.cdes_id;
      this.txtCodigoCA=0;
      this.modalCriterioDes=true;
      this.txtCEliminar=false;
      this.btnGuardar='Guardar';
      this.btnCancelar='Cancelar';
      this.txtTipoBan=false;
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  agregarUtop(criterio:any, cri:any){
    if(this.txtIngresar){
      this.txtTipo=8;
      this.tituloModal='Ingresar Utopía';
      this.txtCriterioD=cri.cri_nombre;
      this.txtTexto=cri.enc_consecuencias;
      this.txtNombre='';
      this.txtCodigoC=cri.cri_id;
      this.txtCodigoCD=criterio.cdes_id;
      this.txtCodigoCA=0;
      this.modalCriterioDes=true;
      this.txtCEliminar=false;
      this.btnGuardar='Guardar';
      this.btnCancelar='Cancelar';
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  agregarAcc(criterio:any, cri:any){
    if(this.txtIngresar){
      this.txtTipo=4;
      this.tituloModal='Ingresar acciones';
      this.txtCriterioD=cri.cri_nombre;
      this.txtTexto=cri.enc_acciones;
      this.txtNombre='';
      this.txtCodigoC=cri.cri_id;
      this.txtCodigoCD=criterio.cdes_id;
      this.txtCodigoCA=0;
      this.modalCriterioDes=true;
      this.txtCEliminar=false;
      this.btnGuardar='Guardar';
      this.btnCancelar='Cancelar';
      this.txtTipoBan=false;
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  modificarConsec(criterio:any, cri:any){
    if(this.txtModificar){
      this.txtTipo=5;
      this.tituloModal='Modificar consecuencia';
      this.txtCriterioD=cri.cri_nombre;
      this.txtTexto=cri.enc_consecuencias;
      this.txtNombre=criterio.con_descripcion;
      this.txtCodigoC=cri.cri_id;
      this.txtCodigoCD=criterio.con_cdes;
      this.txtCodigoCA=criterio.con_id;
      this.modalCriterioDes=true;
      this.txtCEliminar=false;
      this.btnGuardar='Guardar';
      this.btnCancelar='Cancelar';
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  modificarUtopia(criterio:any, cri:any){
    if(this.txtModificar){
      this.txtTipo=9;
      this.tituloModal='Modificar Utopia';
      this.txtCriterioD=cri.cri_nombre;
      this.txtTexto='';
      this.txtNombre=criterio.uto_descripcion;
      this.txtCodigoC=cri.cri_id;
      this.txtCodigoCD=criterio.con_cdes;
      this.txtCodigoCA=criterio.uto_id;
      this.modalCriterioDes=true;
      this.txtCEliminar=false;
      this.btnGuardar='Guardar';
      this.btnCancelar='Cancelar';
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  modificarAccion(accion:any, cri:any){
    if(this.txtModificar){
      this.txtTipo=6;
      this.tituloModal='Modificar acción';
      this.txtCriterioD=cri.cri_nombre;
      this.txtTexto=cri.enc_consecuencias;
      this.txtNombre=accion.acc_descripcion;
      this.txtCodigoC=cri.cri_id;
      this.txtCodigoCD=accion.acc_cdes;
      this.txtCodigoCA=accion.acc_id;
      this.modalCriterioDes=true;
      this.txtCEliminar=false;
      this.btnGuardar='Guardar';
      this.btnCancelar='Cancelar';
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  eliminarCriterioD(accion:any, cri:any, tipo:any){
    if(this.txtEliminar){
      this.txtTipo=7;
      this.txtTipoEliminar=tipo;
      this.btnGuardar='Si';
      this.btnCancelar='No';
      if(tipo==1){
        this.tituloModal='¿Está seguro que desea elimiar '+cri.cri_nombre+'?';
        this.txtTexto=cri.enc_descripcion;
        this.txtCodigoCD=accion.cdes_id;
        this.txtNombre=accion.cdes_descripcion;
      }else if(tipo==2){
        this.tituloModal='¿Está seguro que desea elimiar la consecuencia?';
        this.txtTexto=cri.enc_consecuencias;
        this.txtCodigoCD=accion.con_id;
        this.txtNombre=accion.con_descripcion;
      }else if(tipo==3){
        this.tituloModal='¿Está seguro que desea elimiar la acción?';
        this.txtTexto=cri.enc_acciones;
        this.txtCodigoCD=accion.acc_id;
        this.txtNombre=accion.acc_descripcion;
      }else{
        this.tituloModal='¿Está seguro que desea elimiar la Utopia?';
        this.txtCodigoCA=accion.uto_id;
        this.txtNombre=accion.uto_descripcion;
      }
      this.modalCriterioDes=true;
      this.txtCEliminar=true;
    }else{
      this.messageService.add({severity:'error', summary:this.mensajesg.CabeceraError, detail: this.mensajesg.NoAutorizado});
    }
  }

  limpiarSeleccion(){
    this.txtSeleccionP='';
  }

  listaCriteriosD(){
    this.listarCriteriosPadre(this.txtCodigoCri);
  }
}