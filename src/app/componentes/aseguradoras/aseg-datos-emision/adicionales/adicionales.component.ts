import { Component, OnInit } from '@angular/core';
import { CatalogoModel } from '../../../../interphaces/models/Catalogos.model';

@Component({
  selector: 'app-adicionales',
  templateUrl: './adicionales.component.html',
  styleUrls: ['./adicionales.component.css'],
})
export class AdicionalesComponent implements OnInit {
  itemVacio: CatalogoModel;
  catAdicionalTipoPersona: CatalogoModel[];
  itemAdicionalTipoPersona: CatalogoModel;

  mostrarAdicional: boolean;
  mostrarAdicionalPf: boolean;
  mostrarAdicionalPm: boolean;

  constructor() {}

  ngOnInit(): void {
    this.itemAdicionalTipoPersona = this.itemVacio;
    this.mostrarAdicional = false;
    this.mostrarAdicionalPf = false;
    this.mostrarAdicionalPm = false;
    this.CargarTipoFiscalAdicional();
  }

  onSelectAdicionalTipoPersona(): void {
    this.MostrarAdicionalPersona();
  }

  CargarTipoFiscalAdicional(): void {
    const tipos: CatalogoModel[] = [];
    tipos.push({ sDato: 'FÍSICA', sLlave: 'F' });
    tipos.push({ sDato: 'MORAL', sLlave: 'M' });
    this.catAdicionalTipoPersona = tipos;
  }

  MostrarAdicionalPersona(): void {
    this.mostrarAdicionalPf = false;
    this.mostrarAdicionalPm = false;

    if (this.itemAdicionalTipoPersona.sLlave === 'F') {
      this.mostrarAdicionalPf = true;
    } else if (this.itemAdicionalTipoPersona.sLlave === 'M') {
      this.mostrarAdicionalPm = true;
    }
  }
}
