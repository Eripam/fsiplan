import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routingPermisos } from './ModuloRouting/app.routingPermisos';
import * as jQuery from 'jquery';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './templates/Administrador/header/header.component';

//Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatDividerModule} from '@angular/material/divider';
import { MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
 

import {EjecutarScript} from './Herrmientas/EjecutarScript.service';
import { CompletoComponent } from './templates/Administrador/full/full.component';
import { FooterComponent } from './templates/Administrador/footer/footer.component';
import { PgInicialComponent } from './templates/pg-inicial/pg-inicial.component';
import { MenuComponent } from './templates/Administrador/menu/menu.component';
import { UsuariosComponent } from './ModuloSeguridad/usuarios/usuarios.component';
import { PruebaComponent } from './Modales/prueba/prueba.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CompletoComponent,
    FooterComponent,
    PgInicialComponent,
    MenuComponent,
    UsuariosComponent,
    PruebaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    routingPermisos,
    NgbModule
  ],
  providers: [EjecutarScript],
  bootstrap: [AppComponent]
})
export class AppModule { }
