import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebPros } from '../../ConfigService/configServiciosWeb';
import { eje_estrategico, listaI, tipo_eje } from '../../Interface/seguridad';

@Injectable({
  providedIn: 'root'
})
export class SwEjesService {

  UrlSiplanEje : String;
  constructor(private http: HttpClient, server: configServiciosWebPros) {
    this.UrlSiplanEje=server.urlSerSiplanEje;
  }

  ListarTipoEje(codigo:any): Observable<listaI>{
    let direccion = this.UrlSiplanEje+'ListarTipoEjes';
      return this.http.post<listaI>(direccion, codigo);
  }

  ListarEjes(codigo:any): Observable<listaI>{
    let direccion = this.UrlSiplanEje+'ListarEjes';
      return this.http.post<listaI>(direccion, codigo);
  }

  IngresarTipoEjes(eje: tipo_eje): Observable<any>{
    let direccion = this.UrlSiplanEje+'IngresarTipoEjes';
    return this.http.post<any>(direccion, eje);
  }

  IngresarEjes(eje: eje_estrategico): Observable<eje_estrategico>{
    let direccion = this.UrlSiplanEje+'IngresarEjes';
    return this.http.post<eje_estrategico>(direccion, eje);
  }

  ModificarEjes(eje: eje_estrategico): Observable<any>{
    let direccion = this.UrlSiplanEje+'ModificarEjes';
    return this.http.post<any>(direccion, eje);
  }

  ModificarTipoEjes(eje: tipo_eje): Observable<any>{
    let direccion = this.UrlSiplanEje+'ModificarTipoEjes';
    return this.http.post<any>(direccion, eje);
  }

  EliminarEjes(eje: any): Observable<any>{
    let direccion = this.UrlSiplanEje+'EliminarEjes';
    return this.http.post<any>(direccion, eje);
  }

  EliminarTipoEjes(eje: any): Observable<any>{
    let direccion = this.UrlSiplanEje+'EliminarTipoEjes';
    return this.http.post<any>(direccion, eje);
  }
}
