import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebPros } from '../../ConfigService/configServiciosWeb';
import { listaI } from '../../Interface/seguridad';

@Injectable({
  providedIn: 'root'
})
export class SwProspectivaService {

  UrlSiplanPros : String;
  constructor(private http: HttpClient, server: configServiciosWebPros) {
    this.UrlSiplanPros=server.urlSerSiplanProspectiva;
  }

  ListarProspectiva(codigo:any): Observable<listaI>{
    let direccion = this.UrlSiplanPros+'ListaProspectiva';
      return this.http.post<listaI>(direccion, codigo);
  }

  ListaProspectivaExiste():Observable<any>{
    let direccion=this.UrlSiplanPros+'ListaProspectivaExiste';
    return this.http.get<any>(direccion);
  }

  IngresarProspectiva(pros: any): Observable<any>{
    let direccion = this.UrlSiplanPros+'IngresarProspectiva';
    return this.http.post<any>(direccion, pros);
  }

  ModificarProspectiva(pros: any): Observable<any>{
    let direccion = this.UrlSiplanPros+'ModificarProspectiva';
    return this.http.post<any>(direccion, pros);
  }
}
