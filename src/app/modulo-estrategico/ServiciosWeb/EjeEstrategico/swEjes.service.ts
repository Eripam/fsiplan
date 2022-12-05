import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebEst } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwEjesService {
  UrlSiplanEje : String;
  constructor(private http: HttpClient, server: configServiciosWebEst) {
    this.UrlSiplanEje=server.urlSerSiplanEje;
  }

  ListaEje(tipo:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanEje+'ListarEjes';
    return this.http.post<any>(direccion, tipo);
  }

  IngresarEje(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanEje+'IngresarEje';
    return this.http.post<any>(direccion, datos);
  }

  ModificarEje(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanEje+'ModificarEje';
    return this.http.post<any>(direccion, datos);
  }
  
  EliminarEje(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanEje+'EliminarEje';
    return this.http.post<any>(direccion, datos);
  }
}
