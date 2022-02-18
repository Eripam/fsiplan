import { Component, OnInit, ViewChild } from '@angular/core';
import { EjecutarScript } from 'src/app/Herramientas/Script/EjecutarScript.service';
import { SwLoginService } from 'src/app/modulo-seguridad/ServiciosWeb/Login/swLogin.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent implements OnInit {
  showMenu!: boolean;
  rol:any='';
  lstValues: any[]=[];

  constructor(private js: EjecutarScript, private servLogin: SwLoginService) {}

  ngOnInit(): void {
    this.perfilogueado();
  }

  onChangeMenuHeader(variable: boolean) {
    this.showMenu = variable;
    console.log('menu padre', this.showMenu);
  }

  onShowMenu(variable: boolean) {
    this.showMenu = variable;
  }

  async perfilogueado(){
    const array={
      token:sessionStorage.getItem('key'),
      key:"S!pl@n1"
    }
    const datos = await new Promise<any>((resolve)=>this.servLogin.DecodingLogin(array).subscribe(translated=>{resolve(translated)}));
    this.lstValues=datos.data.value;
    this.rol=datos.data.value[0].rpe_rol;
    this.color(this.rol);
  }

  color(rol:any){
    this.js.ColorUsuario(rol);
  }
}
