import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebPlan } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwEstructuraPlanService {

  urlSiplanEstructuraP: String;
  constructor(private http: HttpClient, server: configServiciosWebPlan) {
    this.urlSiplanEstructuraP=server.urlSerSiplanEstPlanes;
  }

  ListaEstructuraPlanes(tipo:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.urlSiplanEstructuraP+'ListarEstructuraPlan';
    return this.http.post<any>(direccion, tipo);
  }

  
  ListaEstructuraPlanesSelect(tipo:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.urlSiplanEstructuraP+'ListarEstructuraPlanSelect';
    return this.http.post<any>(direccion, tipo);
  }

  IngresarEstructuraPlanes(tipo:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.urlSiplanEstructuraP+'IngresarEstructuraPlan';
    return this.http.post<any>(direccion, tipo);
  }

  ModificarEstructuraPlanes(tipo:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.urlSiplanEstructuraP+'ModificarEstructuraPlanes';
    return this.http.post<any>(direccion, tipo);
  }
}
