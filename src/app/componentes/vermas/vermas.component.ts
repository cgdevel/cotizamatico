import { Component, OnInit } from '@angular/core';
import { from, fromEvent, Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { FechasModel } from 'src/app/interphaces/models/Fechas.model';
import { Aseguradoras } from 'src/app/interphaces/models/Aseguradoras.model';
import { InfovehiculoService } from '../../servicios/infovehiculo.service';
import aseguradorasSeed from '../../seeds/aseguradora.json';
import AseguradoraJson from '../../interphaces/aseguradoras';
const FileSaver = require('file-saver');
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import {selectCotizacionResponse} from '../../selectors/cotizamatico.selectors';

@Component({
  selector: 'app-vermas',
  templateUrl: './vermas.component.html',
  styleUrls: ['./vermas.component.css'],
})
export class VermasComponent implements OnInit {
  constructor(
    private locate: Location,
    private infovehiculoService: InfovehiculoService,
    private store: Store<fromRoot.State>
  ) {}
  verCarousle: boolean;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  vermodelo: any;
  vermarca: any;
  verdescripcion: any;
  veranno: any;
  nombre: any;
  email: any;
  telefono: any;
  genero: any;
  codigopostal: any;
  fechanaci: FechasModel;
  aseguradora: string;
  AseguradorasPoDesc: Aseguradoras[] = [];
  aseguradorasFromSer: AseguradoraJson[] = [];
  Aseguradoras: AseguradoraJson[] = [];
  responseCotizacionJSON =new Array
  noBasica=0;
  siBasica=0;
  pago = 'Anual';
  poliza = 'Amplia Plus';
  ngOnInit(): void {
    this.vermodelo = history.state.modsel;
    this.vermarca = history.state.marsel;
    this.verdescripcion = history.state.descsel;
    this.getAsePorDescrip();
    // this.Aseguradoras = this.getAsePorDescrip(this.verdescripcion.sLlave);
    this.veranno = history.state.annosel;
    this.nombre = history.state.nomsel;
    this.email = history.state.emsel;
    this.telefono = history.state.telsel;
    this.genero = history.state.generosel;
    this.codigopostal = history.state.codigosel;
    this.fechanaci = history.state.fechasel;
    if (window.innerWidth < 1216) {
      this.verCarousle = true;
    } else {
      this.verCarousle = false;
    }
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe((event) => {
      const windowEvent = event.target as Window;
      const windowWidth = windowEvent.innerWidth;
      if (windowWidth < 1216) {
        this.verCarousle = true;
      } else {
        this.verCarousle = false;
      }
    });
  }
  getAsePorDescrip() {
    this.store.select(selectCotizacionResponse).subscribe(res => {
      if(!res.jsonCotizacion.length&& res.idCotizacion!=1) 
      {
        return
      } else{
          this.responseCotizacionJSON=[];
        //   res.jsonCotizacion.forEach(element => {
        //   let json=JSON.parse(element)
        //   this.responseCotizacionJSON.push(json)
        // });
        for (let index = 0; index < res.jsonCotizacion.length; index++) {
          const element = JSON.parse(res.jsonCotizacion[index]);
          this.responseCotizacionJSON.push(element);
        }
        // OBTIENE EL IDPRODUCTO DE PRECIOCOTIZACION POR CADA this.Aseguradora Y DESHABILITAR BOTON BASICA
        console.log(this.responseCotizacionJSON);
        this.siBasica=0;
        this.noBasica=0;
        for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
          const for1 = this.responseCotizacionJSON[index].PrecioCotizacion;
          for (let index = 0; index < for1.length; index++) {
            const for2 = for1[index].IdProducto;
            if (for2<=3) {
                  this.noBasica+=1;
                }else{
                  this.siBasica+=1;
                }
          }
        }
        console.log(this.noBasica,this.siBasica);
      }
    })
    
    
  }

  onback() {
    this.locate.back();
  }
  descargapdf() {
    let anypdf: any;
    this.infovehiculoService.downloadPdf().subscribe((response) => {
      anypdf = response;
      const b64toBlob = require('b64-to-blob');
      const contentType = 'application/pdf';
      const b64Data = anypdf.byArchivoBytes;
      const blob = b64toBlob(b64Data, contentType);
      FileSaver.saveAs(blob, `${anypdf.sArchivoNombre}`);
    });
  }
}
