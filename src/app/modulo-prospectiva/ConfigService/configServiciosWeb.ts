import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class configServiciosWeb {
  //LocalHost

  //urlServiciosSiplan:string ='http://localhost:4300/';
  //urlServiciosSiplan:string ='https://pruebas.espoch.edu.ec:8181/';
  urlSerSiplanProspectiva: string = environment.urlServiciosSiplan+'prospectiva/';
}