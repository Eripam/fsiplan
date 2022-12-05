import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWeb } from '../../ConfigService/configServiciosWeb';
import { listaI } from '../../Interface/seguridad';

@Injectable({
  providedIn: 'root'
})
export class swPadreopcionService {
  UrlSiplanPO : String;
  UrlSiplanOp: string;
  constructor(private http: HttpClient, server: configServiciosWeb) {
    this.UrlSiplanPO=server.urlServiciosSiplanPadreO;
    this.UrlSiplanOp=server.urlServiciosSiplanOpcion;
  }

  ListaPadreOpcion(): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanPO+'ListaPadreOpcion';
      return this.http.get<listaI>(direccion);
  }

  ListaPadreOpcionAc(): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanPO+'ListaPadreOpcionActivo';
      return this.http.get<listaI>(direccion);
  }

  IngresarPadreOpcion(tdep: any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanPO+'IngresarPadreOpcion';
    return this.http.post<any>(direccion, tdep);
  }

  ModificarPadreOpcion(tdep: any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanPO+'ModificarPadreOpcion';
    return this.http.post<any>(direccion, tdep);
  }

  ListarOpciones(): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanOp+'ListaOpcion';
      return this.http.get<listaI>(direccion);
  }

  ListarOpcionesA(): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion= this.UrlSiplanOp+'ListaOpcionActivos';
    return this.http.get<listaI>(direccion);
  }

  IngresarOpcion(tdep: any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanOp+'IngresarOpcion';
    return this.http.post<any>(direccion, tdep);
  }

  ModificarOpcion(tdep: any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanOp+'ModificarOpcion';
    return this.http.post<any>(direccion, tdep);
  }
}
