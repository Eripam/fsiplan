import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError  } from 'rxjs';
import { configServiciosWeb } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root',
})

export class swPersona {
  UrlSiplanC: String;
  UrlSiplanU : String;
  constructor(private http: HttpClient, server: configServiciosWeb) {
    this.UrlSiplanC = server.urlServiciosSiplanC;
    this.UrlSiplanU=server.urlServiciosSiplanUs;
  }

  BuscarUsuario(cedula: String): Observable<any> {
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanC + 'usuarioPorCedula/' + cedula;
    return this.http.get<any>(direccion);
  }

  ListaUsuarios(): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanU+'ListaUsuarios';
      return this.http.get<any>(direccion);
  }

  IngresarUsuario(usuario: any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanU+'IngresarUsuario';
    return this.http.post<any>(direccion, usuario);
  }

  ModificarUsuario(usuario: any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanU+'ModificarUsuario';
    return this.http.post<any>(direccion, usuario);
  }

  ListaUsuariosActivos(): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanU+'ListaUsuariosActivos';
      return this.http.get<any>(direccion);
  }
}
