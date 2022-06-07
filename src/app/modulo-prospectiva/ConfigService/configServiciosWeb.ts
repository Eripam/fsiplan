import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class configServiciosWebPros {
  //LocalHost

  //urlServiciosSiplan:string ='http://localhost:4300/';
  //urlServiciosSiplan:string ='https://pruebas.espoch.edu.ec:8181/';
  urlSerSiplanProspectiva: string = environment.urlServiciosSiplan+'prospectiva/';
  urlSerSiplanCriterios: string = environment.urlServiciosSiplan+'criterios/';
  urlSerSiplanAuditoria: string = environment.urlServiciosSiplan+'auditoriaPros/';
  urlSerSiplanCriterioDes: string = environment.urlServiciosSiplan+'criterioDes/';
  urlSerSiplanRespuesta: string = environment.urlServiciosSiplan+'respuesta/';
  urlSerSiplanArbol:string = environment.urlServiciosSiplan+'arbol/';
  urlSerSiplanCorreo: string = environment.urlServiciosSiplan+'correo/';
  urlSerSiplanEje: string = environment.urlServiciosSiplan+'eje/';
}