import { Injectable } from '@angular/core';

@Injectable()

export class MensajesGenerales {
    IngresadoCorrectamente: string = 'Ingresado correctamente.';
    ModificadoCorrectamente: string = 'modificado correctamente.';
    EliminadoCorrectamente:string = 'eliminado correctamente';
    ExitoProceso: string = 'Proceso ejecutador correctamente';
    ErrorProceso: string = 'Error en al tratar de ejecutar la acción';
    CamposVacios: string = 'Verifique que los campos esten ingresados correctamente y no esten vacios.';
    CedulaErronea: string = 'Cédula mal ingresada o no existe.';
    CabeceraExitoso: string = 'Consulta Exitosa';
    CabeceraError: string = 'Error de Consulta';
    ErrorProcesoDu: string = 'Error al ingresar, verifique que los datos no esten duplicados.';
    ErrorNoExisteDatos: string = 'No existe el dato que desea eliminar';
    ErrorEliminarArchivos: string = 'No se puede eliminar, debe tener al menos un archivo ingresado.';
    NoAutorizado: string='Usted no posee los permisos para realizar esta acción';
    NoSeleccionado:string='Debe seleccionar al menos 1';
    SeleccionarTodo:string = 'Se debe llenar todos los campos.';
    ArchivoVacio:string='Se debe seleccionar el archivo.';
    ExtensionErronea:string='Solo se puede subir archivo de tipo ';
    ErrorFechas: string='La fecha final debe ser mayor a la inicial.';
    SeleccionarPlan: string ='Debe seleccionar el plan estratégico';
    Loestanusando:string='No se puede eliminar porque lo estan usando.';
}
