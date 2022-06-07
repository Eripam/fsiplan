import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebPros } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwArbolService {
  UrlSiplanArbol : String;
  constructor(private http: HttpClient, server: configServiciosWebPros) {
    this.UrlSiplanArbol=server.urlSerSiplanArbol;
  }

  ListaPartes(codigo: any): Observable<any>{
    let direccion = this.UrlSiplanArbol+'ListarTipoArbol';
    return this.http.post<any>(direccion, codigo);
  }

  ListaPartesC(codigo: any): Observable<any>{
    let direccion = this.UrlSiplanArbol+'ListarTipoArbolC';
    return this.http.post<any>(direccion, codigo);
  }

  ListaEstructura(codigo:any):Observable<any>{
    let direccion = this.UrlSiplanArbol+'ListarEstructuraArbol';
    return this.http.post<any>(direccion, codigo);
  }

  IngresarArbol(datos: any): Observable<any>{
    let direccion = this.UrlSiplanArbol+'IngresarArbol';
    return this.http.post<any>(direccion, datos);
  }

  IngresarTipoArbol(datos: any): Observable<any>{
    let direccion = this.UrlSiplanArbol+'IngresarTipoArbol';
    return this.http.post<any>(direccion, datos);
  }
  
  ModificarArbol(datos: any): Observable<any>{
    let direccion = this.UrlSiplanArbol+'ModificarArbol';
    return this.http.post<any>(direccion, datos);
  }

  ModificarTipoArbol(datos: any): Observable<any>{
    let direccion = this.UrlSiplanArbol+'ModificarTipoArbol';
    return this.http.post<any>(direccion, datos);
  }

  EliminarArbol(datos: any): Observable<any>{
    let direccion = this.UrlSiplanArbol+'EliminarArbol';
    return this.http.post<any>(direccion, datos);
  }

  EliminarTipoArbol(datos: any): Observable<any>{
    let direccion = this.UrlSiplanArbol+'EliminarTipoArbol';
    return this.http.post<any>(direccion, datos);
  }

  EliminarArbolID(datos: any): Observable<any>{
    let direccion = this.UrlSiplanArbol+'EliminarArbolID';
    return this.http.post<any>(direccion, datos);
  }
}
