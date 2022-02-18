import { Component, OnInit } from '@angular/core';
import { EjecutarScript } from 'src/app/Herramientas/Script/EjecutarScript.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss', 
  '../../../../assets/dtic/core/modules/system/css/components/ajax-progress.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/align.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/autocomplete-loading.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/fieldgroup.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/container-inline.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/clearfix.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/details.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/hidden.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/item-list.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/js.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/nowrap.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/position-container.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/progress.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/reset-appearance.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/resize.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/sticky-header.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/system-status-counterd9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/system-status-report-countersd9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/system-status-report-general-infod9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/tabledrag.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/tablesort.moduled9aa.css',
  '../../../../assets/dtic/core/modules/system/css/components/tree-child.moduled9aa.css',
  '../../../../assets/dtic/modules/bbw/homeslider/css/masterslider/style/mastersliderd9aa.css',
  '../../../../assets/dtic/modules/bbw/homeslider/css/masterslider/skins/default/styled9aa.css',
  '../../../../assets/dtic/modules/simple_megamenu/css/styled9aa.css',
  '../../../../assets/dtic/cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css',
  '../../../../assets/dtic/maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css',
  '../../../../assets/dtic/cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css',
  '../../../../assets/dtic/fnherstal/css/maind9aa.css',
  '../../../../assets/dtic/fnherstal/css/libsd9aa.css']
})
export class InicialComponent implements OnInit {

  constructor(private js:EjecutarScript) { }

  ngOnInit() {
    this.js.cargarFanPageDitc();
  }
  OpenMenu(){
    window.onload = function() {
      var $container = $('.burger-menu,.container-menu');
      if ($container.hasClass('open-menu')) {
          $('.mobile-menu .block-hover ul').fadeOut();
          $container.removeClass('open-menu').addClass('close-menu');
          setTimeout(function(){
              $container.removeClass('close-menu');
              $('.mobile-menu .block-hover ul').fadeOut();
          }, 1300);
      } else {
          $container.removeClass('close-menu').addClass('open-menu');
          $(".circle-spinner-menu").toggleClass("effect-sonar");
      }
      $('.container-menu').toggleClass('bg-menu');
    }
  }

}
