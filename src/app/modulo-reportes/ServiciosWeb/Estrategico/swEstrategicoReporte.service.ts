import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebRep } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwEstrategicoReporteService {
  UrlSiplanCronograma : String;
  constructor(private http: HttpClient, server: configServiciosWebRep) {
    this.UrlSiplanCronograma=server.urlSerSiplanCroPdf;
  }

  ReportePDF(codigo:any):Observable<any>{
    let direccion=this.UrlSiplanCronograma+'cronograma/';
    return this.http.post<any>(direccion, codigo);
  }
}