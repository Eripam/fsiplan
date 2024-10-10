import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { listaI } from '../../Interface/planEstrategico';
import { SwCronogramaService } from '../../ServiciosWeb/Cronograma/swCronograma.service';
import { SwEjesService } from '../../ServiciosWeb/EjeEstrategico/swEjes.service';
import { SwEstructuraService } from '../../ServiciosWeb/Estructura/swEstructura.service';
import { SwEstructuraPlanService } from '../../ServiciosWeb/EstructuraPlan/swEstructuraPlan.service';
import { SwPlanService } from '../../ServiciosWeb/Plan/swPlan.service';
import * as moment from 'moment';
import { SwPlanNacionalService } from '../../ServiciosWeb/PlanNacional/swPlanNacional.service';
import { swDependencia } from 'src/app/modulo-seguridad/ServiciosWeb/Dependencia/swDependencia.service';
import { SwResponsablesService } from '../../ServiciosWeb/Responsables/swResponsables.service';

@Component({
  selector: 'app-estructura-plan',
  templateUrl: './estructura-plan.component.html',
  styleUrls: ['./estructura-plan.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class EstructuraPlanComponent implements OnInit {
  // Menú del home
  items: MenuItem[] = [];
  home!: MenuItem;
  //Variable para los estados de usuario
  statuses!: any[];
  //Lista prospectiva
  listaEstructura: any[] = [];
  listaEstructuraPlan: any[] = [];
  listaEstructuraPlanS: any[] = [];
  listaEstructuraPlanD: any[] = [];
  sesionDep: string = '';
  sesionTipo: number = 0;
  sessionDepC: number = 0;
  //Variables de modales
  modalEstructura!: boolean;
  tituloModal: string = '';
  txtNombre: string = '';
  txtEstado: string = '';
  txtCodigo: number = 0;
  sessionUser: string = '';
  sessionRol: string = '';
  txtIngresar: boolean = false;
  txtModificar: boolean = false;
  txtEliminar: boolean = false;
  txtPlan: string = '';
  listaPlanE: any = [];
  txtPlanEstado: boolean = true;
  txtIdentificador: string = '';
  txtDepende: number = 0;
  eliminar: boolean = false;
  txtTipo: string = '';
  txtAlineacion: number = 0;
  listaEje: any = [];
  listaEstructuraSelect: any = [];
  txtEje: string = '';
  Eje: boolean = false;
  maximo: number = 0;
  anio: number = 0;
  fechai: string = '';
  fechaf: string = '';
  displayModal: boolean = false;
  txtSubtitulo: string = '';
  txtCronograma: any[] = [];
  txtIndicador: number = 0;
  txtIndBoolean: boolean = false;
  listaIndicador: any = [];
  banPlan: boolean = false;
  txtPlanP: number = 0;
  //Variable para mostrar el loading en la tabla
  loading: boolean = true;
  modalResponsable: boolean = false;
  listaDepResponsable: any = [];
  listaDepCoresponsables: any = [];
  txtResponsables: any = [];
  txtCoresponsables: any = [];
  listaResponsable: any = [];
  listaCoresponsable: any = [];
  listaDep: any = [];
  constructor(
    private sesiones: SesionUsuario,
    private swEstructura: SwEstructuraService,
    private messageService: MessageService,
    private mensajesg: MensajesGenerales,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private swPlan: SwPlanService,
    private swEsPlan: SwEstructuraPlanService,
    private swEje: SwEjesService,
    private swPlanNacional: SwPlanNacionalService,
    private swDependencia: swDependencia,
    private swResponsable: SwResponsablesService,
    private DependenciaSer: swDependencia
  ) {}

  async ngOnInit() {
    const datosS = await this.sesiones.obtenerDatosLogin();
    this.sesionDep = datosS.dep_nombre;
    this.sesionTipo = datosS.dep_tipo;
    this.sessionDepC = datosS.rpe_dependencia;
    this.sessionUser = datosS.rpe_persona;
    this.sessionRol = datosS.rol_nombre;
    const valores = {
      rol: datosS.rpe_rol,
      opcion: this.route.snapshot.paramMap.get('opc'),
      padreop: this.route.snapshot.paramMap.get('enc'),
    };
    this.listarPlanEstrategico();
    this.listarDependencias();
    const datosRol = await this.sesiones.obtenerOpcionesUsuario(valores);
    this.txtIngresar = datosRol.rop_insertar;
    this.txtModificar = datosRol.rop_modificar;
    this.txtEliminar = datosRol.rop_eliminar;
    this.items = [
      { label: datosRol.pop_nombre },
      { label: datosRol.opc_nombre },
    ];
    //Menu superio con enlace del home
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    //Ingreso de los tipos que tiene el estado de usuario
    this.statuses = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 0 },
      { label: 'Aprobado', value: 2 },
    ];
  }

  async listarPlanEstrategico() {
    const dat = {
      tipo: this.sesionTipo,
      codigo: this.sessionDepC,
    };
    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swPlan.ListaPlanes(dat).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.listaPlanE = datos.data;
    } else {
      this.listaPlanE = [];
    }
    this.loading = false;
  }

  async listarEstructura() {
    const dat = {
      codigo: this.txtPlan,
      tipo: 2,
    };
    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swEstructura.ListaEstructura(dat).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.listaEstructura = datos.data;
    } else {
      this.listaEstructura = [];
    }
    this.loading = false;
  }

  async listarMaximo() {
    const dat = {
      codigo: this.txtPlan,
    };
    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swEstructura.ListarMaximo(dat).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.maximo = datos.data[0].max;
    } else {
      this.maximo = 0;
    }
    this.loading = false;
  }

  async listarEjes() {
    const dat = {
      codigo: this.txtPlan,
      tipo: 2,
    };
    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swEje.ListaEje(dat).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.listaEje = datos.data;
    } else {
      this.listaEje = [];
    }
    this.loading = false;
  }

  async listarEstructuraPlan(estructura: any) {
    const dat = {
      codigo: this.txtPlan,
      estructura: estructura,
      tipo: 1,
    };
    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swEsPlan.ListaEstructuraPlanes(dat).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.listaEstructuraPlan = datos.data;
    } else {
      this.listaEstructuraPlan = [];
    }

    this.loading = false;
  }

  async listarEstructuraPlanS(orden: any) {
    this.listaEstructuraPlanS = [];
    const dat = {
      codigo: this.txtPlan,
      tipo: 3,
      orden: orden,
    };
    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swEsPlan.ListaEstructuraPlanes(dat).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.listaEstructuraPlanS = [{ label: 'Ninguno', value: 0 }];
      for (let dato of datos.data) {
        this.listaEstructuraPlanS.push({
          label: dato.est_codigo + '-' + dato.eplan_codigo,
          value: dato.eplan_id,
        });
      }
    } else {
      this.listaEstructuraPlanS = [];
    }
    this.loading = false;
  }

  async listarEstructuraPlanD(orden: any) {
    this.listaEstructuraPlanD = [];
    const dat = {
      codigo: this.txtPlanP,
      tipo: 4,
      orden: orden,
    };
    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swEsPlan.ListaEstructuraPlanes(dat).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      for (let dato of datos.data) {
        this.listaEstructuraPlanD.push({
          label: dato.est_codigo + '-' + dato.eplan_codigo,
          value: dato.eplan_id,
        });
      }
    } else {
      this.listaEstructuraPlanD = [];
    }
    this.loading = false;
  }

  async listarIndicador() {
    const dat = {
      tipo: 2,
    };
    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swPlanNacional.ListarIndicadoresPN(dat).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.listaIndicador = datos.data;
    } else {
      this.listaIndicador = [];
    }
    this.loading = false;
  }

  async listarResponsables(eplan_id: any) {
    const dato = {
      replan_eplan: eplan_id,
      replan_tipo: 1,
      tipo: 1,
    };
    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swDependencia
        .ListaDependenciaFacAdmi(dato)
        .subscribe((translated) => {
          resolve(translated);
        })
    );
    if (datos.success) {
      this.listaDepResponsable = datos.data;
    } else {
      this.listaDepResponsable = [];
    }
    this.loading = false;
  }

  async listarCoresponsables(eplan_id: any) {
    const dato = {
      replan_eplan: eplan_id,
      replan_tipo: 2,
      tipo: 2,
    };
    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swDependencia
        .ListaDependenciaFacAdmi(dato)
        .subscribe((translated) => {
          resolve(translated);
        })
    );
    if (datos.success) {
      this.listaDepCoresponsables = datos.data;
    } else {
      this.listaDepCoresponsables = [];
    }
    this.loading = false;
  }

  async obtenerEst(event: any) {
    this.txtPlan = event.value;
    for (let plan of this.listaPlanE) {
      if (plan.plan_id == this.txtPlan) {
        this.anio = plan.plan_anio;
        this.fechai = moment(plan.plan_fecha_inicio).format('YYYY');
        this.fechaf = moment(plan.plan_fecha_fin).format('YYYY');
        if (
          plan.plan_planid == 0 ||
          plan.plan_planid == null ||
          plan.plan_planid == ''
        ) {
          this.banPlan = false;
        } else {
          this.txtPlanP = plan.plan_planid;
          this.banPlan = true;
        }
        if (plan.plan_estado == 2) {
          this.txtPlanEstado = false;
        } else {
          this.txtPlanEstado = true;
        }
      }
    }
    await this.listarEstructura();
    if (this.listaEstructura.length > 0) {
      var codigo;
      for (let est of this.listaEstructura) {
        if (est.est_orden == 1) {
          codigo = est.est_id;
        }
      }
      this.listarEstructuraPlan(codigo);
    }
    this.listarEjes();
    this.listarMaximo();
  }

  async listarEstructuraSelect(event: any) {
    if (event.value == 0) {
      this.listaEstructuraSelect = [];
    } else {
      const dat = {
        codigo: event.value,
      };
      const datos: listaI = await new Promise<listaI>((resolve) =>
        this.swEsPlan
          .ListaEstructuraPlanesSelect(dat)
          .subscribe((translated) => {
            resolve(translated);
          })
      );
      if (datos.success) {
        this.listaEstructuraSelect = datos.data;
      } else {
        this.listaEstructuraSelect = [];
      }
    }
    this.loading = false;
  }

  hideDialogP() {
    this.modalEstructura = false;
  }

  async guardarEstructura() {
    if (this.txtNombre == '' || this.txtTipo == '') {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.CamposVacios,
      });
    } else {
      if (this.txtCodigo === 0 && !this.eliminar) {
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Ingresar',
          aud_descripcion:
            'Ingresar estructura - plan estratégico con los datos: {Código: ' +
            this.txtCodigo +
            ', Nombre:' +
            this.txtNombre +
            ', Plan: ' +
            this.txtPlan +
            ', Código: ' +
            this.txtIdentificador +
            ', Tipo: ' +
            this.txtTipo +
            ', Depende: ' +
            this.txtDepende +
            ', Alineado: ' +
            this.txtAlineacion +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const dat: any = {
          eplan_id: this.txtCodigo,
          eplan_nombre: this.txtNombre,
          eplan_codigo: this.txtIdentificador,
          est_estado: this.txtEstado,
          eplan_plan: this.txtPlan,
          eplan_estructura: this.txtTipo,
          eplan_depende: this.txtDepende,
          eplan_eplan_id: this.txtAlineacion,
          eplan_eje: this.txtEje,
          auditoria: datosAudi,
        };
        const datos = await new Promise<any>((resolve) =>
          this.swEsPlan
            .IngresarEstructuraPlanes(dat)
            .subscribe((translated) => {
              resolve(translated);
            })
        );
        if (datos.success) {
          this.messageService.add({
            severity: 'success',
            summary: this.mensajesg.CabeceraExitoso,
            detail: this.mensajesg.IngresadoCorrectamente,
          });
          this.modalEstructura = false;
          await this.listarEstructuraPlan(this.txtTipo);
          /*var suma=0;
        for(let estructura of this.listaEstructuraPlan){
          console.log(estructura.eplan_estructura);
          console.log(this.txtTipo);
          if(estructura.eplan_estructura==this.txtTipo){
            suma++;
          }
        }
        if(suma==1){
          this.listarEstructura();
        }*/
        } else {
          this.messageService.add({
            severity: 'error',
            summary: this.mensajesg.CabeceraError,
            detail: this.mensajesg.ErrorProceso,
          });
        }
      } else if (this.txtCodigo > 0 && !this.eliminar) {
        const datosAudi = {
          aud_usuario: this.sessionUser,
          aud_proceso: 'Modificar',
          aud_descripcion:
            'Modificar estructura - plan estratégico con los datos: {Códigoid: ' +
            this.txtCodigo +
            ', Nombre:' +
            this.txtNombre +
            ', Plan: ' +
            this.txtPlan +
            ', Código: ' +
            this.txtIdentificador +
            ', Tipo: ' +
            this.txtTipo +
            ', Depende: ' +
            this.txtDepende +
            ', Alineado: ' +
            this.txtAlineacion +
            ', Estado: ' +
            this.txtEstado +
            '}',
          aud_rol: this.sessionRol,
          aud_dependencia: this.sessionDepC,
        };
        const dat: any = {
          eplan_id: this.txtCodigo,
          eplan_nombre: this.txtNombre,
          eplan_codigo: this.txtIdentificador,
          eplan_estado: this.txtEstado,
          eplan_plan: this.txtPlan,
          eplan_estructura: this.txtTipo,
          eplan_depende: this.txtDepende,
          eplan_eplan_id: this.txtAlineacion,
          eplan_eje: this.txtEje,
          auditoria: datosAudi,
        };
        const datos = await new Promise<any>((resolve) =>
          this.swEsPlan
            .ModificarEstructuraPlanes(dat)
            .subscribe((translated) => {
              resolve(translated);
            })
        );
        if (datos.success) {
          this.messageService.add({
            severity: 'success',
            summary: this.mensajesg.CabeceraExitoso,
            detail: this.mensajesg.ModificadoCorrectamente,
          });
          this.modalEstructura = false;
          this.listarEstructuraPlan(this.txtTipo);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: this.mensajesg.CabeceraError,
            detail: this.mensajesg.ErrorProceso,
          });
        }
      } else {
        const val = {
          codigo: this.txtCodigo,
        };
        const validacion = await new Promise<any>((resolve) =>
          this.swEsPlan.ValidarEstructuraPlanes(val).subscribe((translated) => {
            resolve(translated);
          })
        );
        if (validacion.data) {
          this.messageService.add({
            severity: 'error',
            summary: this.mensajesg.CabeceraError,
            detail: this.mensajesg.Loestanusando,
          });
        } else {
          const datosAudi = {
            aud_usuario: this.sessionUser,
            aud_proceso: 'Eliminar',
            aud_descripcion:
              'Eliminar estructura - plan estratégico con los datos: {Códigoid: ' +
              this.txtCodigo +
              ', Nombre:' +
              this.txtNombre +
              ', Plan: ' +
              this.txtPlan +
              ', Código: ' +
              this.txtIdentificador +
              ', Tipo: ' +
              this.txtTipo +
              ', Depende: ' +
              this.txtDepende +
              ', Alineado: ' +
              this.txtAlineacion +
              ', Estado: ' +
              this.txtEstado +
              '}',
            aud_rol: this.sessionRol,
            aud_dependencia: this.sessionDepC,
          };
          const dat: any = {
            eplan_id: this.txtCodigo,
            eplan_nombre: this.txtNombre,
            eplan_codigo: this.txtIdentificador,
            eplan_estado: this.txtEstado,
            eplan_plan: this.txtPlan,
            eplan_estructura: this.txtTipo,
            eplan_depende: this.txtDepende,
            eplan_eplan_id: this.txtAlineacion,
            eplan_eje: this.txtEje,
            auditoria: datosAudi,
          };
          const datos = await new Promise<any>((resolve) =>
            this.swEsPlan
              .EliminarEstructuraPlanes(dat)
              .subscribe((translated) => {
                resolve(translated);
              })
          );
          if (datos.success) {
            this.messageService.add({
              severity: 'success',
              summary: this.mensajesg.CabeceraExitoso,
              detail: this.mensajesg.EliminadoCorrectamente,
            });
            this.modalEstructura = false;
            await this.listarEstructuraPlan(this.txtTipo);
            var suma = 0;
            for (let estructura of this.listaEstructuraPlan) {
              if (estructura.eplan_estructura == this.txtTipo) {
                suma++;
              }
            }
            if (suma == 0) {
              this.listarEstructura();
            }
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
  }

  openNew(estructura: any) {
    if (this.txtIngresar) {
      if (this.txtPlan == '0' || this.txtPlan == '') {
        this.messageService.add({
          severity: 'error',
          summary: this.mensajesg.CabeceraError,
          detail: this.mensajesg.SeleccionarPlan,
        });
      } else {
        this.tituloModal = 'Ingresar ' + estructura.est_nombre;
        this.txtCodigo = 0;
        this.txtNombre = '';
        this.txtIdentificador = '';
        this.txtEje = '';
        this.txtTipo = estructura.est_id;
        this.txtDepende = 0;
        this.modalEstructura = true;
        this.txtAlineacion = 0;
        this.Eje = estructura.est_eje;
        this.eliminar = false;
        this.listaEstructuraSelect = [];
        this.listarEstructuraPlanS(estructura.est_orden);
        this.listarEstructuraPlanD(estructura.est_orden);
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  editarEstructura(est: any, estructura: any) {
    if (this.txtModificar) {
      this.tituloModal = 'Modificar ' + estructura.est_nombre;
      this.txtCodigo = est.eplan_id;
      this.txtNombre = est.eplan_nombre;
      this.txtIdentificador = est.eplan_codigo;
      this.Eje = estructura.est_eje;
      this.txtEje = est.eje_id;
      this.txtTipo = est.eplan_estructura;
      if (est.eplan_depende == null || est.eplan_depende == '') {
        this.txtDepende = 0;
      } else {
        this.txtDepende = est.eplan_depende;
      }
      if (est.eplan_eplan_id == null || est.eplan_eplan_id == '') {
        this.txtAlineacion = 0;
      } else {
        this.txtAlineacion = est.eplan_eplan_id;
      }
      if (est.count > 0) {
        this.txtIndBoolean = false;
      } else {
        this.txtIndBoolean = true;
      }
      this.modalEstructura = true;
      this.txtEstado = est.eplan_estado;
      this.eliminar = false;
      this.listarEstructuraPlanS(est.est_orden);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  eliminarEstructura(est: any) {
    if (this.txtEliminar) {
      this.tituloModal = 'Eliminar';
      this.txtCodigo = est.eplan_id;
      this.txtNombre = est.eplan_nombre;
      this.txtIdentificador = est.eplan_codigo;
      this.txtTipo = est.eplan_estructura;
      if (est.eplan_depende == null || est.eplan_depende == '') {
        this.txtDepende = 0;
      } else {
        this.txtDepende = est.eplan_depende;
      }
      if (est.eplan_eplan_id == null || est.eplan_eplan_id == '') {
        this.txtAlineacion = 0;
      } else {
        this.txtAlineacion = est.eplan_eplan_id;
      }
      if (est.count > 0) {
        this.txtIndBoolean = false;
      } else {
        this.txtIndBoolean = true;
      }
      this.modalEstructura = true;
      this.txtEstado = est.eplan_estado;
      this.eliminar = true;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  agregarIndicador(est: any) {
    if (this.txtIngresar) {
      this.tituloModal = 'Indicadores al que aporta';
      this.txtSubtitulo = est.eplan_nombre;
      this.txtIndicador = est.eplan_indicador;
      this.txtCodigo = est.eplan_id;
      this.txtTipo = est.eplan_estructura;
      this.listarIndicador();
      this.displayModal = true;
      if (est.eplan_depende > 0) {
        this.eliminar = true;
      } else {
        this.eliminar = false;
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  irPagina() {
    this.router.navigate([
      'estrategico/mapa/18/' +
        this.txtPlan +
        '/' +
        this.route.snapshot.paramMap.get('enc'),
    ]);
  }

  irPaginaCronograma() {
    this.router.navigate([
      'estrategico/cronograma/19/' +
        this.txtPlan +
        '/' +
        this.route.snapshot.paramMap.get('enc'),
    ]);
  }

  listar(e: any) {
    this.listarEstructuraPlan(this.listaEstructura[e.index].est_id);
  }

  async guardarIndicador() {
    const datosAudi = {
      aud_usuario: this.sessionUser,
      aud_proceso: 'Ingresar',
      aud_descripcion:
        'Ingresar estructura - plan estratégico con los datos: {Código: ' +
        this.txtCodigo +
        ', Indicador: ' +
        this.txtIndicador +
        '}',
      aud_rol: this.sessionRol,
      aud_dependencia: this.sessionDepC,
    };
    const dat: any = {
      eplan_id: this.txtCodigo,
      eplan_indicador: this.txtIndicador,
      auditoria: datosAudi,
    };
    const datos = await new Promise<any>((resolve) =>
      this.swEsPlan
        .ModificarEstructuraPlanesIndicador(dat)
        .subscribe((translated) => {
          resolve(translated);
        })
    );
    if (datos.success) {
      this.messageService.add({
        severity: 'success',
        summary: this.mensajesg.CabeceraExitoso,
        detail: this.mensajesg.IngresadoCorrectamente,
      });
      this.displayModal = false;
      await this.listarEstructuraPlan(this.txtTipo);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.ErrorProceso,
      });
    }
  }

  //Función para listar todos los tipos de dependencias ingresados
  async listarDependencias() {
    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.DependenciaSer.ListaDependencia().subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.listaDep = datos.data;
    } else {
      this.listaDep = [];
    }
    this.loading = false;
  }

  async listarResponsable(eplan_id: any) {
    const dato = {
      replan_eplan: eplan_id,
      replan_tipo: 1,
    };

    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swResponsable.ListarResponsables(dato).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.listaResponsable = datos.data;
    } else {
      this.listaResponsable = [];
    }

    this.loading = false;
  }

  async listarCoresponsable(eplan_id: any) {
    const dato = {
      replan_eplan: eplan_id,
      replan_tipo: 2,
    };

    const datos: listaI = await new Promise<listaI>((resolve) =>
      this.swResponsable.ListarResponsables(dato).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.listaCoresponsable = datos.data;
    } else {
      this.listaCoresponsable = [];
    }

    this.loading = false;
  }

  ingresarResponsables(est: any) {
    if (this.txtIngresar) {
      this.modalResponsable = true;
      this.tituloModal = 'Responsables y Coresponsables';
      this.txtSubtitulo = est.eplan_nombre;
      this.txtCodigo = est.eplan_id;
      this.listarResponsables(est.eplan_id);
      this.listarCoresponsables(est.eplan_id);
      this.listarResponsable(est.eplan_id);
      this.listarCoresponsable(est.eplan_id);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  async guardarResponsables(tipo: any) {
    const datosAudi = {
      aud_usuario: this.sessionUser,
      aud_proceso: 'Ingresar',
      aud_descripcion:
        'Ingresar responsables - coresponsables con los datos: {Código: ' +
        this.txtCodigo +
        ', Responsables: ' +
        this.txtResponsables +
        ', Coresponsables: ' +
        this.txtCoresponsables +
        '}',
      aud_rol: this.sessionRol,
      aud_dependencia: this.sessionDepC,
    };
    const dat: any = {
      eplan_id: this.txtCodigo,
      tipo: tipo,
      responsables: this.txtResponsables,
      coresponsables: this.txtCoresponsables,
      auditoria: datosAudi,
    };
    const datos = await new Promise<any>((resolve) =>
      this.swResponsable.IngresarResponsable(dat).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.listarResponsable(this.txtCodigo);
      this.listarCoresponsable(this.txtCodigo);
      this.txtResponsables = [];
      this.txtCoresponsables = [];
      this.messageService.add({
        severity: 'success',
        summary: this.mensajesg.CabeceraExitoso,
        detail: this.mensajesg.IngresadoCorrectamente,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: 'No se puede repetir los responsables',
      });
    }
  }

  async eliminarResCor(res: any) {
    if (this.txtEliminar) {
      var dependencia;
      const datos = {
        dep_codigo: res.replan_dependencia,
      };
      const dato = await new Promise<any>((resolve) =>
        this.swDependencia
          .ListaDependenciaCodigo(datos)
          .subscribe((translated) => {
            resolve(translated);
          })
      );
      if (dato.success) {
        dependencia = dato.data[0].dep_nombre;
      }
      this.confirmationService.confirm({
        message:
          'Esta seguro que desea eliminar a <b>' +
          dependencia +
          '</b> de ' +
          '<b>' +
          this.txtSubtitulo +
          '</b>',
        accept: () => {
          this.eliminarResponsableCo(res);
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.NoAutorizado,
      });
    }
  }

  async eliminarResponsableCo(res: any) {
    const datosAudi = {
      aud_usuario: this.sessionUser,
      aud_proceso: 'Eliminar',
      aud_descripcion:
        'Eliminar responsables - coresponsables con los datos: {Dependencia: ' +
        +res.replan_dependencia +
        ', Estructura Plan: ' +
        res.replan_eplan +
        ', Tipo: ' +
        res.replan_tipo +
        '}',
      aud_rol: this.sessionRol,
      aud_dependencia: this.sessionDepC,
    };
    const dat: any = {
      replan_eplan: res.replan_eplan,
      replan_dependencia: res.replan_dependencia,
      replan_tipo: res.replan_tipo,
      auditoria: datosAudi,
    };
    const datos = await new Promise<any>((resolve) =>
      this.swResponsable.EliminarResponsable(dat).subscribe((translated) => {
        resolve(translated);
      })
    );
    if (datos.success) {
      this.listarResponsable(res.replan_eplan);
      this.listarCoresponsable(res.replan_eplan);
      this.messageService.add({
        severity: 'success',
        summary: this.mensajesg.CabeceraExitoso,
        detail: this.mensajesg.EliminadoCorrectamente,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.mensajesg.CabeceraError,
        detail: this.mensajesg.ErrorProceso,
      });
    }
  }
}
