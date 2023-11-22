import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { configServiciosWebEst } from '../../ConfigService/configServiciosWeb';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwEvaluacionService {
  UrlSiplanEval : String;
  constructor(private http: HttpClient, server: configServiciosWebEst) {
    this.UrlSiplanEval=server.urlSerSiplanEval+'fechas/';
  }

  ListarFechas(): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanEval+'ListarFechas';
    return this.http.get<any>(direccion);
  }

  IngresarFechasEval(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanEval+'IngresarFechasEval';
    return this.http.post<any>(direccion, datos);
  }
}
