import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebEst } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwEstructuraPlanService {

  urlSiplanEstructuraP: String;
  constructor(private http: HttpClient, server: configServiciosWebEst) {
    this.urlSiplanEstructuraP=server.urlSerSiplanEstrPlan;
  }

  ListaEstructuraPlanes(tipo:any): Observable<any>{
    let direccion = this.urlSiplanEstructuraP+'ListarEstructuraPlan';
    return this.http.post<any>(direccion, tipo);
  }

  ListaEstructuraPlanesSelect(tipo:any): Observable<any>{
    let direccion = this.urlSiplanEstructuraP+'ListarEstructuraPlanSelect';
    return this.http.post<any>(direccion, tipo);
  }

  ListaEstructuraPlanMapa(codigo:any):Observable<any>{
    let direccion = this.urlSiplanEstructuraP+'ListarEstructuraPlanMapa';
    return this.http.post<any>(direccion, codigo);
  }

  IngresarEstructuraPlanes(datos:any): Observable<any>{
    let direccion = this.urlSiplanEstructuraP+'IngresarEstructuraPlanes';
    return this.http.post<any>(direccion, datos);
  }

  ModificarEstructuraPlanes(datos:any): Observable<any>{
    let direccion = this.urlSiplanEstructuraP+'ModificarEstructuraPlanes';
    return this.http.post<any>(direccion, datos);
  }

  EliminarEstructuraPlanes(datos:any): Observable<any>{
    let direccion = this.urlSiplanEstructuraP+'EliminarEstructuraPlanes';
    return this.http.post<any>(direccion, datos);
  }

  ValidarEstructuraPlanes(datos:any): Observable<any>{
    let direccion = this.urlSiplanEstructuraP+'ValidarEstructuraPlanes';
    return this.http.post<any>(direccion, datos);
  }
}
