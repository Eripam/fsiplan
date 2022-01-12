import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { SpinnerService } from "./spinner.service";
import {finalize, catchError} from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor{
    constructor(private SpinnerService: SpinnerService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.SpinnerService.mostrar();
        return next.handle(req).pipe(
            finalize(()=> this.SpinnerService.ocultar()),
            catchError(err=>{
                console.error('error cought in service', err);
                this.SpinnerService.mostrarSS();
                return throwError(err);
              }));
    }
}