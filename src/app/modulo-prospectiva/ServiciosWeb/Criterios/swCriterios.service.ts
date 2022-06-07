import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebPros } from '../../ConfigService/configServiciosWeb';
import { listaI } from '../../Interface/seguridad';

@Injectable({
  providedIn: 'root'
})
export class SwCriteriosService {

  UrlSiplanCri : String;
  constructor(private http: HttpClient, server: configServiciosWebPros) {
    this.UrlSiplanCri=server.urlSerSiplanCriterios;
  }

  ListarCriterios(codigo:any): Observable<listaI>{
    let direccion = this.UrlSiplanCri+'ListaCriterios';
      return this.http.post<listaI>(direccion, codigo);
  }

  ListarEncabezado(codigo:any): Observable<listaI>{
    let direccion = this.UrlSiplanCri+'ListaEncabezados';
      return this.http.post<listaI>(direccion, codigo);
  }

  ListarFases(): Observable<listaI>{
    let direccion = this.UrlSiplanCri+'ListaFases';
      return this.http.get<listaI>(direccion);
  }  

  ListarFasesGenerar(): Observable<listaI>{
    let direccion = this.UrlSiplanCri+'ListaFasesGenerar';
      return this.http.get<listaI>(direccion);
  }

  ListarCriteriosActivos(criterio:any):Observable<listaI>{
    let direccion=this.UrlSiplanCri+'ListaCriteriosActivos';
    return this.http.post<listaI>(direccion, criterio);
  }

  IngresarCriterios(cri: any): Observable<any>{
    let direccion = this.UrlSiplanCri+'IngresarCriterio';
    return this.http.post<any>(direccion, cri);
  }

  IngresarEncabezado(enc: any): Observable<any>{
    let direccion = this.UrlSiplanCri+'IngresarEncabezados';
    return this.http.post<any>(direccion, enc);
  }

  IngresarRespuesta(res:any): Observable<any>{
    let direccion=this.UrlSiplanCri+'IngresarRespuesta';
    return this.http.post<any>(direccion, res);
  }

  ModificarCriterios(cri: any): Observable<any>{
    let direccion = this.UrlSiplanCri+'ModificarCriterio';
    return this.http.post<any>(direccion, cri);
  }

  ModificarEncabezado(cri: any): Observable<any>{
    let direccion = this.UrlSiplanCri+'ModificarEncabezado';
    return this.http.post<any>(direccion, cri);
  }

  ModificarRespuesta(respuesta: any): Observable<any>{
    let direccion = this.UrlSiplanCri+'ModificarRespuesta';
    return this.http.post<any>(direccion, respuesta);
  }

  EliminarRespuesta(respuesta: any): Observable<any>{
    let direccion = this.UrlSiplanCri+'EliminarRespuesta';
    return this.http.post<any>(direccion, respuesta);
  }
}
