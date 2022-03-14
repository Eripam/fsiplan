import { Injectable } from '@angular/core';

@Injectable()
export class EjecutarScript {


  RecargarPestaña() {
    //this.loadScript("../assets/js/bloquear.js");
  }

  //Js de la Pagina Princiapl FanPage
  cargarFanPageDitc() {
    this.loadScript("/assets/dtic/core/assets/vendor/domready/ready.min7016.js?v=1.0.8");
    this.loadScript("/assets/dtic/core/assets/vendor/jquery/jquery.minf77b.js?v=3.2.1");
    this.loadScript("/assets/dtic/modules/bbw/homeslider/js/jquery-1.12.1.min4f96.js?v=1.12.1");
    this.loadScript("/assets/dtic/core/misc/drupalSettingsLoader92f9.js?v=8.6.13");
    this.loadScript("/assets/dtic/core/misc/drupal92f9.js");
    this.loadScript("/assets/dtic/core/misc/drupal92f9.js?v=8.6.13");

    this.loadScript("/assets/dtic/core/misc/drupal.init92f9.js?v=8.6.13");
    //this.loadScript("/assets/dtic/modules/contrib/google_analytics/js/google_analytics92f9.js?v=8.6.13");
    this.loadScript("/assets/dtic/maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js");

    this.loadScript("/assets/dtic/fnherstal/js/vendor/jarallax.min92f9.js?v=8.6.13");
    this.loadScript("/assets/dtic/fnherstal/js/main92f9.js?v=8.6.13");
    this.loadScript("/assets/dtic/fnherstal/js/init92f9.js?v=8.6.13");
    this.loadScript("/assets/dtic/fnherstal/js/function92f9.js?v=8.6.13");
    this.loadScript("/assets/dtic/modules/bbw/homeslider/js/masterslider/masterslider.min92f9.js?v=8.6.13");
    this.loadScript("/assets/dtic/modules/bbw/homeslider/js/home92f9.js?v=8.6.13");
    this.loadScript("/assets/dtic/modules/simple_megamenu/js/simple_megamenud9aa.js?pox64u");
    this.loadScript("/assets/dtic/fnherstal/js/dtic.js");
  }
   
    
  


   //Js deL lOADER
   cargarJsLoader() {
    this.loadScript("/assets/loader/js/jquery.loadingModal.js");
   
  }


//Cargar Script
  public loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
    })
  }

 //Recargar Color del Rol Logeado
  ColorUsuario(rol:any) {
    if (rol == 1 || rol==5) {//Administrador o super admin
      $('head').append('<link rel="stylesheet"  href="assets/css/administrador/administrador.css" type="text/css"/>');
    }else if (rol == 2) {//Docente
      $('head').append('<link rel="stylesheet"  href="assets/css/administrador/decano.css" type="text/css"/>');
    }else if (rol == 3) {//Administrador
      $('head').append('<link rel="stylesheet"  href="assets/css/administrador/director.css" type="text/css"/>');
      //return "/planificacion";
    }else if (rol == 4) {//AdminProceso
      $('head').append('<link rel="stylesheet"  href="assets/css/administrador/analista.css" type="text/css"/>');
    }else if (rol == 6) {//Analista1
      $('head').append('<link rel="stylesheet"  href="assets/css/administrador/docente.css" type="text/css"/>');
    }else {//color por defecto
      $('head').append('<link rel="stylesheet"  href="assets/css/administrador/estudiantes.css" type="text/css"/>');
    }
  }

}
