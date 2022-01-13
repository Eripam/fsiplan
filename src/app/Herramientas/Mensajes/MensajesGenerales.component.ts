import { Injectable } from '@angular/core';

@Injectable()

export class MensajesGenerales {
    IngresadoCorrectamente: string = 'ingresado correctamente.';
    ModificadoCorrectamente: string = 'modificado correctamente.';
    ExitoProceso: string = 'Ingresado correctamente';
    ErrorProceso: string = 'Error al ingresar';
    CamposVacios: string = 'Verifique que los campos esten ingresados correctamente y que no esten vacios.';
    CedulaErronea: string = 'Cédula mal ingresada o no existe.';
    CabeceraExitoso: string = 'Consulta Exitosa';
    CabeceraError: string = 'Error de Consulta';
    ErrorProcesoDu: string = 'Error al ingresar, verifique que los datos que esta ingresando no esten registrados.';
}
