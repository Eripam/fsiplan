import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { listaI, rolpersona, dependencia, Data, rolopcion, opcion, PadreOpcion, Usuario} from '../../Interface/seguridad';
import { swRolpersonaService} from '../../ServiciosWeb/RolPersona/swRolpersona.service';
import { swDependencia} from '../../ServiciosWeb/Dependencia/swDependencia.service';
import { swRoles} from '../../ServiciosWeb/Roles/swRoles.service';
import { swPersona} from '../../ServiciosWeb/Usuarios/swPersona.service';
import { MensajesGenerales} from '../../../Herramientas/Mensajes/MensajesGenerales.component';
import { swPadreopcionService } from '../../ServiciosWeb/PadreOpcion/swpadreopcion.service';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { SwAuditoriaService } from '../../ServiciosWeb/Auditoria/swAuditoria.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-rol',
  templateUrl: './usuario-rol.component.html',
  styleUrls: ['./usuario-rol.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UsuarioRolComponent implements OnInit {

  //Variable para listar
  listaRolP: rolpersona[] = [];
  listaUsuarios: any[]=[];
  listaDependencias: dependencia[]=[];
  listaRoles: Data[]=[];
  listaRolOp: rolopcion[]=[];
  listaOpcion: opcion[]=[];
  listaPadreOpcion:PadreOpcion[]=[];
  //Menú del home
  items: MenuItem[] = [{ label: 'Gestión de Asignación de roles y permisos' }];
  home!: MenuItem;
  //Variable para los estados de usuario
  statuses!: any[];
  //Variable para mostrar el loading en la tabla
  loading: boolean = true;
  //Variable para abrir y cerrar el modal
  modalRolPer!: boolean;
  modalRolPerM!: boolean;
  modalRolOp!: boolean;
  modalRolOpM!:boolean;
  //Titulo del modal
  tituloModal: string = '';
  //Declaración de variables para ingreso y modificaicón
  txtUsuario:string='';
  txtDependencia:number=0;
  txtDependenciaM:number=0;
  txtRolM: number=0;
  txtRol:number=0;
  txtEstado: string = '';
  rolpersona: rolpersona={};
  txtOpcion: string='';
  txtPadreOp: string='';
  insertCheck:boolean=false;
  updateCheck:boolean=false;
  deleteCheck:boolean=false;
  rolopcion: rolopcion={};
  txtPadreOpM: string='';
  txtOpcionM: string='';
  txtNombre:string='';
  txtArchivo:string='';
  sesionDep:string='';
  sessionUser:string='';
  sessionRol:string='';
  sessionDepC:number=0;
  txtIngresar:boolean=false;
  txtModificar:boolean=false;
  txtCheck:boolean=false;
  txtCodigo: string = '';
  txtCedula: string = '';
  txtApellidoP: string = '';
  txtApellidoS: string = '';
  txtEmail: string = '';
  //Variable para mostrar los datos por usuario
  bsPersona: any | undefined;  
  
  constructor(private RolPersonaSer: swRolpersonaService, private swDep: swDependencia, private swRoles: swRoles, private swUsuario: swPersona, private messageService: MessageService ,private mensajesg: MensajesGenerales, private swOpciones: swPadreopcionService, private sesiones: SesionUsuario,  private route: ActivatedRoute, private swAuditoria:SwAuditoriaService, private PersonaSer: swPersona) {
  }


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
    //Menu superio con enlace del home
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    //Ingreso de los tipos que tiene el estado de usuario
    this.statuses = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 0 },
    ];
    this.listarRolPersona();
  }

  //Función para listar todos los roles de usuarios ingresados
  async listarRolPersona() {
    console.log(this.sessionDepC);
    const value={
      codigo:this.sessionDepC
    }
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.RolPersonaSer.ListaRolesPersonaDep(value).subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaRolP = datos.data;
    }else{
      this.listaRolP =[];
    }
    this.loading = false;
  }

  //Función para listar todos los usuario activos
  async listarUsuarios() {
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swUsuario.ListaUsuariosActivos().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaUsuarios = datos.data;
    }else{
      this.listaUsuarios =[];
    }
    this.loading = false;
  }

  //Función para listar todos los usuario activos
  async listarDependencias() {
    const value={
      codigo: this.sessionDepC
    }
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swDep.ListaDependenciaPert(value).subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaDependencias = datos.data;
    }else{
      this.listaDependencias =[];
    }
    this.loading = false;
  }

  //Función para listar todos los usuario activos
  async listarRoles() {
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swRoles.ListaRolesActivosD().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaRoles = datos.data;
    }else{
      this.listaRoles =[];
    }
    this.loading = false;
  }

  //Función para listar todas las opciones activas ingresados
  async listarOpciones() {
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swOpciones.ListarOpcionesA().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaOpcion = datos.data;
    }else{
      this.listaOpcion =[];
    }
    this.loading = false;
  }

  //Función para listar todas las opciones padre activas ingresados
  async listarPadreOpcion() {
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swOpciones.ListaPadreOpcionAc().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaPadreOpcion = datos.data;
    }else{
      this.listaPadreOpcion =[];
    }
    this.loading = false;
  }

  //Función buscar usuario por cédula
  buscarUsuarioC(cedula: string) {
      if (cedula === '') {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.CamposVacios});
      } else {
        this.PersonaSer.BuscarUsuario(cedula).subscribe((data) => {
          this.bsPersona = data;
          if (!data.success) {
            this.messageService.add({severity: 'error',summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CedulaErronea});
          } else {
            this.txtCodigo = data.datos.per_id;
            this.txtCedula = cedula;
            this.txtNombre = data.datos.per_nombres;
            this.txtApellidoP = data.datos.per_primerApellido;
            this.txtApellidoS = data.datos.per_segundoApellido;
            this.txtEmail = data.datos.per_email;
          }
        });
      }
   }

  openNew(){
    if(this.txtIngresar){
      this.txtCheck=false;
      this.txtNombre='';
      this.txtApellidoP='';
      this.txtApellidoS='';
      this.txtCedula='';
      this.txtEmail='';
      this.txtCodigo='';
      this.txtDependencia=0;
      this.txtRol=0;
      this.txtUsuario="";
      this.tituloModal="Asignar Rol";
      this.listarUsuarios();
      this.listarDependencias();
      this.listarRoles();
      this.modalRolPer=true;
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
  }

  openNewRO(){
    if(this.txtIngresar){
      this.txtOpcion='';
      this.txtPadreOp='';
      this.txtRol=0;
      this.insertCheck=false;
      this.updateCheck=false;
      this.deleteCheck=false;
      this.listarOpciones();
      this.listarRoles();
      this.listarPadreOpcion();
      this.tituloModal='Asignar Opción a Rol';
      this.modalRolOp=true;
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
  }

  modificarRolPersona(rolper: any){
    if(this.txtIngresar){
      this.tituloModal="Modificar Asignación de Rol";
      this.listarUsuarios();
      this.listarDependencias();
      this.listarRoles();
      this.txtDependencia=rolper.rpe_dependencia;
      this.txtDependenciaM=rolper.rpe_dependencia;
      this.txtUsuario=rolper.rpe_persona;
      this.txtRol=rolper.rpe_rol;
      this.txtRolM=rolper.rpe_rol;
      this.txtEstado=rolper.rpe_estado;
      this.modalRolPerM=true;
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
  }

  modificarOP(rolopcion: any){
    if(this.txtModificar){
      this.tituloModal="Modificar Asignación Opción de Rol"
      this.listarRoles();
      this.listarOpciones();
      this.listarPadreOpcion();
      this.txtPadreOp=rolopcion.rop_padreop;
      this.txtOpcion=rolopcion.rop_opcion;
      this.txtPadreOpM=rolopcion.rop_padreop;
      this.txtOpcionM=rolopcion.rop_opcion;
      this.txtRol=rolopcion.rop_rol;
      this.insertCheck=rolopcion.rop_insertar;
      this.updateCheck=rolopcion.rop_modificar;
      this.deleteCheck=rolopcion.rop_eliminar;
      this.txtEstado=rolopcion.rop_estado;
      this.modalRolOpM=true;
    }else{
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.NoAutorizado});
    }
  }

  hideDialog(){
    this.modalRolPer=false;
  }

  hideDialogOP(){
    this.modalRolOp=false;
  }

  hideDialogM(){
    this.modalRolPerM=false;
  }

  hideDialogOPM(){
    this.modalRolOpM=false;
  }

  async guardarRolPersona(){
    if(this.txtCheck){
      //Se crea esta variable porque en la base de datos se ingresa los apellidos juntos, en esta variable se une los dos apellidos que viene de la centralizada
      var us_apellidos = this.txtApellidoP + ' ' + this.txtApellidoS;
      let objUsuario = new Usuario(
        this.txtCodigo,
        this.txtCedula,
        this.txtNombre,
        us_apellidos,
        this.txtEmail,
        1
      );
  
      if (this.txtCedula == '' || this.txtNombre == '' || this.txtApellidoP == '' || this.txtApellidoS == '' || this.txtEmail == '') {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
      } else {
        const datos = await new Promise<any>((resolve) =>
          this.PersonaSer.IngresarUsuario(objUsuario).subscribe((translated) => {
            resolve(translated);
          })
        );
  
        if (datos.success) {
          const datosAudi={
            aud_usuario:this.sessionUser,
            aud_proceso:"Ingresar",
            aud_descripcion:"Ingresar usuario con los datos: {código: "+this.txtCodigo+", nombre:"+this.txtNombre+", apellidos:: "+us_apellidos+", cédula: "+this.txtCedula+", Email: "+this.txtEmail+"}",
            aud_rol:this.sessionRol,
            aud_dependencia:this.sessionDepC
          }
          const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
          this.rolpersona={
            rpe_persona:this.txtCodigo,
            rpe_rol:this.txtRol,
            rpe_dependencia: this.txtDependencia
          };
      
          if (this.txtDependencia == 0 || this.txtRol== 0) {
            this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
          } else {
            const datos = await new Promise<any>((resolve) =>
               this.RolPersonaSer.IngresarRolPersona(this.rolpersona).subscribe((translated) => {
                resolve(translated);
              })
            );
      
            if (datos.success) {
              const datosAudi={
                aud_usuario:this.sessionUser,
                aud_proceso:"Ingresar",
                aud_descripcion:"Ingresar usuario rol con los datos: {código: "+this.txtCodigo+", Rol: "+this.txtRol+", Dependencia: "+this.txtDependencia+"}",
                aud_rol:this.sessionRol,
                aud_dependencia:this.sessionDepC
              }
              const datosAud = await new Promise<any>((resolve) =>
              this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
              this.modalRolPer = false;
              this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Usuario registrado ' + this.mensajesg.IngresadoCorrectamente});
              this.listarRolPersona();
            } else {
              this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
            }
          }
        } else {
          this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: "Verifique que el usuario no este ingresado y que los datos ingresados esten correctos."});
        }
      }
    }else{
      this.rolpersona={
        rpe_persona:this.txtUsuario,
        rpe_rol:this.txtRol,
        rpe_dependencia: this.txtDependencia
      };
  
      if (this.txtUsuario == '' || this.txtDependencia == 0 || this.txtRol== 0) {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
      } else {
        const datos = await new Promise<any>((resolve) =>
           this.RolPersonaSer.IngresarRolPersona(this.rolpersona).subscribe((translated) => {
            resolve(translated);
          })
        );
  
        if (datos.success) {
          const datosAudi={
            aud_usuario:this.sessionUser,
            aud_proceso:"Ingresar",
            aud_descripcion:"Ingresar usuario rol con los datos: {código: "+this.txtUsuario+", Rol: "+this.txtRol+", Dependencia: "+this.txtDependencia+"}",
            aud_rol:this.sessionRol,
            aud_dependencia:this.sessionDepC
          }
          const datosAud = await new Promise<any>((resolve) =>
          this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
          this.modalRolPer = false;
          this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Asignación de usuario ' + this.mensajesg.IngresadoCorrectamente});
          this.listarRolPersona();
        } else {
          this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
        }
      }
    }
  }

  async guardarRolPersonaM(){
    this.rolpersona={
      rpe_dependencia: this.txtDependencia,
      rpe_dependencia_m: this.txtDependenciaM,
      rpe_persona:this.txtUsuario,
      rpe_rol:this.txtRol,
      rpe_rol_m:this.txtRolM,
      rpe_estado:parseInt(this.txtEstado)
    }
  
    if (this.txtDependencia == 0 || this.txtRol == 0 || this.txtUsuario == '') {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    }  else {
      const datos = await new Promise<any>((resolve) =>
        this.RolPersonaSer.ModificarUsuario(this.rolpersona).subscribe((translated) => {
          resolve(translated);
        })
      );
  
      if (datos.success) {
        this.modalRolPerM = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Asignar Rol a persona ' + this.mensajesg.ModificadoCorrectamente});
        this.listarRolPersona();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
      }
    }
  }
}
