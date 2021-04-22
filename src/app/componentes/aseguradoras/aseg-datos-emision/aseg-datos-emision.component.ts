import { Component, Input, OnInit } from '@angular/core';
import { CatalogoModel } from '../../../interphaces/models/Catalogos.model';
import { FechasModel } from '../../../interphaces/models/Fechas.model';
@Component({
  selector: 'app-aseg-datos-emision',
  templateUrl: './aseg-datos-emision.component.html',
  styleUrls: ['./aseg-datos-emision.component.css'],
})
export class AsegDatosEmisionComponent implements OnInit {
  @Input() aseguradora: string;
  codigopostal: any;
  correo: any;
  telefono: any;
  genero: any;
  nombreaseg: any;
  fechanac: FechasModel;
  modeloautoaseg: CatalogoModel;
  marcaautoaseg: CatalogoModel;
  descautoaseg: CatalogoModel;
  annoautoaseg: CatalogoModel;
  logoAseguradora: string;
  itemVacio: CatalogoModel;
  item: string;
  datAdiPfNombre: string;
  datAdiPfPaterno: string;
  datAdiPfMaterno: string;
  datAdiPfRfc: string;
  datAdiPmNombre: string;
  datAdiPmRfc: string;
  polizaselase: any;
  pagoselase: any;
  constructor() {}

  ngOnInit(): void {
    this.codigopostal = history.state.codigosel;
    this.correo = history.state.emsel;
    this.telefono = history.state.telsel;
    this.genero = history.state.generosel;
    this.fechanac = history.state.fechasel;
    this.modeloautoaseg = history.state.modsel;
    this.marcaautoaseg = history.state.marsel;
    this.descautoaseg = history.state.descsel;
    this.annoautoaseg = history.state.annosel;
    this.nombreaseg = history.state.nomsel;
    this.polizaselase = history.state.polizasel;
    this.pagoselase = history.state.pag;
    this.SeleccionarLogo();
  }

  SeleccionarLogo(): void {
    switch (this.aseguradora) {
      case 'AXA SEG':
        this.logoAseguradora = '../../../assets/iconosase/AXA.svg';
        break;

      case 'CHUBB':
        this.logoAseguradora = '../../../assets/iconosase/CHUBB.svg';
        break;

      case 'SURA':
        this.logoAseguradora = '../../../assets/iconosase/SURA.svg';
        break;

      case 'ZURICH':
        this.logoAseguradora = '../../../assets/iconosase/ZURICH.svg';
        break;

      case 'MAPFRE T':
        this.logoAseguradora = '../../../assets/iconosase/MAPFRE.svg';
        break;

      case 'QUALITAS':
        this.logoAseguradora = '../../../assets/iconosase/QUALITAS.svg';
        break;

      case 'BANORTE':
        this.logoAseguradora = '../../../assets/iconosase/BANORTE.svg';
        break;

      case 'HDI':
        this.logoAseguradora = '../../../assets/iconosase/HDI.svg';
        break;

      case 'AFIRME':
        this.logoAseguradora = '../../../assets/iconosase/AFIRME.svg';
        break;

      case 'ANA SEG':
        this.logoAseguradora = '../../../assets/iconosase/ANA.svg';
        break;

      case 'AIG MEX':
        this.logoAseguradora = '../../../assets/iconosase/AIG.svg';
        break;
    }
  }
  Persona(e: CatalogoModel){
    console.log(e.sDato)
    return this.genero = e.sDato;
  }
}
