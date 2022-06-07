import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { eje_estrategico, listaI, tipo_eje } from '../../Interface/seguridad';
import { SwAuditoriaService } from '../../ServiciosWeb/Auditoria/swAuditoria.service';
import { SwEjesService } from '../../ServiciosWeb/Ejes/swEjes.service';
import { SwEvalAccionService } from '../../ServiciosWeb/Evaluacion/swEvalAccion.service';
import { SwProspectivaService } from '../../ServiciosWeb/Prospectiva/swProspectiva.service';

@Component({
  selector: 'app-ejes',
  templateUrl: './ejes.component.html',
  styleUrls: ['./ejes.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class EjesComponent implements OnInit {
  // Menú del home
  items: MenuItem[] = [];
  home!: MenuItem;
  sessionUser: string = '';
  sessionRol: string = '';
  sessionRolId: number = 0;
  loading: boolean = true;
  listaProspectivas: any[] = [];
  txtProspectiva: number = 0;
  listaI: listaI[] = [];
  txtIngresar: boolean = false;
  txtModificar: boolean = false;
  sesionDep: string = '';
  sessionDepC: number = 0;
  txtEliminar: boolean = false;
  tituloModal: string = '';
  txtCodigo: number = 0;
  txtNombre: string = '';
  txtTipo: number = 0;
  eliminar: boolean = false;
  modalEje: boolean = false;
  listaEjes: any[] = [];
  listaTipoEje: tipo_eje[] = [];
  modalTipoEje: boolean = false;
  ban: boolean = false;
  txtDescripcion: string = '';
  txtMicroescenario: string = '';
  txtPrograma: string = '';
  txtId: string = '';
  listaAcciones: any[]=[];
  selectAcciones:any[]=[];
  txtProsEstado:boolean=true;
  txtDependencia:number=0;

  constructor(
    private route: ActivatedRoute,
    private sesiones: SesionUsuario,
    private swProspectiva: SwProspectivaService,
    private mensajesg: MensajesGenerales,
    private messageService: MessageService,
    private swAuditoria: SwAuditoriaService,
    private swEjes: SwEjesService,
    private swRespuesta: SwEvalAccionService
  ) {}

  async ngOnInit() {
    const datosS = await this.sesiones.obtenerDatosLogin();
    this.sesionDep = datosS.dep_nombre;
    this.sessionDepC = datosS.rpe_dependencia;
    this.sessionUser = datosS.rpe_persona;
    this.sessionRol = datosS.rol_nombre;
    this.sessionRolId = datosS.rpe_rol;
    const valores = {
      rol: datosS.rpe_rol,
      opcion: this.route.snapshot.paramMap.get('opc'),
      padreop: this.route.snapshot.paramMap.get('enc'),
    };
    const datosRol = await this.sesiones.obtenerOpcionesUsuario(valores);
    this.txtIngresar = datosRol.rop_insertar;
    this.txtModificar = datosRol.rop_modificar;
    this.txtEliminar = datosRol.rop_eliminar;
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [
      { label: datosRol.pop_nombre },
      { label: datosRol.opc_nombre },
    ];
    this.listarProspectivas();
  }

  async listarProspectivas() {
    const dat = {
      codigo: this.sessionDepC,
    };
    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swProspectiva.ListarProspectiva(dat).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.listaProspectivas = datos.data;
    } else {
      this.listaProspectivas = [];
    }
    this.loading = false;
  }

  async obtenerPros(event: any) {
    this.txtProspectiva = event.value;
    for(let pros of this.listaProspectivas){
      if(pros.pro_id==this.txtProspectiva){
        if(pros.pro_estado==2){
          this.txtProsEstado=false;
        }else{
          this.txtProsEstado=true;
        }
        this.txtDependencia=pros.pro_dependencia;
      }
    }
    this.listaTipoEjes();
    this.listarEjes();
  }

  async listaTipoEjes() {
    const dat = {
      codigo: this.txtProspectiva,
    };
    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swEjes.ListarTipoEje(dat).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.listaTipoEje = datos.data;
    } else {
      this.listaTipoEje = [];
    }
    this.loading = false;
  }

  async listarEjes() {
    const dat = {
      codigo: this.txtProspectiva,
    };
    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swEjes.ListarEjes(dat).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.listaEjes = datos.data;
    } else {
      this.listaEjes = [];
    }
    this.loading = false;
    console.log(this.listaEjes);
  }

  async listaResultadosE(){
    const dat={
      codigo:this.txtProspectiva,
      tipo:4
    }
    const datos:listaI= await new Promise<listaI>((resolve)=> this.swRespuesta.ListaRespuestaE(dat).subscribe((translated)=>{ resolve(translated); }));
    if(datos.success){
       this.listaAcciones=datos.data;
    }else{
       this.listaAcciones=[];
    }
  }

  async listaAccionesModificar(eje:any){
    const dat={
      codigo:this.txtProspectiva,
      eje:eje
    }
    const datos:listaI= await new Promise<listaI>((resolve)=> this.swRespuesta.ListarAccionesEjes(dat).subscribe((translated)=>{ resolve(translated); }));
    if(datos.success){
       this.listaAcciones=datos.data;
    }else{
       this.listaAcciones=[];
    }
  }

  hideDialogA() {
    this.modalEje = false;
  }

  async guardarDatos() {
    if(this.txtDescripcion=='' || this.txtMicroescenario=='' || this.txtNombre=='' || this.txtTipo==0 || this.txtProspectiva==0 || this.selectAcciones.length==0){
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.CamposVacios
      });
    }else{
    const dat: eje_estrategico = {
      eje_id: this.txtCodigo,
      eje_descripcion: this.txtDescripcion,
      eje_microescenario: this.txtMicroescenario,
      eje_nombre: this.txtNombre,
      eje_estado: 1,
      eje_teje: this.txtTipo,
      eje_prospectiva: this.txtProspectiva,
      eje_accion:this.selectAcciones
    };

    if (this.ban) {
      const datos = await new Promise<any>((resolve) =>
        this.swEjes.ModificarEjes(dat).subscribe((translated) => {
          resolve(translated);
        })
      );
      if (datos.success) {
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Modificar',
          aud_descripcion:
            'Modificar eje estratégico con los datos: {Código: ' +
            this.txtCodigo +
            ', Nombre:' +
            this.txtNombre +
            ', Descripción: ' +
            this.txtDescripcion +
            ', Microescenario: ' +
            this.txtMicroescenario +
            ', Acciones:'+
            this.selectAcciones+
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria
            .IngresarAuditoria(datosAudi)
            .subscribe((translated) => {
              resolve(translated);
            })
        );
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.ModificadoCorrectamente,
        });
        this.modalEje=false;
        this.listarEjes();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: this.mensajesg.ErrorProceso,
        });
      }
    } else if (this.txtCodigo == 0) {
      const datos = await new Promise<any>((resolve) =>
        this.swEjes.IngresarEjes(dat).subscribe((translated) => {
          resolve(translated);
        })
      );
      if (datos.success) {
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Ingresar',
          aud_descripcion:
            'Ingresar eje estratégico con los datos: {Nombre:' +
            this.txtNombre +
            ', Descripción: ' +
            this.txtDescripcion +
            ', Microescenario: ' +
            this.txtMicroescenario +
            ', Acciones:'+
            this.selectAcciones+
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria
            .IngresarAuditoria(datosAudi)
            .subscribe((translated) => {
              resolve(translated);
            })
        );
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.IngresadoCorrectamente,
        });
        this.modalEje=false;
        this.listarEjes();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: this.mensajesg.ErrorProceso,
        });
      }
    } else {
      const datos = await new Promise<any>((resolve) =>
        this.swEjes.EliminarEjes(dat).subscribe((translated) => {
          resolve(translated);
        })
      );
      if (datos.success) {
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Eliminar',
          aud_descripcion:
            'Eliminar eje estratégico con los datos: {Id: '+this.txtCodigo+', Nombre:' +
            this.txtNombre +
            ', Descripción: ' +
            this.txtDescripcion +
            ', Microescenario: ' +
            this.txtMicroescenario +
            ', Acciones: ' +
            this.selectAcciones +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria
            .IngresarAuditoria(datosAudi)
            .subscribe((translated) => {
              resolve(translated);
            })
        );
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.EliminadoCorrectamente,
        });
        this.modalEje=false;
        this.listarEjes();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: this.mensajesg.ErrorProceso,
        });
      }
    }
  }
  }

  openNew() {
    if (this.txtIngresar) {
      this.tituloModal = 'Ingresar Ejes Estratégicos';
      this.modalEje = true;
      this.txtCodigo = 0;
      this.txtId = '';
      this.txtDescripcion = '';
      this.txtMicroescenario = '';
      this.txtNombre = '';
      this.ban = false;
      this.txtTipo=0;
      this.eliminar=false;
      this.selectAcciones=[];
      this.listaResultadosE();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  openNewTE() {
    if (this.txtProspectiva == 0) {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: 'Debe seleccionar la prospectiva',
      });
    } else {
      if (this.txtIngresar) {
        this.tituloModal = 'Ingresar Tipo Eje';
        this.txtCodigo = 0;
        this.txtNombre = '';
        this.ban = false;
        this.modalTipoEje = true;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: this.mensajesg.NoAutorizado,
        });
      }
    }
  }

  hideDialogTE() {
    this.modalTipoEje = false;
  }

  async guardarDatosTE() {
    const dat: tipo_eje = {
      teje_id: this.txtCodigo,
      teje_nombre: this.txtNombre,
      teje_prospectiva: this.txtProspectiva,
      teje_estado: 1,
    };
    if (this.ban) {
      const datos = await new Promise<any>((resolve) =>
        this.swEjes.ModificarTipoEjes(dat).subscribe((translated) => {
          resolve(translated);
        })
      );
      if (datos.success) {
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Modificar',
          aud_descripcion:
            'Modificar tipo eje con los datos: {Código: ' +
            this.txtCodigo +
            ', Nombre:' +
            this.txtNombre +
            ', Prospectiva: ' +
            this.txtProspectiva +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria
            .IngresarAuditoria(datosAudi)
            .subscribe((translated) => {
              resolve(translated);
            })
        );
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.ModificadoCorrectamente,
        });
        this.listaTipoEjes();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: this.mensajesg.ErrorProceso,
        });
      }
    } else if (this.txtCodigo == 0) {
      const datos = await new Promise<any>((resolve) =>
        this.swEjes.IngresarTipoEjes(dat).subscribe((translated) => {
          resolve(translated);
        })
      );
      if (datos.success) {
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Ingresar',
          aud_descripcion:
            'Ingresar tipo eje con los datos: {Nombre:' +
            this.txtNombre +
            ', Prospectiva: ' +
            this.txtProspectiva +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria
            .IngresarAuditoria(datosAudi)
            .subscribe((translated) => {
              resolve(translated);
            })
        );
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.IngresadoCorrectamente,
        });
        this.listaTipoEjes();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: this.mensajesg.ErrorProceso,
        });
      }
    } else {
      const datos = await new Promise<any>((resolve) =>
        this.swEjes.EliminarTipoEjes(dat).subscribe((translated) => {
          resolve(translated);
        })
      );
      if (datos.success) {
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Eliminar',
          aud_descripcion:
            'Eliminar tipo eje con los datos: {Código: ' +
            this.txtCodigo +
            ' Nombre:' +
            this.txtNombre +
            ', Prospectiva: ' +
            this.txtProspectiva +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria
            .IngresarAuditoria(datosAudi)
            .subscribe((translated) => {
              resolve(translated);
            })
        );
        this.messageService.add({
          severity: 'success',
          summary: this.mensajesg.CabeceraExitoso,
          detail: this.mensajesg.EliminadoCorrectamente,
        });
        this.listaTipoEjes();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: this.mensajesg.ErrorProceso,
        });
      }
    }
  }

  modificarTipoEje(tipoeje: tipo_eje) {
    if (this.txtModificar) {
      this.tituloModal = 'Modificar Tipo Eje';
      this.txtNombre = tipoeje.teje_nombre;
      this.txtCodigo = tipoeje.teje_id;
      this.ban = true;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  eliminarTipoEje(tipoeje: tipo_eje) {
    if (this.txtEliminar) {
      this.tituloModal = 'Eliminar Tipo Eje';
      this.txtNombre = tipoeje.teje_nombre;
      this.txtCodigo = tipoeje.teje_id;
      this.ban = false;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  modificarEje(eje:any){
    this.selectAcciones=[];
    if(this.txtModificar){
      this.listaAccionesModificar(eje.eje_id);
      this.tituloModal='Modificar Eje Estratégico';
      this.txtTipo=eje.eje_teje;
      this.txtCodigo=eje.eje_id;
      this.txtNombre=eje.eje_nombre;
      this.txtDescripcion=eje.eje_descripcion;
      this.txtMicroescenario=eje.eje_microescenario;
      for(let accion of eje.acciones){
        this.selectAcciones.push(accion.acc_id);
      }
      this.ban=true;
      this.modalEje=true;
      this.eliminar=false;
    }else{
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  eliminarEje(eje:any){
    this.selectAcciones=[];
    if(this.txtEliminar){
      this.listaAccionesModificar(eje.eje_id);
      this.tituloModal='Modificar Eje Estratégico';
      this.txtTipo=eje.eje_teje;
      this.txtCodigo=eje.eje_id;
      this.txtNombre=eje.eje_nombre;
      this.txtDescripcion=eje.eje_descripcion;
      this.txtMicroescenario=eje.eje_microescenario;
      for(let accion of eje.acciones){
        this.selectAcciones.push(accion.acc_id);
      }
      this.ban=false;
      this.modalEje=true;
      this.eliminar=true;
    }else{
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }
}
