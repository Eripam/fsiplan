import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Import configuración servicios
import { configServiciosWeb } from './modulo-seguridad/ConfigService/configServiciosWeb';

//Import mensajes
import { MensajesGenerales } from './Herramientas/Mensajes/MensajesGenerales.component';

//Import spinner
import { SpinnerInterceptor } from './Herramientas/Spinner/spinner.interceptor';
import { SpinnerModule } from './Herramientas/Spinner/spinner.module';
import { ModuloSeguridadModule } from './modulo-seguridad/modulo-seguridad.module';
import { ModuloTemplatesModule } from './modulo-templates/modulo-templates.module';
import { TablasComponent } from './Herramientas/Tablas/tablas.component';

@NgModule({
  declarations: [
    AppComponent,
    TablasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SpinnerModule,
    ModuloTemplatesModule,
    ModuloSeguridadModule
  ],
  providers: [configServiciosWeb, MensajesGenerales, {provide: HTTP_INTERCEPTORS, useClass:SpinnerInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
