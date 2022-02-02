import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWeb } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwReglamentoOpService {
  UrlSiplanRegO : String;
  constructor(private http: HttpClient, server: configServiciosWeb) {
    this.UrlSiplanRegO=server.urlServiciosSiplanRegOp;
  }

  IngresaReglamentoO(reglamentoO:any): Observable<any>{
    let direccion = this.UrlSiplanRegO+'IngresarRegOpcion';
    return this.http.post<any>(direccion, reglamentoO);
  }
  ListarReglamentoO():Observable<any>{
    let direccion=this.UrlSiplanRegO+'ListaRegOp';
    return this.http.get<any>(direccion);
  }
  ModificarReglamentoO(reglamentoO:any):Observable<any>{
    let direcccion=this.UrlSiplanRegO+'ModificarRegOpcion';
    return this.http.post<any>(direcccion, reglamentoO);
  }
}
