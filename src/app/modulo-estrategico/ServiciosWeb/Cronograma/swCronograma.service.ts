import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebEst } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwCronogramaService {

  UrlSiplanCronograma : String;
  constructor(private http: HttpClient, server: configServiciosWebEst) {
    this.UrlSiplanCronograma=server.urlSerSiplanCronograma;
  }

  ListarCronograma(codigo:any):Observable<any>{
    let direccion=this.UrlSiplanCronograma+'ListarCronograma';
    return this.http.post<any>(direccion, codigo);
  }

  ListaEstructuraCronograma(codigo:any):Observable<any>{
    let direccion = this.UrlSiplanCronograma+'ListarEstructuraCronograma';
    return this.http.post<any>(direccion, codigo);
  }

  IngresarCronograma(datos:any): Observable<any>{
    let direccion = this.UrlSiplanCronograma+'IngresarCronograma';
    return this.http.post<any>(direccion, datos);
  }
}
