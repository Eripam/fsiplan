import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebPlan } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  UrlSiplanPlan : String;
  constructor(private http: HttpClient, server: configServiciosWebPlan) {
    this.UrlSiplanPlan=server.urlSerSiplan;
  }

  ListaPlanes(tipo:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanPlan+'ListarPlanes';
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

}
