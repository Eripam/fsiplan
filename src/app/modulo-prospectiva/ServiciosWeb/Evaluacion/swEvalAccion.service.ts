import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebPros } from '../../ConfigService/configServiciosWeb';
import { listaI } from '../../Interface/seguridad';

@Injectable({
  providedIn: 'root'
})
export class SwEvalAccionService {

  UrlSiplanResp : String;
  constructor(private http: HttpClient, server: configServiciosWebPros) {
    this.UrlSiplanResp=server.urlSerSiplanRespuesta;
  }

  ListarRespuestaC(codigo:any): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanResp+'ListaRespuestaC';
      return this.http.post<listaI>(direccion, codigo);
  }

  ListarRespuesta(codigo:any): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanResp+'ListaRespuesta';
      return this.http.post<listaI>(direccion, codigo);
  }

  ValidacionEncuesta(codigo:any):Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanResp+'ValidacionEncuesta';
    return this.http.post<listaI>(direccion, codigo);
  }

  ListarTiempo(codigo:any):Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanResp+'ListaTiempos';
      return this.http.post<listaI>(direccion, codigo);
  }

  ListaRespuestaE(codigo:any):Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanResp+'ListaRespuestaEn';
    return this.http.post<listaI>(direccion, codigo);
  }

  ListarAccionesEjes(codigo:any):Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanResp+'ListarAccionesEjes';
    return this.http.post<listaI>(direccion, codigo);
  }

  IngresarTiempo(datos:any): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanResp+'IngresarTiempo';
      return this.http.post<listaI>(direccion, datos);
  }

  IngresarTabulacion(datos:any): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanResp+'IngresarTabulacion';
      return this.http.post<listaI>(direccion, datos);
  }

  ModificarTiempo(datos:any): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanResp+'ModificarTiempo';
      return this.http.post<listaI>(direccion, datos);
  }

  IngresarRespuesta(datos:any): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanResp+'IngresarRespuesta';
      return this.http.post<listaI>(direccion, datos);
  }

  IngresarEncuestaEstado(datos:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanResp+'IngresarEncuestaEstado';
    return this.http.post<any>(direccion, datos);
  }
  
  EliminarAccionesTab(datos:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanResp+'EliminarAccionesTab';
    return this.http.post<any>(direccion, datos);
  }
}
