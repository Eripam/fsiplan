import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SesionUsuario } from 'src/app/casClient/SesionUsuario';
import { SwLoginService } from 'src/app/modulo-seguridad/ServiciosWeb/Login/swLogin.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserGuard implements CanActivate {

  constructor(private router: Router, private session: SesionUsuario, private swLogin: SwLoginService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validacion(route);
  }
  
  async validacion(route:any){
    const token = sessionStorage.getItem('key');
    if(!token){
      await this.router.navigate(['/']);
      location.reload();
      return false;
    }else{
      const datosS=await this.session.obtenerDatosLogin();
      const opcion = route.data.opcion;
      const datoL={
        rpe_persona:datosS.rpe_persona,
        rpe_rol:datosS.rpe_rol,
        rop_opcion:opcion,
        rpe_dependencia: datosS.rpe_dependencia
      }
      const datos = await new Promise<any>((resolve)=>this.swLogin.VerificarOpciones(datoL).subscribe(translated=>{resolve(translated)}));
      if(!datos.success){
        await this.router.navigate(['/error']);
      }
      return datos.success;
    }
  }
}
