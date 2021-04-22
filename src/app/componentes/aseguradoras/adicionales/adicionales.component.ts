import { Component, Input, OnInit } from '@angular/core';
import { CatalogoModel } from '../../../interphaces/models/Catalogos.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionales',
  templateUrl: './adicionales.component.html',
  styleUrls: ['./adicionales.component.css'],
})
export class AdicionalesComponent implements OnInit {
  @ Input() asesel = '';
  itemVacio: CatalogoModel;
  catAdicionalTipoPersona: CatalogoModel[];
  itemAdicionalTipoPersona: CatalogoModel;
  item = '';
  datAdiPfMaterno = '';
  datAdiPfNombre = '';
  datAdiPfPaterno = '';
  datAdiPfRfc = '';
  datAdiPmNombre = '';
  datAdiPmRfc = '';
  mostrarAdicional: boolean;
  mostrarAdicionalPf: boolean;
  mostrarAdicionalPm: boolean;
  formRFCMOR: FormGroup;
  formRFCFIS: FormGroup;
  constructor() {
    this.formRFCMOR = new FormGroup({
      RFCInMOR: new FormControl('', [
        Validators.required,
         Validators.pattern(/^(([A-Za-z]{3})([0-9]{6})([0-9A-Za-z]{3}))$/)
      ])
    });
    this.formRFCFIS = new FormGroup({
      RFCInFIS: new FormControl('', [
        Validators.required,
        Validators.pattern(/^((([A-Z]{4})([0-9]{6})(([A-Za-z0-9]{3}))))$/),
      ]),
    });
  }

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
    if (this.asesel !== 'BANORTE') {
      tipos.push({ sDato: 'MORAL', sLlave: 'M' });
    }
    // this.asesel !== 'BANORTE' ? tipos.push({ sDato: 'MORAL', sLlave: 'M' }) :  tipos.push({ sDato: '', sLlave: '' }) ;
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
