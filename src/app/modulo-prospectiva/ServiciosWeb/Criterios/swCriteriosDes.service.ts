import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebPros } from '../../ConfigService/configServiciosWeb';
import { listaI } from '../../Interface/seguridad';

@Injectable({
  providedIn: 'root'
})
export class SwCriteriosDesService {

  UrlSiplanCriD : String;
  constructor(private http: HttpClient, server: configServiciosWebPros) {
    this.UrlSiplanCriD=server.urlSerSiplanCriterioDes;
  }

  ListarCriteriosDes(codigo:any): Observable<listaI>{
    let direccion = this.UrlSiplanCriD+'ListaCriteriosDesc';
      return this.http.post<listaI>(direccion, codigo);
  }

  LisarAccionesSeleccionadas(codigo:any):Observable<listaI>{
    let direccion = this.UrlSiplanCriD+'ListaAccionesSeleccionadas';
    return this.http.post<listaI>(direccion, codigo);
  }

  ListarAccionesSeleccionadasUsuario(codigo:any):Observable<listaI>{
    let direccion = this.UrlSiplanCriD+'ListaAccionesSeleccionadasUsuario';
    return this.http.post<listaI>(direccion, codigo);
  }

  ListarAccionesResultados(codigo:any):Observable<listaI>{
    let direccion= this.UrlSiplanCriD+'AccionesResultados';
    return this.http.post<listaI>(direccion, codigo);
  }

  IngresarCriteriosDes(cri: any): Observable<any>{
    let direccion = this.UrlSiplanCriD+'IngresarCriterioDesc';
    return this.http.post<any>(direccion, cri);
  }

  IngresarConsecuencia(cri: any): Observable<any>{
    let direccion = this.UrlSiplanCriD+'IngresarConsecuencia';
    return this.http.post<any>(direccion, cri);
  }

  IngresarUtopia(utopia:any):Observable<any>{
    let direccion=this.UrlSiplanCriD+'IngresarUtopia';
    return this.http.post<any>(direccion, utopia);
  }

  IngresarAcciones(cri: any): Observable<any>{
    let direccion = this.UrlSiplanCriD+'IngresarAcciones';
    return this.http.post<any>(direccion, cri);
  }

  ModificarCriteriosDes(cri: any): Observable<any>{
    let direccion = this.UrlSiplanCriD+'ModificarCriterioDesc';
    return this.http.post<any>(direccion, cri);
  }

  ModificarConsecuencia(cri: any): Observable<any>{
    let direccion = this.UrlSiplanCriD+'ModificarConsecuencia';
    return this.http.post<any>(direccion, cri);
  }

  ModificarAccion(cri: any): Observable<any>{
    let direccion = this.UrlSiplanCriD+'ModificarAccion';
    return this.http.post<any>(direccion, cri);
  }

  SeleccionarAccion(accion:any):Observable<any>{
    let direccion=this.UrlSiplanCriD+'SeleccionarAccion';
    return this.http.post<any>(direccion, accion);
  }

  ModificarUtopia(cri: any): Observable<any>{
    let direccion = this.UrlSiplanCriD+'ModificarUtopia';
    return this.http.post<any>(direccion, cri);
  }

  ValidacionEliminacion(codigo:any): Observable<any>{
    let direccion = this.UrlSiplanCriD+'ValidacionEliminacion';
    return this.http.post<any>(direccion, codigo);
  }

  ValidacionEliminacionCon(codigo:any): Observable<any>{
    let direccion = this.UrlSiplanCriD+'ValidacionEliminacionCon';
    return this.http.post<any>(direccion, codigo);
  }

  ValidacionEliminacionAcc(codigo:any): Observable<any>{
    let direccion = this.UrlSiplanCriD+'ValidacionEliminacionAcc';
    return this.http.post<any>(direccion, codigo);
  }

  ValidacionEliminacionUtopia(codigo:any): Observable<any>{
    let direccion = this.UrlSiplanCriD+'ValidacionEliminacionUtopia';
    return this.http.post<any>(direccion, codigo);
  }

  EliminarCriterioD(codigo:any):Observable<any>{
    let direccion=this.UrlSiplanCriD+'EliminarCriterioD';
    return this.http.post<any>(direccion, codigo);
  }

  EliminarConsecuencia(codigo:any):Observable<any>{
    let direccion=this.UrlSiplanCriD+'EliminarConsecuencia';
    return this.http.post<any>(direccion, codigo);
  }

  EliminarAccion(codigo:any):Observable<any>{
    let direccion=this.UrlSiplanCriD+'EliminarAccion';
    return this.http.post<any>(direccion, codigo);
  }

  EliminarUtopia(cri: any): Observable<any>{
    let direccion = this.UrlSiplanCriD+'EliminarUtopia';
    return this.http.post<any>(direccion, cri);
  }
}
