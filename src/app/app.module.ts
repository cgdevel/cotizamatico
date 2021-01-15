import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {LayoutComponent} from './layout/layout.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes//header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { Pagina1Component } from './componentes/pagina1/pagina1.component';
import { InfoaseguradoComponent } from './componentes/pagina1/infoasegurado/infoasegurado.component';
import {InfovehiculoComponent} from './componentes/pagina1/infovehiculo/infovehiculo.component';
import {Pagina2Component } from './componentes/pagina2/pagina2.component'
import { NgSelectModule } from '@ng-select/ng-select';
import { from } from 'rxjs';
import { NgbModule, NgbPaginationModule,NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { VermasComponent } from './componentes/vermas/vermas.component';
@NgModule({
  declarations: [AppComponent,
  HeaderComponent,
  FooterComponent,
  Pagina1Component,
  InfoaseguradoComponent,
  InfovehiculoComponent,
  Pagina2Component,
  LayoutComponent,
  VermasComponent
],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
     HttpClientModule,
     NgSelectModule,
     NgbModule,
     NgbPaginationModule, 
     NgbAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent,HeaderComponent,FooterComponent,InfovehiculoComponent,InfoaseguradoComponent,Pagina1Component,Pagina2Component, VermasComponent]
})
export class AppModule { }
