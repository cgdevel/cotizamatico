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
  nombrePFisMayu(nomb : string){
    this.datAdiPfNombre = this.datAdiPfNombre
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/Á/g, 'a')
    .replace(/É/g, 'e')
    .replace(/Í/g, 'i')
    .replace(/Ó/g, 'o')
    .replace(/Ú/g, 'u');
  this.datAdiPfNombre = this.datAdiPfNombre.toLocaleUpperCase();
  }
  apepatPFisMayu(appatstr: string) {
    // console.log(appatstr)
      this.datAdiPfPaterno = this.datAdiPfPaterno
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/Á/g, 'a')
      .replace(/É/g, 'e')
      .replace(/Í/g, 'i')
      .replace(/Ó/g, 'o')
      .replace(/Ú/g, 'u');
      this.datAdiPfPaterno = this.datAdiPfPaterno.toLocaleUpperCase();
  }
  apematPFisMayu(apmatstr: string) {
    // console.log(apmatstr)
      this.datAdiPfMaterno = this.datAdiPfMaterno
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/Á/g, 'a')
      .replace(/É/g, 'e')
      .replace(/Í/g, 'i')
      .replace(/Ó/g, 'o')
      .replace(/Ú/g, 'u');
      this.datAdiPfMaterno = this.datAdiPfMaterno.toLocaleUpperCase();
  }
  PfRfc(RFCFis : string){
    this.datAdiPfRfc = this.datAdiPfRfc
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/Á/g, 'a')
    .replace(/É/g, 'e')
    .replace(/Í/g, 'i')
    .replace(/Ó/g, 'o')
    .replace(/Ú/g, 'u');
    this.datAdiPfRfc = this.datAdiPfRfc.toLocaleUpperCase();
  }
  nombrePMorMayu(nomb : string){
    this.datAdiPmNombre = this.datAdiPmNombre
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/Á/g, 'a')
    .replace(/É/g, 'e')
    .replace(/Í/g, 'i')
    .replace(/Ó/g, 'o')
    .replace(/Ú/g, 'u');
  this.datAdiPmNombre = this.datAdiPmNombre.toLocaleUpperCase();
  }
  PmRfc(RFCMor : string){
    this.datAdiPmRfc = this.datAdiPmRfc
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/Á/g, 'a')
    .replace(/É/g, 'e')
    .replace(/Í/g, 'i')
    .replace(/Ó/g, 'o')
    .replace(/Ú/g, 'u');
    this.datAdiPmRfc = this.datAdiPmRfc.toLocaleUpperCase();
  }
}
