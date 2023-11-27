import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configServiciosWebPlan } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwEstructuraService {

  urlPlanes:string;
  constructor(private http:HttpClient, private server:configServiciosWebPlan) { 
    this.urlPlanes=server.urlSerSiplanEstructura;
  }

  ListarEstructuraPlan(dato:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.urlPlanes+'ListarEstructuraPlan';
    return this.http.post<any>(direccion, dato);
  }

  IngresarEstructuraP(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.urlPlanes+'IngresarEstructura';
    return this.http.post<any>(direccion, datos);
  }

  ModificarEstructuraP(datos:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.urlPlanes+'ModificarEstructura';
    return this.http.post<any>(direccion, datos);
  }

  EliminarEstructuraP(datos:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.urlPlanes+'EliminarEstructura';
    return this.http.post<any>(direccion, datos);
  }
}
