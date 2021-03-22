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
  telefono : any;
  genero: any;
  fechanac : FechasModel;
  logoAseguradora: string;
 
  
  itemVacio: CatalogoModel;

  item: string;
 
  

  datAdiPfNombre: string;
  datAdiPfPaterno: string;
  datAdiPfMaterno: string;
  datAdiPfRfc: string;
  datAdiPmNombre: string;
  datAdiPmRfc: string;

  constructor() {}

  ngOnInit(): void {
    this.codigopostal = history.state.codigosel;
    this.correo = history.state.emsel;
    this.telefono = history.state.telsel;
    this.genero = history.state.generosel;
    this.fechanac=history.state.fechasel;
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

      case 'AIG':
        this.logoAseguradora = '../../../assets/iconosase/AIG.svg';
        break;
    }
  }
 
}
