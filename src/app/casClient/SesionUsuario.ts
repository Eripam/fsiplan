import { Injectable } from '@angular/core';
import { CasClient } from './CasClient';
import { Location } from '@angular/common';
import { Router, CanActivate } from '@angular/router';
import { SwLoginService } from '../modulo-seguridad/ServiciosWeb/Login/swLogin.service';
import { swRolpersonaService } from '../modulo-seguridad/ServiciosWeb/RolPersona/swRolpersona.service';
@Injectable()

export class SesionUsuario implements CanActivate {

    private idUsuario: any;
    private datosL:any; 
    //private lstPerfiles: Array<any>;
    constructor(private location: Location, private router: Router, private casclient: CasClient, private servLogin: SwLoginService, private swRol: swRolpersonaService) { }

    async InicioSesion() {
        await this.obtenerTokenKey();
        //await this.ListarPerfiles();
    }



/*
    async ListarPerfilesDependenciasCarreras(objSelect, Tipo) {
        this.lstPerfiles = [];
        let nombresUsuario = objSelect.strNombreUsuario + " " + objSelect.strApellidoUsuario;
        if (Tipo == "ACADEMICO") {
            const datos = await new Promise<any>(resolve => this.serviciosWebModuloPermiso.ListarPerfilesCarreras(objSelect.intIdUsuario, objSelect.intIdRol).subscribe(translated => { resolve(translated) }));
            if (datos.success) {
                this.lstPerfiles = datos.listado;
                if (this.lstPerfiles.length > 0) {
                    var token = { idTipo: "ACADEMICO", idRol: objSelect.intIdRol, RolNombre: objSelect.strNombreRol, IdUser: objSelect.intIdUsuario, UserNombre: nombresUsuario, Cedula: objSelect.strCedula, Correo: objSelect.strCorreo, carreraSeleccionada: this.lstPerfiles[0].strcarrera, carreraSelecionadaBase: this.lstPerfiles[0].strbasedatos, carreraSelecionadaCodigo: this.lstPerfiles[0].strcodcarrera, carreraSelecionadaCodigoUnica: this.lstPerfiles[0].strcarreraunica, carreraSelecionadaFacultad: this.lstPerfiles[0].strfacultad, carreraSelecionadaFacultadCodigo: this.lstPerfiles[0].strcodfacultad }
                    const Token1 = await new Promise<any>(resolve => this.servicios.TokenJsonJava(token).subscribe(translated => { resolve(translated) }));
                    console.log(Token1)
                    sessionStorage.setItem('tokenGeneral', Token1.palabra)
                }
            }
        }
        if (Tipo == "ADMINISTRATIVO") {
            const datos = await new Promise<any>(resolve => this.serviciosWebModuloPermiso.ObtenerDependecia(objSelect.idDependecia).subscribe(translated => { resolve(translated) }));
            if (datos.success) {
                const token2 = { idTipo: "ADMINISTRATIVO", idRol: objSelect.intIdRol, RolNombre: objSelect.strNombreRol, IdUser: objSelect.intIdUsuario, UserNombre: nombresUsuario, Cedula: objSelect.strCedula, correo: objSelect.strCorreo, carreraSeleccionada: datos.listado.depNombre, carreraSelecionadaBase: datos.listado.depId, carreraSelecionadaCodigo: datos.listado.depId, carreraSelecionadaCodigoUnica: "", carreraSelecionadaFacultad: "", carreraSelecionadaFacultadCodigo: "" }
                const Token1 = await new Promise<any>(resolve => this.servicios.TokenJsonJava(token2).subscribe(translated => { resolve(translated) }));
                sessionStorage.setItem('tokenGeneral', Token1.palabra);
            }
        }
    }
    async ListadoDocentesCarreras(cedula, objSelect) {
        var respuesta = false;
        let nombresUsuario = objSelect.strNombreUsuario + " " + objSelect.strApellidoUsuario;
        const datos2 = await new Promise<any>(resolve => this.servicioscarrera.LisatdoCarreraDocentes(cedula).subscribe(translated => { resolve(translated) }));
        console.log(datos2);
        if (datos2.success) {
            if (datos2.listado.length > 0) {
                var token = { idTipo: "ACADEMICO", idRol: objSelect.intIdRol, RolNombre: objSelect.strNombreRol, IdUser: objSelect.intIdUsuario, UserNombre: nombresUsuario, Cedula: objSelect.strCedula, Correo: objSelect.strCorreo, carreraSeleccionada: datos2.listado[0].carreraSeleccionada, carreraSelecionadaBase: datos2.listado[0].carreraSelecionadaBase, carreraSelecionadaCodigo: datos2.listado[0].carreraSelecionadaCodigo, carreraSelecionadaCodigoUnica: datos2.listado[0].carreraSelecionadaCodigoUnica, carreraSelecionadaFacultad: datos2.listado[0].carreraSelecionadaFacultad, carreraSelecionadaFacultadCodigo: datos2.listado[0].carreraSelecionadaFacultadCodigo }
                const Token1 = await new Promise<any>(resolve => this.servicios.TokenJsonJava(token).subscribe(translated => { resolve(translated) }));
                sessionStorage.setItem('tokenGeneral', Token1.palabra)

                return respuesta = true;
            } else {
                return respuesta = false;
            }
        }
    }
    async ListadoCarrerasEstudiante(cedula, objSelect) {
        var respuesta = false;
        let nombresUsuario = objSelect.strNombreUsuario + " " + objSelect.strApellidoUsuario;

      
        const datos2 = await new Promise<any>(resolve => this.servicioscarrera.LisatdoEstudianteCarreras(cedula).subscribe(translated => { resolve(translated) }));
        console.log("aqui");
        console.log(datos2);
        if (datos2.success) {
            if (datos2.listado.length > 0) {
                var token = { idTipo: "ACADEMICO", idRol: objSelect.intIdRol, RolNombre: objSelect.strNombreRol, IdUser: objSelect.intIdUsuario, UserNombre: nombresUsuario, Cedula: objSelect.strCedula, Correo: objSelect.strCorreo, carreraSeleccionada: datos2.listado[0].strNombre, carreraSelecionadaBase: datos2.listado[0].strBaseDatos, carreraSelecionadaCodigo: datos2.listado[0].strCodCarrera, carreraSelecionadaCodigoUnica: datos2.listado[0].carrera_unica, carreraSelecionadaFacultad: "FIE", carreraSelecionadaFacultadCodigo: "FIE" }
                const Token1 = await new Promise<any>(resolve => this.servicios.TokenJsonJava(token).subscribe(translated => { resolve(translated) }));
                sessionStorage.setItem('tokenGeneral', Token1.palabra)
         
                return respuesta = true;
            } else {
                return respuesta = false;
            }
        }
    }
    //Datos Seesion Obtension
    async ObtenerDatosSesion() {
        const TokenDeco = await new Promise<any>(resolve => this.servicios.DecoToken(sessionStorage.getItem('token')).subscribe(translated => { resolve(translated) }));
        if (TokenDeco.success) {
            var Datos = { idRol: TokenDeco.Usuario.idRol, IdUser: TokenDeco.Usuario.IdUser, Cedula: TokenDeco.Usuario.Cedula, Correo: TokenDeco.Usuario.Correo, idRolSeleccionado: TokenDeco.Usuario.idRolSeleccionado, carrera: "", selectcarrera: "" }
        }
        return Datos;
    }

    async ObtenerDatosSesionUsuario() {
        const TokenDeco = await new Promise<any>(resolve => this.servicios.DecoToken(sessionStorage.getItem('tokenGeneral')).subscribe(translated => { resolve(translated) }));
        if (TokenDeco.success) {
            var Datos = { idTipo: TokenDeco.Usuario.idTipo, idRol: TokenDeco.Usuario.idRol, RolNombre: TokenDeco.Usuario.RolNombre, IdUser: TokenDeco.Usuario.IdUser, UserNombre: TokenDeco.Usuario.UserNombre, Cedula: TokenDeco.Usuario.Cedula, Correo: TokenDeco.Usuario.Correo, carreraSeleccionada: TokenDeco.Usuario.carreraSeleccionada, carreraSelecionadaBase: TokenDeco.Usuario.carreraSelecionadaBase, carreraSelecionadaCodigo: TokenDeco.Usuario.carreraSelecionadaCodigo, carreraSelecionadaCodigoUnica: TokenDeco.Usuario.carreraSelecionadaCodigoUnica, carreraSelecionadaFacultad: TokenDeco.Usuario.carreraSelecionadaFacultad, carreraSelecionadaFacultadCodigo: TokenDeco.Usuario.carreraSelecionadaFacultadCodigo }
        }
        return Datos;
    }
    
    async CerrarSessionToken(idUsuario) {
        const datos = await new Promise<any>(resolve => this.serviciosWebSistema.CerrarSessionToken(sessionStorage.getItem('key') ,idUsuario).subscribe(translated => { resolve(translated) }));
        console.log(datos)
   
    }

    async getIdUsuarioSesion() {
        var idusuario = 0;
        const TokenDeco = await new Promise<any>(resolve => this.servicios.DecoToken(sessionStorage.getItem('tokenUsuario')).subscribe(translated => { resolve(translated) }));
        if (TokenDeco.success) {
            idusuario = TokenDeco.Usuario.IdUser;
        }
        return idusuario;
    }*/

