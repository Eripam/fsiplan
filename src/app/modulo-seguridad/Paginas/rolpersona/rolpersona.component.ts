import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { listaI, rolpersona, dependencia, Data, rolopcion, opcion, PadreOpcion} from '../../Interface/seguridad';
import { swRolpersonaService} from '../../ServiciosWeb/RolPersona/swRolpersona.service';
import { swDependencia} from '../../ServiciosWeb/Dependencia/swDependencia.service';
import { swRoles} from '../../ServiciosWeb/Roles/swRoles.service';
import { swPersona} from '../../ServiciosWeb/Usuarios/swPersona.service';
import { MensajesGenerales} from '../../../Herramientas/Mensajes/MensajesGenerales.component';
import { swPadreopcionService } from '../../ServiciosWeb/PadreOpcion/swpadreopcion.service';
import { ThrowStmt } from '@angular/compiler';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { ActivatedRoute } from '@angular/router';
import { SwAuditoriaService } from '../../ServiciosWeb/Auditoria/swAuditoria.service';
import { configCorreo } from 'src/app/Herramientas/Correo/configCorreo';
import { SwCorreoService } from 'src/app/Herramientas/Correo/swCorreo.service';

@Component({
  selector: 'app-rolpersona',
  templateUrl: './rolpersona.component.html',
  styleUrls: ['./rolpersona.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RolpersonaComponent implements OnInit {
  //Variable para listar
  listaRolP: rolpersona[] = [];
  listaUsuarios: any[]=[];
  listaDependencias: dependencia[]=[];
  listaRoles: Data[]=[];
  listaRolOp: rolopcion[]=[];
  listaOpcion: opcion[]=[];
  listaPadreOpcion:PadreOpcion[]=[];
  //Menú del home
  items: MenuItem[] = [];
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
  
  constructor(private RolPersonaSer: swRolpersonaService, private swDep: swDependencia, private swRoles: swRoles, private swUsuario: swPersona, private messageService: MessageService ,private mensajesg: MensajesGenerales, private swOpciones: swPadreopcionService, private sesiones: SesionUsuario, private route: ActivatedRoute, private swAuditoria:SwAuditoriaService, private configCorreo: configCorreo, private swCorreo: SwCorreoService) {
  }


  async ngOnInit() {
    this.listarRolPersona();
    this.listaRolOpcion();
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
    this.items=[{label:datosRol.pop_nombre},{ label: datosRol.opc_nombre }]

    //Ingreso de los tipos que tiene el estado de usuario
    this.statuses = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 0 },
    ];
  }

  //Función para listar todos los roles de usuarios ingresados
  async listarRolPersona() {
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.RolPersonaSer.ListaRolesPersona().subscribe((translated) => { resolve(translated); }));
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
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swDep.ListaDependenciaAc().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaDependencias = datos.data;
    }else{
      this.listaDependencias =[];
    }
    this.loading = false;
  }

  //Función para listar todos los usuario activos
  async listarRoles() {
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.swRoles.ListaRolesActivos().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaRoles = datos.data;
    }else{
      this.listaRoles =[];
    }
    this.loading = false;
  }

  //Función para listar todoas los roles opciones
  async listaRolOpcion(){
    const datos:listaI = await new Promise<listaI>((resolve) =>  this.RolPersonaSer.ListaRolOpcion().subscribe((translated) => { resolve(translated); }));
    if(datos.success){
      this.listaRolOp = datos.data;
    }else{
      this.listaRolOp =[];
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

  openNew(){
    if(this.txtIngresar){
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
    if(this.txtModificar){
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
          aud_descripcion:"Ingresar rol persona con los datos: {Persona:"+this.txtUsuario+", Rol: "+this.txtRol+", Dependencia: "+this.txtDependencia+"}",
          aud_rol:this.sessionRol,
          aud_dependencia:this.sessionDepC
        }
        const datosAud = await new Promise<any>((resolve) =>
        this.swAuditoria.IngresarAuditoria(datosAudi).subscribe((translated) => {resolve(translated);}));
        await this.listarRolPersona();
        for(let user of this.listaRolP){
          if(user.per_codigo==this.txtUsuario && user.rpe_rol==this.txtRol && user.rpe_dependencia==this.txtDependencia){
            this.enviarCorreo(user);
          }
        }
        this.modalRolPer = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Asignación de usuario ' + this.mensajesg.IngresadoCorrectamente});
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
      }
    }
  }

  async guardarRolOpcion(){
    this.rolopcion={
      rop_rol: this.txtRol,
      rop_padreop : parseInt(this.txtPadreOp),
      rop_opcion: parseInt(this.txtOpcion),
      rop_insertar: this.insertCheck,
      rop_modificar:this.updateCheck,
      rop_eliminar:this.deleteCheck
    };

    if (this.txtRol == 0 || this.txtPadreOp == '' || this.txtOpcion== '' || this.insertCheck==null || this.updateCheck==null || this.deleteCheck==null) {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    } else {
      const datos = await new Promise<any>((resolve) =>
         this.RolPersonaSer.IngresarRolOpcion(this.rolopcion).subscribe((translated) => {
          resolve(translated);
        })
      );

      if (datos.success) {
        this.modalRolOp = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Asignación de opción a rol ' + this.mensajesg.IngresadoCorrectamente});
        this.listaRolOpcion();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
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

  async guardarRolOpcionM(){
    this.rolopcion={
      rop_rol:this.txtRol,
      rop_padreop:parseInt(this.txtPadreOp),
      rop_padreop_a:parseInt(this.txtPadreOpM),
      rop_opcion:parseInt(this.txtOpcion),
      rop_opcion_a:parseInt(this.txtOpcionM),
      rop_insertar:this.insertCheck,
      rop_modificar:this.updateCheck,
      rop_eliminar:this.deleteCheck,
      rop_estado:parseInt(this.txtEstado)
    }
  
    if (this.txtPadreOp == '' || this.txtRol == 0 || this.txtOpcion == '' || this.insertCheck == null || this.updateCheck==null || this.deleteCheck==null) {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    }  else {
      const datos = await new Promise<any>((resolve) =>
        this.RolPersonaSer.ModificarRolOpcion(this.rolopcion).subscribe((translated) => {
          resolve(translated);
        })
      );
  
      if (datos.success) {
        this.modalRolOpM = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Asignar Opción a Rol ' + this.mensajesg.ModificadoCorrectamente});
        this.listaRolOpcion();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
      }
    }
  }

  async enviarCorreo(user:any){
    let contenido=this.configCorreo.cuerpoCorreo(1)+'<b>'+user.per_nombres+' '+user.per_apellidos+'</b>'+this.configCorreo.cuerpoCorreo(2)+this.configCorreo.cuerpoCorreo(3)+'<br><br><b>C&eacute;dula: </b>'+user.per_cedula+'<br><b>Rol: </b>'+user.rol_nombre+'<br><b>Dependencia: </b>'+user.dep_nombre+'<br><br>'+this.configCorreo.cuerpoCorreo(4)+this.configCorreo.cuerpoCorreo(5);
    var dat={
      asunto:'Creación de usuario',
      recibe:user.per_email,
      contenido:btoa(contenido)
    }
    const datos = await new Promise<any>((resolve) =>
      this.swCorreo.envioMail(dat).subscribe((translated) => {
          resolve(translated);
        })
      );
  }
}
