import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {  HTTP_INTERCEPTORS} from '@angular/common/http';
import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Import configuración servicios
import { configServiciosWeb } from './modulo-seguridad/ConfigService/configServiciosWeb';

//Import mensajes
import { MensajesGenerales } from './Herramientas/Mensajes/MensajesGenerales.component';

//Import correo
import { configCorreo} from './Herramientas/Correo/configCorreo';

//Import spinner
import { SpinnerInterceptor } from './Herramientas/Spinner/spinner.interceptor';
import { SpinnerModule } from './Herramientas/Spinner/spinner.module';
import { ModuloSeguridadModule } from './modulo-seguridad/modulo-seguridad.module';
import { ModuloTemplatesModule } from './modulo-templates/modulo-templates.module';
import { ModuloProspectivaModule} from './modulo-prospectiva/modulo-prospectiva.module';
import { TablasComponent } from './Herramientas/Tablas/tablas.component';
import { EjecutarScript } from './Herramientas/Script/EjecutarScript.service';

import { LoginComponent } from './ModuloCas/login/login.component';
import { LogoutComponent } from './ModuloCas/logout/logout.component';
import { CasClient } from '../app/casClient/CasClient';
import {HttpService} from "../app/casClient/http.service"
import { SesionUsuario} from './casClient/SesionUsuario';
import { ErrorAccesoComponent } from './Herramientas/PaginasError/error-acceso/error-acceso.component';
import { AuthInterceptorService } from './Herramientas/interceptor.interceptor';
import { ModuloEstrategicoModule } from './modulo-estrategico/modulo-estrategico.module';

@NgModule({
  declarations: [
    AppComponent,
    TablasComponent,
    LoginComponent,
    LogoutComponent,
    ErrorAccesoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SpinnerModule,
    ModuloTemplatesModule,
    ModuloSeguridadModule,
    ModuloProspectivaModule,
    ModuloEstrategicoModule
  ],
  providers: [configServiciosWeb, MensajesGenerales, {provide: HTTP_INTERCEPTORS, useClass:SpinnerInterceptor, multi: true}, EjecutarScript, CasClient, HttpService, SesionUsuario, {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}, configCorreo],
  bootstrap: [AppComponent]
})
export class AppModule { }