    Cambiar() {
        this.router.navigate(['/template/limpiar']);
    }

    //Cerrar la sesion del Usuario
    CerrarSessionGeneral() {
        this.casclient.Logout();
        sessionStorage.removeItem('clientName');
        sessionStorage.removeItem('loginUser');
        sessionStorage.removeItem('ticketUser');
        sessionStorage.removeItem('key');
    }
    CerrarSessionPerfiles() {
        sessionStorage.removeItem("tokenKey");
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('clientName');
        sessionStorage.removeItem('loginUser');
        sessionStorage.removeItem('ticketUser');
        sessionStorage.removeItem('key');
        sessionStorage.removeItem('tokenGeneral');
    }
    canActivate(): boolean {
        if (!this.casclient.isAuthenticated()) {
            this.router.navigate(['logout']);
            return false;
        }
        return true;
    }

    async obtenerTokenKey() {
        const envio={
            perid:sessionStorage.getItem("perid")
        }
        const datos = await new Promise<any>((resolve) => this.servLogin.Login(envio).subscribe(translated => { resolve(translated) }));
        sessionStorage.removeItem("perid");
        if(datos.success){
            sessionStorage.setItem('key', datos.token);
            this.obtenerDatosLogin().then(task=>{
                this.router.navigate([task.opc_url+'/'+task.rop_padreop]);
            })
        }else if(sessionStorage.getItem("loginUser")!=null){
            const envio={
                perid:sessionStorage.getItem("loginUser"),
                clientName:sessionStorage.getItem("clientName")
            }
            const datos = await new Promise<any>((resolve) => this.servLogin.LoginCorreo(envio).subscribe(translated => { resolve(translated) }));
            if(datos.success){
                sessionStorage.setItem('key', datos.token);
                this.obtenerDatosLogin().then(task=>{
                    this.router.navigate([task.opc_url+'/'+task.rop_padreop]);
                })
            }else{
                await this.router.navigate(['/error']);
            }
        }else{
            await this.router.navigate(['/error']);
        }
    }

    async obtenerDatosLogin(){
        const array={
          token:sessionStorage.getItem('key'),
          key:"S!pl@n1"
        }
        const datos = await new Promise<any>((resolve)=>this.servLogin.DecodingLogin(array).subscribe(translated=>{resolve(translated)}));
        return datos.data.value[0];
    }

    async obtenerOpcionesUsuario(user:any){
        const datos = await new Promise<any>((resolve)=>this.swRol.ListarOpcionesUsuario(user).subscribe(translated=>{resolve(translated)}));
        return datos.data[0];
    }
}
