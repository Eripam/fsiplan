import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWeb } from '../../ConfigService/configServiciosWeb';
import { listaI, tipoDep} from '../../Interface/seguridad';

@Injectable({
  providedIn: 'root',
})

export class swDependencia {
  UrlSiplanD : String;
  constructor(private http: HttpClient, server: configServiciosWeb) {
    this.UrlSiplanD=server.urlServiciosSiplanDep;
  }

  ListaTipoDependencia(): Observable<listaI>{
    let direccion = this.UrlSiplanD+'ListaTipoDep';
      return this.http.get<listaI>(direccion);
  }

  ListaTipoDependenciaA(): Observable<listaI>{
    let direccion = this.UrlSiplanD+'ListaTipoDepActivas';
    return this.http.get<listaI>(direccion);
  }

  IngresarTipoDependencia(tdep: any): Observable<any>{
    let direccion = this.UrlSiplanD+'IngresarTipoDep';
    return this.http.post<any>(direccion, tdep);
  }

  ModificarTipoDependencia(tdep: any): Observable<any>{
    let direccion = this.UrlSiplanD+'ModificarTipoDep';
    return this.http.post<any>(direccion, tdep);
  }

  ListaDependencia(): Observable<listaI>{
    let direccion = this.UrlSiplanD+'ListaDependencia';
    return this.http.get<listaI>(direccion);
  }

  ListaDependenciaAc(): Observable<listaI>{
    let direccion = this.UrlSiplanD+ 'ListaDependenciaActivas';
    return this.http.get<listaI>(direccion);
  }

  IngresarDependencia(tdep: any): Observable<any>{
    let direccion = this.UrlSiplanD+'IngresarDependencia';
    return this.http.post<any>(direccion, tdep);
  }

  ModificarDependencia(tdep: any): Observable<any>{
    let direccion = this.UrlSiplanD+'ModificarDependencia';
    return this.http.post<any>(direccion, tdep);
  }
}
