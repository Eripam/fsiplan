import { Injectable } from '@angular/core';

@Injectable()
export class EjecutarScript {


  RecargarPestaña() {
    //this.loadScript("../assets/js/bloquear.js");
  }

  //Js de la Pagina Princiapl FanPage
  cargarFanPageDitc() {
    this.loadScript("/assets/plantilla-pg-inicial/core/assets/vendor/domready/ready.min7016.js?v=1.0.8");
    this.loadScript("/assets/plantilla-pg-inicial/core/assets/vendor/jquery/jquery.minf77b.js?v=3.2.1");
    this.loadScript("/assets/plantilla-pg-inicial/modules/bbw/homeslider/js/jquery-1.12.1.min4f96.js?v=1.12.1");
    this.loadScript("/assets/plantilla-pg-inicial/core/misc/drupalSettingsLoader92f9.js?v=8.6.13");
    this.loadScript("/assets/plantilla-pg-inicial/sites/default/files/languages/en_P2T9yVvPVSyv4Gs2mmhVE9l4vOe2SLozeAF6FvX0EIEd9aa.js");
    this.loadScript("/assets/plantilla-pg-inicial/core/misc/drupal92f9.js");
    this.loadScript("/assets/plantilla-pg-inicial/core/misc/drupal92f9.js?v=8.6.13");

    this.loadScript("/assets/plantilla-pg-inicial/core/misc/drupal.init92f9.js?v=8.6.13");
    this.loadScript("/assets/plantilla-pg-inicial/modules/contrib/google_analytics/js/google_analytics92f9.js?v=8.6.13");
    this.loadScript("/assets/plantilla-pg-inicial/maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js");

    this.loadScript("/assets/plantilla-pg-inicial/fnherstal/js/vendor/jarallax.min92f9.js?v=8.6.13");
    this.loadScript("/assets/plantilla-pg-inicial/fnherstal/js/main92f9.js?v=8.6.13");
    this.loadScript("/assets/plantilla-pg-inicial/fnherstal/js/init92f9.js?v=8.6.13");
    this.loadScript("/assets/plantilla-pg-inicial/fnherstal/js/function92f9.js?v=8.6.13");
    this.loadScript("/assets/plantilla-pg-inicial/modules/bbw/homeslider/js/masterslider/masterslider.min92f9.js?v=8.6.13");
    this.loadScript("/assets/plantilla-pg-inicial/modules/bbw/homeslider/js/home92f9.js?v=8.6.13");
    this.loadScript("/assets/plantilla-pg-inicial/modules/simple_megamenu/js/simple_megamenud9aa.js?pox64u");
    this.loadScript("/assets/plantilla-pg-inicial/fnherstal/js/dtic.js");
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
    if (rol == 1) {//Super Administrador
      $('head').append('<link rel="stylesheet"  href="assets/admin-king/theme/assets/css/skins/fulldark.css" type="text/css"/>');
    }
    if (rol == 2) {//Super Administrador
      $('head').append('<link rel="stylesheet"  href="assets/admin-king/theme/assets/css/skins/fulldark.css" type="text/css"/>');
    }
    if (rol == 1035) {//Administrador
      $('head').append('<link rel="stylesheet"  href="assets/admin-king/theme/assets/css/skins/cliente.css" type="text/css"/>');
      //return "/planificacion";
    }
    if (rol == 1037) {//AdminProceso
      $('head').append('<link rel="stylesheet"  href="assets/admin-king/theme/assets/css/skins/analista1.css" type="text/css"/>');
    }
    if (rol == 1038) {//Analista1
      $('head').append('<link rel="stylesheet"  href="assets/admin-king/theme/assets/css/skins/cliente.css" type="text/css"/>');
    }
    if (rol == 0) {//Color por Defecto
      $('head').append('<link rel="stylesheet"  href="assets/admin-king/theme/assets/css/skins/cliente.css" type="text/css"/>');
    }
    if (rol == 1042) {//Analista2
      $('head').append('<link rel="stylesheet"  href="assets/admin-king/theme/assets/css/skins/analista3.css" type="text/css"/>');
    }
  
    if (rol == 1073) {//Analista3
      $('head').append('<link rel="stylesheet"  href="assets/admin-king/theme/assets/css/skins/cliente.css" type="text/css"/>');
    }
    if (rol == 3) {//Analista1
      $('head').append('<link rel="stylesheet"  href="assets/admin-king/theme/assets/css/skins/fulldark.css" type="text/css"/>');
    }
    if (rol == 4) {//Analista1
      $('head').append('<link rel="stylesheet"  href="assets/admin-king/theme/assets/css/skins/fulldark.css" type="text/css"/>');
    }
    if (rol == 5) {//Profesor
      $('head').append('<link rel="stylesheet"  href="assets/admin-king/theme/assets/css/skins/profesor.css" type="text/css"/>');
    }
  }

}
