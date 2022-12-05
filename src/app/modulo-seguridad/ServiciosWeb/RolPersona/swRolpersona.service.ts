import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWeb } from '../../ConfigService/configServiciosWeb';
import {listaI, rolpersona} from '../../Interface/seguridad';

@Injectable({
  providedIn: 'root'
})
export class swRolpersonaService {

  UrlSiplanR : String;
  UrlSiplanRO: string;
  constructor(private http: HttpClient, server: configServiciosWeb) {
    this.UrlSiplanR=server.urlServiciosSiplanRolP;
    this.UrlSiplanRO=server.urlServiciosSiplanRolO;
  }

  ListaRolesPersona(): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanR+'ListaRolPersona';
      return this.http.get<listaI>(direccion);
  }

  ListaRolesPersonaDep(codigo: any): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanR+'ListaRolPersonaDep';
      return this.http.post<listaI>(direccion, codigo);
  }

  IngresarRolPersona(rolper: any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanR+'IngresarRolPersona';
    return this.http.post<any>(direccion, rolper);
  }

  ModificarUsuario(rolper: any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanR+'ModificarRolPersona';
    return this.http.post<any>(direccion, rolper);
  }

  ListaRolOpcion(): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanRO+'ListaRolOpcion';
      return this.http.get<listaI>(direccion);
  }

  IngresarRolOpcion(rolop: any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanRO+'IngresarRolOpcion';
    return this.http.post<any>(direccion, rolop);
  }

  ModificarRolOpcion(rolop: any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanRO+'ModificarRolOpcion';
    return this.http.post<any>(direccion, rolop);
  }

  ListarOpcionRol(rolop: any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanRO+'ListaOpcionRol';
    return this.http.post<any>(direccion, rolop);
  }

  ListarOpcionesUsuario(usuario: any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanRO+'ListarOpcionesUsuario';
    return this.http.post<any>(direccion, usuario);
  }
}
