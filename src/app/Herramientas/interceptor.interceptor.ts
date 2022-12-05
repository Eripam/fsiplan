import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;

    const archivo = sessionStorage.getItem("archivo");
    if(archivo=="true"){
      const token = sessionStorage.getItem("tokena");
      if (token) {
        request = req.clone({
          headers:req.headers.set('Authorization', `Bearer ${ token }`)
          .set('idaplicacion', '1').set('jwtsecret', 'Pru3ba5Arch1v05').set('activo', 'true')
        });
      }
    }else{
      const token = sessionStorage.getItem("key");
      if (token) {
        request = req.clone({
          headers:req.headers.set('Authorization', `Bearer ${ token }`)
          /*setHeaders: {
            Authorization: `Bearer ${ token }`
          }*/
        });
      }
  
    }
    return next.handle(request);
  }

}
