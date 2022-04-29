import {Component, OnInit, Output, EventEmitter, Input, HostListener} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SwLoginService } from 'src/app/modulo-seguridad/ServiciosWeb/Login/swLogin.service';
import { SesionUsuario} from '../../casClient/SesionUsuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  @Output() onShowMenuHeader: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() lstValues:any[]=[];
 
  items!: MenuItem[];
  isShowMenuHeader: boolean = true;
  correo: string='';
  rol: string='';
  dependecia: string='';
  states:any[] = [];
  selectPerfiles:any;
  url: string='';

  /*mostrarMenu() {
    this.onShowMenuHeader.emit(!this.isShowMenuHeader);
  }*/

  //seleccionada = this.states[1].valor;

  constructor(private servLogin:SwLoginService, private session: SesionUsuario,  private router: Router) {}

  async ngOnInit() {
    const datosS=await this.session.obtenerDatosLogin();
    this.correo=datosS.per_email;
    this.selectPerfiles=datosS.rpe_codigo;
    this.url=datosS.opc_url;
    this.items = [
      {label: datosS.per_nombres+' '+datosS.per_apellidos, icon: 'pi pi-user'},
      {label: 'Cerrar Sesión', icon: 'pi pi-power-off', command: (event) => {this.session.CerrarSessionGeneral()}}
    ];
    this.obtenerPerfiles(datosS.rpe_persona);
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  async obtenerPerfiles(codigo:any){
    const perid={
      perid:codigo
    }
    const datos = await new Promise<any>((resolve)=>this.servLogin.ListaPerfiles(perid).subscribe(translated=>{resolve(translated)}));
    if(datos.success){
      this.states=datos.data;
    }
  }

  async CambiarPerfil(event:any){
    var dat:any;
    for(let perfiles of  this.states){
      if(perfiles.rpe_codigo==event){
        dat={
          perid:perfiles.rpe_persona,
          rol:perfiles.rpe_rol,
          dependencia:perfiles.rpe_dependencia
        }
      }
    }
    const datos = await new Promise<any>((resolve) => this.servLogin.LoginRolDep(dat).subscribe(translated => { resolve(translated) }));
    sessionStorage.removeItem("perid");
    sessionStorage.removeItem("key");
    if(datos.success){
        sessionStorage.setItem('key', datos.token);
        const datosS=await this.session.obtenerDatosLogin();
        this.correo=datosS.per_email;
        this.selectPerfiles=datosS.rpe_codigo;
        this.url=datosS.opc_url;
        await this.router.navigate([this.url+'/'+datosS.rop_padreop]);
    }else if(sessionStorage.getItem("loginUser")!=null){
        const envio={
            perid:sessionStorage.getItem("loginUser")
        }
        const datos = await new Promise<any>((resolve) => this.servLogin.LoginCorreo(envio).subscribe(translated => { resolve(translated) }));
        if(datos.success){
            sessionStorage.setItem('key', datos.token);
            const datosS=await this.session.obtenerDatosLogin();
            this.correo=datosS.per_email;
            this.selectPerfiles=datosS.rpe_codigo;
            this.url=datosS.opc_url;
            await this.router.navigate([this.url+'/'+datosS.rop_padreop]);
        }else{
            await this.router.navigate(['/error']);
        }
    }else{
        await this.router.navigate(['/error']);
    }
    location.reload();
  }
}
