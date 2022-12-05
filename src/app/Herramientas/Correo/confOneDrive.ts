import { Injectable } from '@angular/core';

@Injectable()

export class DatosCorreo {
    sistema: string = 'SIPLAN';
    planificacionEstrategica:string='Planificación Estratégica';
    clavesecreta: string ='Pru3ba5Arch1v05';

    toDataURL(url:any, callback:any) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
            callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
      }
}
