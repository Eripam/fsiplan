import { Injectable } from '@angular/core';

@Injectable()

export class configCorreo {
    cuerpoCorreo(opcion:any){
        var respuesta;
        if(opcion==1){
             respuesta="<!doctype html> <html lang='en' class='no-js'> <head> <meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'> <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'> </head> <body> <table style='border: 1px solid rgb(223, 217, 195); width: 100%;' cellspacing='0'> <tbody> <tr style='background: rgb(245, 243, 229) none repeat scroll 0% 0%; padding: 10px;'> <td style='padding: 10px'> <div style='border-right: 2px solid #459e00; float: left; height: 130px; width: 125px;'> <img src='cid:image' width='120' height='120'> </div> </td> <td style='width: 85%;'> <div style='color: rgb(69, 158, 0); float: left; font-size: 30px; padding-top: 5px;'> Sistema Integral de Planificaci&oacute;n Institucional - ESPOCH </div> </td> </tr> <tr> <td style='padding: 20px; font-size: 12px;' colspan='2'> Estimad@ ";
        }else if(opcion==2){
            respuesta=', La Direcci&oacute;n de Planificaci&oacute;n le informa que ';
        }else if(opcion==3){
            respuesta='ha sido registrado en el SIPLANI con los siguientes datos:';
        }else if(opcion==4){
            respuesta='Para verifiar la informaci&oacute;n debe ingresar a <a href="https://planificacion.espoch.edu.ec" target="_blank">Sistema Integral de Planificación Institucional - ESPOCH</a> con su correo institucional si posee uno, caso contrario debe ingresar con su n&uacute;mero de c&eacute;dula como usuario y contrase&ntilde;a. <br>Ante cualquier cambio; por favor ponerse en contacto con el administrador.';
        }else{
            respuesta="<center> <br/><br/><br/><br/> <b>DIRECCI&Oacute;N DE PLANIFICACI&Oacute;N - ESPOCH</b> <br/> <b>Panamericana Sur Km. 1 1/2</b> <br/> <b>TELF: 593(03) 2998-200 ext. 1119</b> <br/><br/> </center> </td> </tr> <tr> <td style='background: #f5f3e5;' colspan='2'> <div style='font-weight: bold; text-align: center; font-size: 10px;'> <a href='http://dtic.espoch.edu.ec/' target='_blank'>DIRECCI&Oacute;N DE TECNOLOG&Iacute;AS DE INFORMACI&Oacute;N Y COMUNICACI&Oacute;N</a> <br>&copy; ESPOCH 2020 </br> <img src='cid:logo' width='65' alt='DIRECCI&Oacute;N DE TECNOLOG&Iacute;AS DE INFORMACI&Oacute;N Y  COMUNICACI&Oacute;N' /> </div> </td> </tr> </tbody> </table> </body> </html><script src='https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1'></script><df-messenger intent='WELCOME' chat-title='SBS-Bot' agent-id='9dc04711-849e-4905-aa69-0594c1da0a67' language-code='es'></df-messenger>";
        }
        return respuesta;
    }
}