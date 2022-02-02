import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWeb } from '../../ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class swReglamentoService {
  UrlSiplanReg : String;
  constructor(private http: HttpClient, server: configServiciosWeb) {
    this.UrlSiplanReg=server.urlServiciosSiplanRegla;
  }

  IngresaArchivo(archivo:any): Observable<any>{
    let direccion = this.UrlSiplanReg+'archivo';
    return this.http.post<any>(direccion, archivo);
  }
  ObtenerCodigo():Observable<any>{
    let direccion = this.UrlSiplanReg+'ListaCodigo';
    return this.http.get<any>(direccion);
  }
  EliminarArchivo(archivo:any):Observable<any>{
    let direccion= this.UrlSiplanReg+'eliminararchivo';
    return this.http.post<any>(direccion, archivo);
  }
  IngresarReglamento(reglamento:any):Observable<any>{
    let direccion=this.UrlSiplanReg+'IngresarReglamento';
    return this.http.post<any>(direccion, reglamento);
  }
  ListarReglamento():Observable<any>{
    let direccion=this.UrlSiplanReg+'ListaReglamentos';
    return this.http.get<any>(direccion);
  }
  ListarReglamentoAc():Observable<any>{
    let direccion=this.UrlSiplanReg+'ListaReglamentosAc';
    return this.http.get<any>(direccion);
  }
  EliminarArchivoDB(archivos:any):Observable<any>{
    let direccion=this.UrlSiplanReg+'EliminarArchivoBD';
    return this.http.post<any>(direccion, archivos);
  }
  ModificarReglamentos(reglamento:any):Observable<any>{
    let direcccion=this.UrlSiplanReg+'ModificarReglamento';
    return this.http.post<any>(direcccion, reglamento);
  }
  EnviarCodigo(reglamento:any):Observable<any>{
    let direccion=this.UrlSiplanReg+'CodigoModificar';
    return this.http.post<any>(direccion, reglamento);
  }
  GuardarArchivo(reglamento:any):Observable<any>{
    let direccion=this.UrlSiplanReg+'archivoM';
    return this.http.post<any>(direccion, reglamento);
  }
}
