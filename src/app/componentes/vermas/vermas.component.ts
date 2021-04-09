import { Component, OnInit } from '@angular/core';
import { from, fromEvent, Observable, Subscription } from 'rxjs';
import {Location} from '@angular/common';
import { FechasModel } from 'src/app/interphaces/models/Fechas.model';
import { Aseguradoras } from 'src/app/interphaces/models/Aseguradoras.model';
import { InfovehiculoService } from '../../servicios/infovehiculo.service';
import aseguradorasSeed from '../../seeds/aseguradora.json';
import AseguradoraJson from '../../interphaces/aseguradoras';
var FileSaver = require('file-saver') ;
@Component({
  selector: 'app-vermas',
  templateUrl: './vermas.component.html',
  styleUrls: ['./vermas.component.css']
})
export class VermasComponent implements OnInit {
  constructor( private locate: Location , private infovehiculoService: InfovehiculoService) { }
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
  ngOnInit(): void {
    this.vermodelo = history.state.modsel;
    this.vermarca = history.state.marsel;
    this.verdescripcion = history.state.descsel;
    this.Aseguradoras = this.getAsePorDescrip(this.verdescripcion.sLlave);
    this.veranno = history.state.annosel;
    this.nombre = history.state.nomsel;
    this.email = history.state.emsel;
    this.telefono = history.state.telsel;
    this.genero = history.state.generosel;
    this.codigopostal = history.state.codigosel;
    this.fechanaci = history.state.fechasel;
    if (window.innerWidth < 1216){
      this.verCarousle = true;
    } else { this.verCarousle = false; }
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(event => {
      let windowEvent = event.target as Window;
      let windowWidth = windowEvent.innerWidth;
      if (windowWidth < 1216) {
        this.verCarousle = true;
      } else {
        this.verCarousle = false;
      }
    });
  }
  getAsePorDescrip(Desc: string ){
    this.infovehiculoService.getApiAseguradoras
    ({
       IdCotizamatico: Desc
    })
    .subscribe(
      (cat) => {
        if (cat === undefined) {
          console.log('Error');
        }
        // console.log(cat);
        cat.forEach(element => {
          this.AseguradorasPoDesc.push( {IdModeloCotizamatico: element.IdModeloCotizamatico,
            IdAseguradora: element.IdAseguradora,
            Compania: element.Compania,
            IdModeloAseguradora: element.IdModeloAseguradora,
            Marca: element.Marca,
            Submarca: element.Submarca,
            Modelo: element.Modelo,
            Descripcion: element.Descripcion} );
        });
        this.AseguradorasPoDesc.forEach(ase => {
          aseguradorasSeed.forEach(asejson => {
            if (ase.Compania === asejson.nombre){
              console.log(ase.Compania, asejson.nombre);
              this.aseguradorasFromSer.push(asejson);
            }
          });
        });
      },
      (err) => {
        console.log('Error');
      }
    );
    return this.aseguradorasFromSer;
   }
  onback(){
    this.locate.back();
  }
  descargapdf(){
    let anypdf: any;
    this.infovehiculoService.downloadPdf().subscribe(response=>{
    anypdf=response;
    var b64toBlob = require('b64-to-blob');
    var contentType = 'application/pdf';
    var b64Data = anypdf.byArchivoBytes;
    var blob = b64toBlob(b64Data, contentType);
    FileSaver.saveAs( blob, `${anypdf.sArchivoNombre}`);
   });
  }
  
}
