import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { ModuloTemplatesRoutingModule } from './modulo-templates-routing.module';
import { SpinnerInterceptor } from '../Herramientas/Spinner/spinner.interceptor';
import { SpinnerModule } from '../Herramientas/Spinner/spinner.module';
import { HeaderComponent } from './header/header.component';
import { FullComponent } from './full/full.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  declarations: [
    HeaderComponent,
    FullComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [CommonModule, ModuloTemplatesRoutingModule, SpinnerModule, PanelModule, MenuModule,
    PanelMenuModule, FormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  exports:[HeaderComponent,
    FullComponent,
    FooterComponent,
    MenuComponent]
})
export class ModuloTemplatesModule {}
