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
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanCronograma+'ListarCronograma';
    return this.http.post<any>(direccion, codigo);
  }

  ListaEstructuraCronograma(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanCronograma+'ListarEstructuraCronograma';
    return this.http.post<any>(direccion, codigo);
  }

  IngresarCronograma(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanCronograma+'IngresarCronograma';
    return this.http.post<any>(direccion, datos);
  }

  ModificarCronograma(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanCronograma+'ModificarCronograma';
    return this.http.post<any>(direccion, datos);
  }

  ListarPeriodo(tipo:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanCronograma+'ListarPeriodo';
    return this.http.post<any>(direccion, tipo);
  }

  ListarPeriodoPlan(codigo:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanCronograma+'ListarPeriodoPlan';
    return this.http.post<any>(direccion, codigo);
  }

  IngresarPeriodo(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanCronograma+'IngresarPeriodo';
    return this.http.post<any>(direccion, datos);
  }

  ModificarPeriodo(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanCronograma+'ModificarPeriodo';
    return this.http.post<any>(direccion, datos);
  }
  
  EliminarPeriodo(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanCronograma+'EliminarPeriodo';
    return this.http.post<any>(direccion, datos);
  }

  IngresarPeriodoPlan(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanCronograma+'IngresarPeriodoPlan';
    return this.http.post<any>(direccion, datos);
  }

  ModificarPeriodoPlan(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanCronograma+'ModificarPeriodoPlan';
    return this.http.post<any>(direccion, datos);
  }

  EliminarPeriodoPlan(datos:any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanCronograma+'EliminarPeriodoPlan';
    return this.http.post<any>(direccion, datos);
  }
}
