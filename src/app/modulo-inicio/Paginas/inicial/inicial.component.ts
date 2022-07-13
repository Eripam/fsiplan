import { Component, OnInit } from '@angular/core';
import { EjecutarScript } from 'src/app/Herramientas/Script/EjecutarScript.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss', 
  '../../../../assets/dtic/cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css',
'../../../../assets/dtic/cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css',
'../../../../assets/dtic/fnherstal/css/maind9aa.css',
'../../../../assets/dtic/modules/bbw/homeslider/css/masterslider/style/mastersliderd9aa.css']
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
