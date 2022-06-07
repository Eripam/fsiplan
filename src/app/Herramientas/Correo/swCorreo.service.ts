import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configServiciosWebPros } from 'src/app/modulo-prospectiva/ConfigService/configServiciosWeb';

@Injectable({
  providedIn: 'root'
})
export class SwCorreoService {
  UrlSiplanCorreo : String;
  constructor(private http: HttpClient, server: configServiciosWebPros) {
    this.UrlSiplanCorreo=server.urlSerSiplanCorreo;
  }

  /*envioMail(datos:any): Observable<any> {
    var content = JSON.stringify({
        strAsunto: datos.asunto,
        lstReceptores: [
            {
                email: datos.recibe
            }
        ],
        lstArchivosAdjuntos: [],
        strCodigoSistema: "SIPLANI",
        strBody: datos.contenido
    });
    //console.log("contenido JSON: " + content);
    console.log(content);
    let direccion = this.UrlSiplanCorreo+'/envioCorreo';
    return this.http.post<any>(direccion, content);
}*/

envioMail(datos:any) {
  var content = {
      strAsunto: datos.asunto,
      lstReceptores: [
          {
              email: datos.recibe
          }
      ],
      lstArchivosAdjuntos: [],
      strCodigoSistema: "SIPLANI",
      strBody: datos.contenido
  };
  let direccion = this.UrlSiplanCorreo+'/envioCorreo';
  return this.http.post(direccion, content);
}

IngresarEnviarE(email: any): Observable<any>{
  let direccion = this.UrlSiplanCorreo+'IngresarEnviarE';
  return this.http.post<any>(direccion, email);
}
}
