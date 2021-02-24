import { Component, OnInit } from '@angular/core';
import { from, fromEvent, Observable, Subscription } from 'rxjs';
import {Location} from '@angular/common';
import { FechasModel } from 'src/app/interphaces/models/Fechas.model';

@Component({
  selector: 'app-vermas',
  templateUrl: './vermas.component.html',
  styleUrls: ['./vermas.component.css']
})
export class VermasComponent implements OnInit {
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
  constructor( private locate: Location) { }
  onback(){
    this.locate.back();
  }
  axxa(){
    this.aseguradora = 'AXXA';
    console.log(this.aseguradora);
    return this.aseguradora;
  }
  chubb(){
  this.aseguradora = 'CHUBB';
  console.log(this.aseguradora);
  return this.aseguradora;
  }
sura(){
  this.aseguradora = 'SURA';
  console.log(this.aseguradora);
  return this.aseguradora;

}
zurich(){
  this.aseguradora = 'ZURICH';
  console.log(this.aseguradora);
  return this.aseguradora;

}
mapfre(){
  this.aseguradora = 'MAPRE';
  console.log(this.aseguradora);
  return this.aseguradora;

}
qualitas(){
  this.aseguradora = 'QUALITAS';
  console.log(this.aseguradora);
  return this.aseguradora;

}
banorte(){
  this.aseguradora = 'BANORTE';
  console.log(this.aseguradora);
  return this.aseguradora;

}
hdi(){
  this.aseguradora = 'HDI';
  console.log(this.aseguradora);
  return this.aseguradora;

}
afirme(){
  this.aseguradora = 'AFIRME';
  console.log(this.aseguradora);
  return this.aseguradora;

}
anna(){
  this.aseguradora = 'ANNA';
  console.log(this.aseguradora);
  return this.aseguradora;
}
  ngOnInit(): void {
    this.vermodelo = history.state.modsel;
    this.vermarca = history.state.marsel;
    this.verdescripcion = history.state.descsel;
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
}
