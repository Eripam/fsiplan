import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWeb } from '../../ConfigService/configServiciosWeb';
import { listaI } from '../../Interface/seguridad';

@Injectable({
  providedIn: 'root'
})
export class SwLoginService {

  UrlSiplanL : String;
  constructor(private http: HttpClient, server: configServiciosWeb) {
    this.UrlSiplanL=server.urlServiciosSiplanLog;
  }

  Login(perid: any): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanL+'Login';
      return this.http.post<listaI>(direccion, perid);
  }

  LoginCorreo(perid: any): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanL+'LoginCorreo';
      return this.http.post<listaI>(direccion, perid);
  }

  LoginRolDep(datos: any): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanL+'LoginRolDep';
      return this.http.post<listaI>(direccion, datos);
  }

  DecodingLogin(token: any): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanL+'DLogin';
      return this.http.post<listaI>(direccion, token);
  }

  ListaPerfiles(perid: any): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanL+'ListarPerfil';
      return this.http.post<listaI>(direccion, perid);
  }

  VerificarOpciones(datos: any): Observable<listaI>{
    sessionStorage.setItem("archivo", "false");
    let direccion = this.UrlSiplanL+'VerificarOpcion';
      return this.http.post<listaI>(direccion, datos);
  }
}
