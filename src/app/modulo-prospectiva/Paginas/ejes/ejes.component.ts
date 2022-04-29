import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { listaI } from '../../Interface/seguridad';
import { SwAuditoriaService } from '../../ServiciosWeb/Auditoria/swAuditoria.service';
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
  sessionDepC: string = '';
  txtEliminar: boolean = false;
  tituloModal: string = '';
  txtCodigo: number = 0;
  txtNombre: string = '';
  txtTipo: number = 0;
  eliminar: boolean = false;
  modalEje: boolean = false;
  listaEjes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private sesiones: SesionUsuario,
    private swProspectiva: SwProspectivaService,
    private mensajesg: MensajesGenerales,
    private messageService: MessageService,
    private swAuditoria: SwAuditoriaService
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
  }

  hideDialogA() {
    this.modalEje = false;
  }

  guardarDatos() {
    this.modalEje = true;
  }

  openNew() {
    this.tituloModal = 'Ingresar Ejes Estratégicos';
    this.modalEje = true;
  }
}
