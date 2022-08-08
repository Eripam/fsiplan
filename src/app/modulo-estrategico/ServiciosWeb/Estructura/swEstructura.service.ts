import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebEst } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwEstructuraService {
  UrlSiplanEst : String;
  constructor(private http: HttpClient, server: configServiciosWebEst) {
    this.UrlSiplanEst=server.urlSerSiplanEstructura;
  }

  ListaEstructura(tipo:any): Observable<any>{
    let direccion = this.UrlSiplanEst+'ListarEstructura';
    return this.http.post<any>(direccion, tipo);
  }

  ListarMaximo(codigo:any):Observable<any>{
    let direccion=this.UrlSiplanEst+'ListarMaximo';
    return this.http.post<any>(direccion,codigo);
  }

  IngresarEstructura(datos:any): Observable<any>{
    let direccion = this.UrlSiplanEst+'IngresarEstructura';
    return this.http.post<any>(direccion, datos);
  }

  ModificarEstructura(datos:any): Observable<any>{
    let direccion = this.UrlSiplanEst+'ModificarEstructura';
    return this.http.post<any>(direccion, datos);
  }

  
  EliminarEstructura(datos:any): Observable<any>{
    let direccion = this.UrlSiplanEst+'EliminarEstructura';
    return this.http.post<any>(direccion, datos);
  }
}
