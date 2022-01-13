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
  constructor(private http: HttpClient, server: configServiciosWeb) {
    this.UrlSiplanR=server.urlServiciosSiplanRolP;
  }

  ListaRolesPersona(): Observable<listaI>{
    let direccion = this.UrlSiplanR+'ListaRolPersona';
      return this.http.get<listaI>(direccion);
  }

  IngresarRolPersona(rolper: any): Observable<any>{
    let direccion = this.UrlSiplanR+'IngresarRolPersona';
    return this.http.post<any>(direccion, rolper);
  }

  ModificarUsuario(rolper: any): Observable<any>{
    let direccion = this.UrlSiplanR+'ModificarRolPersona';
    return this.http.post<any>(direccion, rolper);
  }
}
