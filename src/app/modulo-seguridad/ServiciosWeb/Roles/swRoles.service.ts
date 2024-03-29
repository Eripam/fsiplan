import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWeb } from '../../ConfigService/configServiciosWeb';
import {Data, listaI} from '../../Interface/seguridad';

@Injectable({
  providedIn: 'root',
})

export class swRoles {
  UrlSiplanR : String;
  constructor(private http: HttpClient, server: configServiciosWeb) {
    this.UrlSiplanR=server.urlServiciosSiplanRol;
  }

  ListaRoles(): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanR+'ListaRoles';
      return this.http.get<listaI>(direccion);
  }

  IngresarRol(data: Data): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanR+'IngresarRol';
    return this.http.post<any>(direccion, data);
  }

  ModificarRol(rol: Data): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanR+'ModificarRol';
    return this.http.post<any>(direccion, rol);
  }

  ListaRolesActivos(): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanR+'ListaRolesActivos';
      return this.http.get<any>(direccion);
  }

  ListaRolesActivosD(): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanR+'ListaRolesActivosD';
      return this.http.get<any>(direccion);
  }
}
