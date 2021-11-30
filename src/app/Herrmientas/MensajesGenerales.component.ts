import { Injectable } from '@angular/core';

@Injectable()

export class MensajesGenerales {
    ConsultaExitosa: string = 'Consulta Exitosa.';
    ExitoProceso: string = 'Ingresado correctamente';
    ErrorProceso: string = 'Error al ingresar';
    CamposVacios: string = 'Debe ingresar todos los campos';
}
