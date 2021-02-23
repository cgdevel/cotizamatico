import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes//header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { Pagina1Component } from './componentes/pagina1/pagina1.component';
import { InfoaseguradoComponent } from './componentes/pagina1/infoasegurado/infoasegurado.component';
import { InfovehiculoComponent } from './componentes/pagina1/infovehiculo/infovehiculo.component';
import { Pagina2Component } from './componentes/pagina2/pagina2.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { from } from 'rxjs';
import {
  NgbModule,
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { VermasComponent } from './componentes/vermas/vermas.component';
import { Pagina3Component } from './componentes/pagina3/pagina3.component';
import { AseAXXAComponent } from './componentes/aseguradoras/ase-axxa/ase-axxa.component';
import { AseCHUBBComponent } from './componentes/aseguradoras/ase-chubb/ase-chubb.component';
import { AseSURAComponent } from './componentes/aseguradoras/ase-sura/ase-sura.component';
import { AseZURCIHComponent } from './componentes/aseguradoras/ase-zurcih/ase-zurcih.component';
import { AseMAPFREComponent } from './componentes/aseguradoras/ase-mapfre/ase-mapfre.component';
import { AseQUALITASComponent } from './componentes/aseguradoras/ase-qualitas/ase-qualitas.component';
import { AseBANORTEComponent } from './componentes/aseguradoras/ase-banorte/ase-banorte.component';
import { AseHDIComponent } from './componentes/aseguradoras/ase-hdi/ase-hdi.component';
import { AseAFIRMEComponent } from './componentes/aseguradoras/ase-afirme/ase-afirme.component';
import { AseANNAComponent } from './componentes/aseguradoras/ase-anna/ase-anna.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Pagina1Component,
    InfoaseguradoComponent,
    InfovehiculoComponent,
    Pagina2Component,
    Pagina3Component,
    LayoutComponent,
    VermasComponent,
    AseAXXAComponent,
    AseCHUBBComponent,
    AseSURAComponent,
    AseZURCIHComponent,
    AseMAPFREComponent,
    AseQUALITASComponent,
    AseBANORTEComponent,
    AseHDIComponent,
    AseAFIRMEComponent,
    AseANNAComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
