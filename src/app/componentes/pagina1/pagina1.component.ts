import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { CatalogoModel } from '../../interphaces/models/Catalogos.model';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.css'],
})
export class Pagina1Component implements OnInit {
  size: number;
  verCarousle: boolean;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  // variabbles datos asegurado
  nombre: string;
  email: string;
  telefono: string;
  genero: string;
  cp: string;
  statumustr: string;
  mujboo: boolean;
  statuhomstr: string;
  homboo: boolean;
  statuempstr: string;
  empboo: boolean;

  // Variables fecha de nacimiento
  sm: string;
  sy: string;
  sd: string;

  // Variables carro
  modelo: string;
  marca: string;
  descripcion: string;
  anno: string;

  vehiculoTipo: CatalogoModel;
  vehiculoAnio: CatalogoModel;
  vehiculoMarca: CatalogoModel;
  vehiculoDescripcion: CatalogoModel;
  itemVacio: CatalogoModel;

  constructor() {}

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe((event) => {
      this.size = (event.target as Window).innerWidth;
      console.log((event.target as Window).innerWidth);
      if (
        (event.target as Window).innerWidth < 1216 ||
        (event.target as Window).innerWidth >= 126
      ) {
        this.verCarousle = true;
      } else {
        this.verCarousle = false;
      }
    });
  }

  handlerVehiculoTipo(e: CatalogoModel) {
    console.log(e);
    this.vehiculoTipo = e;
    this.vehiculoAnio = this.itemVacio;
    this.vehiculoMarca = this.itemVacio;
    this.vehiculoDescripcion = this.itemVacio;
  }

  handlerVehiculoAnio(e: CatalogoModel) {
    console.log(e);
    this.vehiculoAnio = e;
    this.vehiculoMarca = this.itemVacio;
    this.vehiculoDescripcion = this.itemVacio;
  }

  handlerVehiculoMarca(e: CatalogoModel) {
    console.log(e);
    this.vehiculoMarca = e;
    this.vehiculoDescripcion = this.itemVacio;
  }

  handlerVehiculoDescripcion(e: CatalogoModel) {
    console.log(e);
    this.vehiculoDescripcion = e;
  }


  f(e) {
    console.log(e);
    this.sd = e;
  }
  g(e) {
    // console.log(e);
    this.sm = e;
  }
  h(e) {
    // console.log(e);
    this.sy = e;
  }
  i(e) {
    // console.log(e)
    this.telefono = e;
  }

  j(e) {
    // console.log(e)
    this.nombre = e;
  }

  k(e) {
    // console.log(e)
    this.cp = e;
  }
  l(e) {
    // console.log(e)
    this.email = e;
  }

  mu(e) {
    // console.log(e)
    this.statumustr = e;
  }
  muj(e) {
    // console.log(e)
    this.mujboo = e;
  }
  ho(e) {
    // console.log(e)
    this.statuhomstr = e;
  }
  hom(e) {
    // console.log(e)
    this.homboo = e;
  }
  em(e) {
    // console.log(e)
    this.statuempstr = e;
  }
  emp(e) {
    // console.log(e)
    this.empboo = e;
  }
}
