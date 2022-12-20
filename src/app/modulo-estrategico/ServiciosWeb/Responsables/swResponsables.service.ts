import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { configServiciosWebEst } from '../../ConfigService/configServiciosWeb';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwResponsablesService {
  UrlSiplanResponsable : String;
  constructor(private http: HttpClient, server: configServiciosWebEst) {
    this.UrlSiplanResponsable=server.urlSerSiplanResponsables;
  }

  ListarResponsables(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanResponsable+'ListarResponsables';
    return this.http.post<any>(direccion, codigo);
  }

  IngresarResponsable(res:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanResponsable+'IngresarResponsable';
    return this.http.post<any>(direccion, res);
  }

  EliminarResponsable(res:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanResponsable+'EliminarResponsable';
    return this.http.post<any>(direccion, res);
  }
}
