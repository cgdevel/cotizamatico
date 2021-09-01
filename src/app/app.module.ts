import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
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
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { EffectsModule } from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import { from } from 'rxjs';
import {
  NgbModule,
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { VermasComponent } from './componentes/vermas/vermas.component';
import { Pagina3Component } from './componentes/pagina3/pagina3.component';
import { CookieModule } from 'ngx-cookie';
import { AsegDatosEmisionComponent } from './componentes/aseguradoras/aseg-datos-emision/aseg-datos-emision.component';
import { CoberturasComponent } from './componentes/coberturas/coberturas.component';
import { AdicionalesComponent } from './componentes/aseguradoras/adicionales/adicionales.component';
import { DatosPagoComponent } from './componentes/aseguradoras/datos-pago/datos-pago.component';
import { DatosEmisionVehiculoComponent } from './componentes/aseguradoras/datos-emision-vehiculo/datos-emision-vehiculo.component';
import { DatosEmisionClienteFisicaComponent } from '../app/componentes/aseguradoras/datos-emision-cliente-fisica/datos-emision-cliente.component';
import { EmisionFinalComponent } from './componentes/emision-final/emision-final.component';
import { DatosEmisionClienteMoralComponent } from './componentes/aseguradoras/datos-emision-cliente-moral/datos-emision-cliente-moral.component';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { CotizamaticoEffects } from './effects/cotizamatico.effects';

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
    AsegDatosEmisionComponent,
    CoberturasComponent,
    AdicionalesComponent,
    DatosPagoComponent,
    DatosEmisionVehiculoComponent,
    DatosEmisionClienteFisicaComponent,
    EmisionFinalComponent,
    DatosEmisionClienteMoralComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    CookieModule.forRoot(),
    NgxSliderModule,
    // StoreModule.forRoot({}, {}),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([
      CotizamaticoEffects
    ]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
