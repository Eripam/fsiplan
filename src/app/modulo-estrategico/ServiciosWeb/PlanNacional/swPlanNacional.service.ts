import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebEst } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwPlanNacionalService {

  UrlSiplanPlanN : String;
  constructor(private http: HttpClient, server: configServiciosWebEst) {
    this.UrlSiplanPlanN=server.urlSerSiplanPlanN;
  }

  ListarObjetivoP(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'ListarObjetivos';
    return this.http.post<any>(direccion, codigo);
  }

  IngresarObjetivoP(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'IngresarObjetivos';
    return this.http.post<any>(direccion, codigo);
  }

  ModificarObjetivoP(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'ModificarObjetivos';
    return this.http.post<any>(direccion, codigo);
  }

  EliminarObjetivoP(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'EliminarObjetivos';
    return this.http.post<any>(direccion, codigo);
  }

  ListarPoliticasP(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'ListarPoliticas';
    return this.http.post<any>(direccion, codigo);
  }

  IngresarPoliticasP(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'IngresarPoliticas';
    return this.http.post<any>(direccion, codigo);
  }

  ModificarPoliticasP(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'ModificarPoliticas';
    return this.http.post<any>(direccion, codigo);
  }

  EliminarPolitica(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'EliminarPolitica';
    return this.http.post<any>(direccion, codigo);
  }

  ListarMetasPN(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'ListarMetas';
    return this.http.post<any>(direccion, codigo);
  }

  IngresarMetasP(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'IngresarMetas';
    return this.http.post<any>(direccion, codigo);
  }

  ModificarMetasP(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'ModificarMetas';
    return this.http.post<any>(direccion, codigo);
  }

  EliminarMetasP(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'EliminarMetas';
    return this.http.post<any>(direccion, codigo);
  }

  ListarIndicadoresPN(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'ListarIndicadores';
    return this.http.post<any>(direccion, codigo);
  }

  IngresarIndicadorP(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'IngresarIndicador';
    return this.http.post<any>(direccion, codigo);
  }

  ModificarIndicadorP(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'ModificarIndicador';
    return this.http.post<any>(direccion, codigo);
  }

  EliminarIndicadorP(codigo:any):Observable<any>{
    sessionStorage.setItem("archivo", "false");
    let direccion=this.UrlSiplanPlanN+'EliminarIndicador';
    return this.http.post<any>(direccion, codigo);
  }
}
