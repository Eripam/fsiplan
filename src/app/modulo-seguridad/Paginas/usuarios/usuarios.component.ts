import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { swPersona } from '../../ServiciosWeb/Usuarios/swPersona.service';
import { swRoles } from '../../ServiciosWeb/Roles/swRoles.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MensajesGenerales } from '../../../Herramientas/Mensajes/MensajesGenerales.component';
import { Usuario, Data, listaI } from '../../Interface/seguridad';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UsuariosComponent implements OnInit {
  //Variable para abrir y cerrar el modal de ingreso de usuario y rol
  productDialog!: boolean;
  productDialog3!: boolean;
  //Variable para abrir y cerrar el modal de modificar
  productDialog2!: boolean;
  productDialog4!: boolean;
  //Variable para listar usuarios y roles
  listaUsuarios: any[] = [];
  listaRoles: Data[]=[];
  //Titulo del modal
  tituloModal: string = '';
  //Menú del home
  items: MenuItem[] = [{ label: 'Gestión de Usuarios y Roles' }];
  home!: MenuItem;
  //Variable para los estados de usuario
  statuses!: any[];
  //Variable para mostrar el loading en la tabla
  loading: boolean = true;
  //Variable para mostrar los datos por usuario
  bsPersona: any | undefined;
  //Variables de cada dato de usuario para ingresar y modificar
  txtCodigo: string = '';
  txtCedula: string = '';
  txtNombre: string = '';
  txtApellidoP: string = '';
  txtApellidoS: string = '';
  txtEmail: string = '';
  txtEstado: number = 1;
  //Variables de cada dato de rol para ingresar y modificar
  txtCodigoRol: string ='';
  txtNombreRol: string='';
  txtDescripcionRol: string='';
  //Variable de clase usuario y roles
  role: Data={};

  constructor(private PersonaSer: swPersona, private messageService: MessageService,private mensajesg: MensajesGenerales, private RolSer: swRoles) {
  }

  ngOnInit() {
    this.listarUsuarios();
    this.listarRoles();
    //Menu superio con enlace del home
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    //Ingreso de los tipos que tiene el estado de usuario
    this.statuses = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 0 },
    ];
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

  //Función para guardar el usuario 
  async guardarUsuario() {
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
        this.productDialog = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Usuario ' + this.mensajesg.IngresadoCorrectamente});
        this.listarUsuarios();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }
  }

  //Función para guardar el rol 
  async guardarRol() { 
      this.role={
        rol_descripcion: this.txtDescripcionRol,
        rol_nombre:this.txtNombreRol
      };

      if (this.txtNombreRol == '' || this.txtDescripcionRol == '') {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
      } else {
        const datos = await new Promise<any>((resolve) =>
           this.RolSer.IngresarRol(this.role).subscribe((translated) => {
            resolve(translated);
          })
        );
  
        if (datos.success) {
          this.productDialog3 = false;
          this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Rol ' + this.mensajesg.IngresadoCorrectamente});
          this.listarRoles();
        } else {
          this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
        }
      }
    }
  
  //Función para listar todos los usuarios ingresados
  async listarUsuarios() {
    const datos = await new Promise<any>((resolve) =>  this.PersonaSer.ListaUsuarios().subscribe((translated) => { resolve(translated); }));
    this.listaUsuarios = datos.data;
    this.loading = false;
  }

   //Función para listar todos los roles ingresados
   async listarRoles() {
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.RolSer.ListaRoles().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaRoles=datos.data;
    }else{
      this.listaRoles=[];
    }
    this.loading = false;
  }

  //Función para mostrar los datos en el modal, y posterior modificarlos
  modificarUsuario(usuario: any) {
    this.tituloModal = 'Modificar Usuario';
    this.txtCedula = usuario.per_cedula;
    this.txtCodigo = usuario.per_codigo;
    this.txtNombre = usuario.per_nombres;
    this.txtApellidoP = usuario.per_apellidos;
    this.txtEmail = usuario.per_email;
    this.txtEstado = usuario.per_estado;
    this.productDialog2 = true;
  }

  //Función para guardar datos modificados
  async guardarmodificarUsuario() {
    let objUsuario = new Usuario(
      this.txtCodigo,
      this.txtCedula,
      this.txtNombre,
      this.txtApellidoP,
      this.txtEmail,
      this.txtEstado
    );

    if (this.txtCodigo == '' || this.txtEmail == '') {
      this.messageService.add({severity: 'error',summary: this.mensajesg.CabeceraError, detail: this.mensajesg.CamposVacios});
    } else {
      const datos = await new Promise<any>((resolve) =>
        this.PersonaSer.ModificarUsuario(objUsuario).subscribe((translated) => {
          resolve(translated);
        })
      );

      if (datos.success) {
        this.productDialog2 = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Usuario ' + this.mensajesg.ModificadoCorrectamente});
        this.listarUsuarios();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
      }
    }
  }

  //Función para mostrar los datos en el modal de roles
  modificarRol(rol: any){
    this.tituloModal='Modificar Rol';
    this.txtCodigoRol=rol.rol_codigo;
    this.txtNombreRol=rol.rol_nombre;
    this.txtDescripcionRol=rol.rol_descripcion;
    this.txtEstado=rol.rol_estado;
    this.productDialog4=true;
  }

  //Función para guardar datos modificados
   async guardarmodificarRol() {
      this.role={
        rol_codigo:parseInt(this.txtCodigoRol),
        rol_nombre:this.txtNombreRol,
        rol_descripcion:this.txtDescripcionRol,
        rol_estado:this.txtEstado
      }
  
      if (this.txtNombreRol == '' || this.txtDescripcionRol == '' || this.txtCodigoRol == '') {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
      }  else {
        const datos = await new Promise<any>((resolve) =>
          this.RolSer.ModificarRol(this.role).subscribe((translated) => {
            resolve(translated);
          })
        );
  
        if (datos.success) {
          this.productDialog4 = false;
          this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Rol ' + this.mensajesg.ModificadoCorrectamente});
          this.listarRoles();
        } else {
          this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProceso});
        }
      }
  }
  

  //Función para abrir el modal de ingresar usuario
  openNew() {
    this.txtCedula='';
    this.txtNombre='';
    this.txtApellidoP='';
    this.txtApellidoS='';
    this.txtEmail='';
    this.tituloModal = 'Ingresar Usuario';
    this.productDialog = true;
  }

  openNewRol() {
    this.txtNombreRol='';
    this.txtDescripcionRol='';
    this.txtCodigoRol='';
    this.tituloModal = 'Ingresar Rol';
    this.productDialog3 = true;
  }

  //Función para cerrar el modal de ingresar usuario
  hideDialog() {
    this.productDialog = false;
  }

  //Función para cerrar el modal de ingresar rol
  hideDialogRol() {
    this.productDialog3 = false;
  }
  
  //Función para cerrar el modal de modificar usuario
  hideDialogM() {
    this.productDialog2 = false;
  }
  
  //Función para cerrar el modal de modificar rol
  hideDialogMRol() {
    this.productDialog4 = false;
  }
}