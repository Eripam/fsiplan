import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWeb } from '../../ConfigService/configServiciosWeb';
import { listaI } from '../../Interface/seguridad';

@Injectable({
  providedIn: 'root'
})
export class SwProspectivaService {

  UrlSiplanPros : String;
  constructor(private http: HttpClient, server: configServiciosWeb) {
    this.UrlSiplanPros=server.urlSerSiplanProspectiva;
  }

  ListarProspectiva(): Observable<listaI>{
    let direccion = this.UrlSiplanPros+'ListaProspectiva';
      return this.http.get<listaI>(direccion);
  }
}
