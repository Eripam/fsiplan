import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWeb } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwAuditoriaService {
  UrlSiplanAud : String;
  constructor(private http: HttpClient, server: configServiciosWeb) {
    this.UrlSiplanAud=server.urlServiciosSiplanAud;
  }

  IngresarAuditoria(aud: any): Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanAud+'IngresarAuditoria';
    return this.http.post<any>(direccion, aud);
  }
}
