import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configServiciosWebEst } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwArchivoPlanService {
  UrlSiplanPlan : String;
  UrlSiplanArchivo: String;
  constructor(private http: HttpClient, server: configServiciosWebEst) {
    this.UrlSiplanPlan=server.urlSerSiplanArchivo;
    this.UrlSiplanArchivo=server.urlSerSiplanToken;
  }

  ObtenerTokenArchivos(datos:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanArchivo+'getTokenAplicacion';
    return this.http.post<any>(direccion, datos);
  }

  IngresarArchivo(datos:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanPlan+'IngresarArchivo';
    return this.http.post<any>(direccion, datos);
  }

  subirArchivos(contenido:any, token:any):Observable<any>{
    sessionStorage.setItem("archivo", "true");
    sessionStorage.setItem("tokena", token);
    let direccion = this.UrlSiplanArchivo+'uploadFile';
    //return this.http.post<any>(direccion, contenido, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token).set('idaplicacion', '1').set('jwtsecret', 'Pru3ba5Arch1v05').set('activo', 'true') } )
    return this.http.post<any>(direccion, contenido)
  }

  verArchivos(token:any, datos:any):Observable<any>{
    sessionStorage.setItem("archivo", "true");
    sessionStorage.setItem("tokena", token);
    let direccion = this.UrlSiplanArchivo+'getFile';
    return this.http.post<any>(direccion, datos, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) } )
  }
}
