import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable, Subscription } from 'rxjs';
import { FechasModel } from 'src/app/interphaces/models/Fechas.model';
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
  clienteCodigoPostal: string;
  clienteFechaNacimiento: FechasModel;
  clienteAviso: boolean;

  datosValidos: boolean;

  constructor(private cookieService: CookieService) {}

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
    this.clienteFechaNacimiento = { anio: '', dia: '', mes: '' };
    this.clienteCodigoPostal = '';
    this.datosValidos = false;
    this.clienteAviso = false;
    localStorage.clear();
    this.cookieService.removeAll();
  }

  handlerVehiculoTipo(e: CatalogoModel) {
    this.vehiculoTipo = e;
    this.ValidarDatosObligatorios();
  }

  handlerVehiculoAnio(e: CatalogoModel) {
    this.vehiculoAnio = e;
    this.ValidarDatosObligatorios();
  }

  handlerVehiculoMarca(e: CatalogoModel) {
    this.vehiculoMarca = e;
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
    this.clienteTelefono = e;
    this.ValidarDatosObligatorios();
  }

  handlerClienteTipoPersona(e: string) {
    this.clienteTipoPersona = e;
    this.ValidarDatosObligatorios();
  }

  handlerClienteCodigoPostal(e: string) {
    this.clienteCodigoPostal = e;
    console.log(e);
    // console.log(this.clienteCodigoPostal)
    this.ValidarDatosObligatorios();
  }

  handlerClienteFechaNacimiento(e: FechasModel) {
    this.clienteFechaNacimiento = e;
    this.ValidarDatosObligatorios();
  }

  ValidarDatosObligatorios() {
    this.datosValidos = false;

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
        if (
          this.clienteFechaNacimiento.anio === '' ||
          this.clienteFechaNacimiento.dia === '' ||
          this.clienteFechaNacimiento.mes === ''
        ) {
          return;
        }
      }
    }
    if (this.clienteCodigoPostal === '') {
      return;
    }

    this.datosValidos = true;
  }
}
