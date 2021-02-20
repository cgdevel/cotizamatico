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

  /* Valores vehículo */
  vehiculoTipo: CatalogoModel;
  vehiculoAnio: CatalogoModel;
  vehiculoMarca: CatalogoModel;
  vehiculoDescripcion: CatalogoModel;
  itemVacio: CatalogoModel;

  /* Valores cliente */
  clienteNombre: string;
  clienteMail: string;
  clienteTelefono: string;
  clienteTipoPersona: string;
  clienteFechaNacimiento: string;
  clienteCodigoPostal: string;

  datosValidos: boolean;

  constructor() {}

  ngOnInit(): void {
    this.itemVacio = { sDato: '', sLlave: '' };
    this.vehiculoTipo = this.itemVacio;
    this.vehiculoAnio = this.itemVacio;
    this.vehiculoMarca = this.itemVacio;
    this.vehiculoDescripcion = this.itemVacio;
    this.clienteNombre = '';
    this.clienteMail = '';
    this.clienteTelefono = '';
    this.clienteTipoPersona = '';
    this.clienteFechaNacimiento = '';
    this.clienteCodigoPostal = '';
    this.datosValidos = false;

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
    this.vehiculoTipo = e;
    this.vehiculoAnio = this.itemVacio;
    this.vehiculoMarca = this.itemVacio;
    this.vehiculoDescripcion = this.itemVacio;
    this.ValidarDatosObligatorios();
  }

  handlerVehiculoAnio(e: CatalogoModel) {
    this.vehiculoAnio = e;
    this.vehiculoMarca = this.itemVacio;
    this.vehiculoDescripcion = this.itemVacio;
    this.ValidarDatosObligatorios();
  }

  handlerVehiculoMarca(e: CatalogoModel) {
    this.vehiculoMarca = e;
    this.vehiculoDescripcion = this.itemVacio;
    this.ValidarDatosObligatorios();
  }

  handlerVehiculoDescripcion(e: CatalogoModel) {
    this.vehiculoDescripcion = e;
    this.ValidarDatosObligatorios();
  }

  handlerClienteNombre(e: string) {
    this.clienteNombre = e;
    this.ValidarDatosObligatorios();
  }

  handlerClienteMail(e: string) {
    this.clienteMail = e;
    this.ValidarDatosObligatorios();
  }

  handlerClienteTelefono(e: string) {
    console.log(e);
    this.clienteTelefono = e;
    this.ValidarDatosObligatorios();
  }

  handlerClienteTipoPersona(e: string) {
    this.clienteTipoPersona = e;
    this.ValidarDatosObligatorios();
  }

  handlerClienteCodigoPostal(e: string) {
    this.clienteCodigoPostal = e;
    this.ValidarDatosObligatorios();
  }

  ValidarDatosObligatorios() {
    this.datosValidos = false;
    debugger;

    if (this.vehiculoTipo === this.itemVacio) {
      return;
    }
    if (this.vehiculoAnio === this.itemVacio) {
      return;
    }
    if (this.vehiculoMarca === this.itemVacio) {
      return;
    }
    if (this.vehiculoDescripcion === this.itemVacio) {
      return;
    }
    if (this.clienteNombre === '') {
      return;
    }
    if (this.clienteMail === '') {
      return;
    }
    if (this.clienteTelefono === '') {
      return;
    }
    if (this.clienteTipoPersona === '') {
      return;
    } else {
      if (this.clienteTipoPersona !== 'Moral') {
        if (this.clienteFechaNacimiento === '') {
          return;
        }
      }
    }
    if (this.clienteCodigoPostal === '') {
      return;
    }

    this.datosValidos = true;
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
