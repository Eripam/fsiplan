import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configServiciosWebPlan } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwPlanService {

  urlPlanes:string;
  constructor(private http:HttpClient, private server:configServiciosWebPlan) { 
    this.urlPlanes=server.urlSerSiplan;
  }

  ListarTipoPlan():Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.urlPlanes+'ListarTiposPlanes';
    return this.http.get<any>(direccion);
  }

  ListarPlanes(tipo:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.urlPlanes+'ListarPlanes';
    return this.http.post<any>(direccion, tipo);
  }

  IngresarPlanes(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.urlPlanes+'IngresarPlanes';
    return this.http.post<any>(direccion, datos);
  }
}
