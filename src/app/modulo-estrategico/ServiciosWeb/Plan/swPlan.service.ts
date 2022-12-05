import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebEst } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwPlanService {
  UrlSiplanPlan : String;
  constructor(private http: HttpClient, server: configServiciosWebEst) {
    this.UrlSiplanPlan=server.urlSerSiplanPlanE;
  }

  ListaPlanes(tipo:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanPlan+'ListarPlanesActivos';
    return this.http.post<any>(direccion, tipo);
  }

  ListaPlanesCompletos(tipo:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanPlan+'ListarPlanesCompletos';
    return this.http.post<any>(direccion, tipo);
  }

  IngresarPlanes(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanPlan+'IngresarPlanes';
    return this.http.post<any>(direccion, datos);
  }

  ModificarPlanes(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanPlan+'ModificarPlanes';
    return this.http.post<any>(direccion, datos);
  }

  EliminarPlanes(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanPlan+'EliminarPlanes';
    return this.http.post<any>(direccion, datos);
  }

  ValidarPlanes(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanPlan+'ValidarPlanes';
    return this.http.post<any>(direccion, datos);
  }
}
