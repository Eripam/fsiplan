import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class configServiciosWeb {
  //LocalHost

  //urlServiciosSiplan:string ='http://localhost:4300/';
  //urlServiciosSiplan:string ='https://pruebas.espoch.edu.ec:8181/';
  urlServiciosSiplanC: string = environment.urlServiciosSiplanC;
  urlServiciosSiplanUs: string = environment.urlServiciosSiplan+'usuario/';
  urlServiciosSiplanRol: string = environment.urlServiciosSiplan+'rol/';
  urlServiciosSiplanDep: string = environment.urlServiciosSiplan+'dependencia/';
  urlServiciosSiplanRolP: string = environment.urlServiciosSiplan+'rolpersona/';
  urlServiciosSiplanPadreO: string = environment.urlServiciosSiplan+'padreop/';
  urlServiciosSiplanOpcion: string = environment.urlServiciosSiplan+'opciones/';
  urlServiciosSiplanRolO: string = environment.urlServiciosSiplan+'rolopcion/';
  urlServiciosSiplanRegla: string= environment.urlServiciosSiplan+'reglamento/';
  urlServiciosSiplanRegOp: string= environment.urlServiciosSiplan+'regopc/';
  urlServiciosSiplanLog: string = environment.urlServiciosSiplan+'login/';
  urlServiciosSiplanAud: string = environment.urlServiciosSiplan+'auditoria/';

}
