import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class configServiciosWebEst {
  //LocalHost

  //urlServiciosSiplan:string ='http://localhost:4300/';
  //urlServiciosSiplan:string ='https://pruebas.espoch.edu.ec:8181/';
  urlSerSiplanPlanE: string = environment.urlServiciosSiplan+'plan/';
  urlSerSiplanEstructura: string = environment.urlServiciosSiplan+'estructura/';
  urlSerSiplanEstrPlan: string = environment.urlServiciosSiplan+'estructurap/';
  urlSerSiplanEje: string = environment.urlServiciosSiplan+'ejeE/';
  urlSerSiplanCronograma: string = environment.urlServiciosSiplan+'cronograma/';
  urlSerSiplanPlanN: string = environment.urlServiciosSiplan+'planN/';
  urlSerSiplanToken: string = environment.urlServiciosArchivos+'wsrepositorio/rutaRepositorio/';
  urlSerSiplanArchivo: string = environment.urlServiciosSiplan+'archivo/';
  urlSerSiplanEval:string=environment.urlServiciosSiplan+'evaluacion/';
  urlSerSiplanFechas:string=this.urlSerSiplanEval+'fechas/'
  urlSerSiplanResponsables:string = environment.urlServiciosSiplan+'responsable/';
  urlSerSiplan:string = environment.urlServiciosSiplan+'planes/'
}