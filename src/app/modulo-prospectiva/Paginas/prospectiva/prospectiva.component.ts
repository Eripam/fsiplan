import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { swDependencia } from 'src/app/modulo-seguridad/ServiciosWeb/Dependencia/swDependencia.service';
import { listaI } from '../../Interface/seguridad';
import { SwAuditoriaService } from '../../ServiciosWeb/Auditoria/swAuditoria.service';
import { SwProspectivaService } from '../../ServiciosWeb/Prospectiva/swProspectiva.service';

@Component({
  selector: 'app-prospectiva',
  templateUrl: './prospectiva.component.html',
  styleUrls: ['./prospectiva.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class ProspectivaComponent implements OnInit {
  // Menú del home
  items: MenuItem[] = [];
  home!: MenuItem;
  //Variable para los estados de usuario
  statuses!: any[];
  //Lista prospectiva
  listaProspectivas: any[]=[];
  //lista tipo dependencia
  listaTipoD: any []=[];
  sesionDep:string='';
  sesionTipo:number=0;
  sessionDepC:number=0;
  //Variables de modales
  modalProspectiva!:boolean;
  tituloModal:string='';
  txtNombre:string='';
  txtFechaI: string='';
  txtFechaF:string='';
  txtEstado:string='';
  txtAlineacion: number=0;
  txtCodigo:number=0;
  sessionUser:string='';
  sessionRol:string='';
  txtIngresar:boolean=false;
  txtModificar:boolean=false;
  
  //Variable para mostrar el loading en la tabla
  loading: boolean = true;
  constructor(private sesiones:SesionUsuario, private swProspectiva: SwProspectivaService, private messageService: MessageService, private mensajesg:MensajesGenerales, private DependenciaSer:swDependencia, private router: Router, private swAuditoria: SwAuditoriaService, private route: ActivatedRoute) { }

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
    const datosRol=await this.sesiones.obtenerOpcionesUsuario(valores);
    this.txtIngresar=datosRol.rop_insertar;
    this.txtModificar=datosRol.rop_modificar;
    this.items=[{label:datosRol.pop_nombre},{ label: datosRol.opc_nombre }]
    //Listar prosepctivas
    this.listarTipoDependencias();
    this.listarProspectivas();
    //Menu superio con enlace del home
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    //Ingreso de los tipos que tiene el estado de usuario
    this.statuses = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 0 },
    ];
  }

  async listarTipoDependencias() {
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.DependenciaSer.ListaTipoDependencia().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaTipoD = datos.data;
    }else{
      this.listaTipoD =[];
    }
    this.loading = false;
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

  async openNew(){
    if(this.txtIngresar){
      const valor = await new Promise<any>((resolve) =>this.swProspectiva.ListaProspectivaExiste().subscribe((translated) => {resolve(translated);}));
      if(this.sessionDepC!=1){
        if(valor.success){
          if(valor.data){
            this.tituloModal='Ingresar Prospectiva';
            this.txtNombre='';
            this.txtFechaI='';
            this.txtFechaF='';
            this.txtEstado='';
            this.txtCodigo=0;
            this.modalProspectiva=true;
          }else{
            this.messageService.add({severity:'error', summary: this.mensajesg.CabeceraError, detail: "No se puede crear una prospectiva, mientras no existe una prospectiva institucional."})
          }
        }else{
          this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.ErrorProceso});
        }
      }else{
          this.tituloModal='Ingresar Prospectiva';
          this.txtNombre='';
          this.txtFechaI='';
          this.txtFechaF='';
          this.txtEstado='';
          this.txtCodigo=0;
          this.modalProspectiva=true;
        }
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
  }

  async guardarProspectiva(){
    var alin;
    if(this.txtAlineacion==0){
      alin=null;
    }else{
      alin=this.txtAlineacion;
    }
    const datospros={
      pro_proid:alin,
      pro_nombre:this.txtNombre,
      pro_fi:this.txtFechaI,
      pro_ff:this.txtFechaF,
      pro_tipo:this.sesionTipo,
      pro_dependencia:this.sessionDepC,
      pro_estado:this.txtEstado,
      pro_id:this.txtCodigo
    };
    if (this.txtNombre == '' || this.txtFechaI=='' || this.txtFechaF=='') {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    } else if(this.txtCodigo==0){
      const datos = await new Promise<any>((resolve) =>
         this.swProspectiva.IngresarProspectiva(datospros).subscribe((translated) => {resolve(translated);}));

      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Ingresar",
          aud_descripcion:"Ingresar prospectiva con los datos: {nombre:"+this.txtNombre+", fechai: "+this.txtFechaI+", fechaf: "+this.txtFechaF+", tipo: "+this.sesionTipo+", dependencia: "+this.sesionDep+", alineado a: "+alin+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalProspectiva = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Prospectiva ' + this.mensajesg.IngresadoCorrectamente});
        this.listarProspectivas();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }else{
      const datos = await new Promise<any>((resolve) =>
         this.swProspectiva.ModificarProspectiva(datospros).subscribe((translated) => {resolve(translated);}));

      if (datos.success) {
        const datosAudi={
          aud_usuario:this.sessionUser,
          aud_proceso:"Modificar",
          aud_descripcion:"Modificar prospectiva con los datos: {código: "+this.txtCodigo+", nombre:"+this.txtNombre+", fechai: "+this.txtFechaI+", fechaf: "+this.txtFechaF+", tipo: "+this.sesionTipo+", dependencia: "+this.sesionDep+", alineado a: "+alin+", estado: "+this.txtEstado+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        this.modalProspectiva = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Prospectiva ' + this.mensajesg.ModificadoCorrectamente});
        this.listarProspectivas();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }
  }

  hideDialogP(){
    this.modalProspectiva=false;
  }

  modificarProspectiva(pros:any){
    if(this.txtModificar){
      this.txtCodigo=pros.pro_id;
      this.txtNombre=pros.pro_nombre;
      var fechai=new Date(pros.pro_fi);
      var mes=fechai.getMonth()+1;
      this.txtFechaI=fechai.getDate() + '/' + mes + '/' + fechai.getFullYear();
      var fechaf=new Date(pros.pro_ff);
      var mesf=fechaf.getMonth()+1;
      this.txtFechaF= fechaf.getDate() + '/' + mesf + '/' + fechaf.getFullYear();
      this.txtEstado=pros.pro_estado;
      this.tituloModal='Modificar Prospectiva';
      this.modalProspectiva=true;
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
  }

  irpagina(pros:any){
    this.router.navigate(['prospectiva/configpros/7/'+pros.pro_id+'/'+this.route.snapshot.paramMap.get('enc')]);
  }
}
