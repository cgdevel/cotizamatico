import { Component, Input, OnInit } from '@angular/core';
import { CatalogoModel } from '../../../interphaces/models/Catalogos.model';

@Component({
  selector: 'app-aseg-datos-emision',
  templateUrl: './aseg-datos-emision.component.html',
  styleUrls: ['./aseg-datos-emision.component.css'],
})
export class AsegDatosEmisionComponent implements OnInit {
  @Input() aseguradora: string;

  logoAseguradora: string;
  catCoberturas: CatalogoModel[];
  itemCoberturas: CatalogoModel;
  catFormaPago: CatalogoModel[];
  itemFormaPago: CatalogoModel;
  catMedioPago: CatalogoModel[];
  itemMedioPago: CatalogoModel;

  itemVacio: CatalogoModel;

  item: string;
  recibosTotal: number;
  recibosPrimero: number;
  recibosSubsecuentes: number;
  mostrarSubsecuentes: boolean;
  fechaInicioVigencia: Date;

  constructor() {}

  ngOnInit(): void {
    this.itemCoberturas = this.itemVacio;
    this.itemFormaPago = this.itemVacio;
    this.itemMedioPago = this.itemVacio;
    this.recibosPrimero = 0;
    this.recibosSubsecuentes = 0;
    this.recibosTotal = 0;
    this.fechaInicioVigencia = new Date();
    this.CargarCoberturas();
    this.CargarFormasPago();
    this.CargarMediosPago();
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
        this.logoAseguradora = '/AIG.svg';
        break;
    }
  }

  CargarCoberturas(): void {
    const cobs: CatalogoModel[] = [];
    cobs.push({ sDato: 'BÁSICA', sLlave: '0' });
    cobs.push({ sDato: 'LIMITADA', sLlave: '1' });
    cobs.push({ sDato: 'AMPLIA', sLlave: '2' });
    cobs.push({ sDato: 'AMPLIA PLUS', sLlave: '3' });
    this.catCoberturas = cobs;
  }

  CargarFormasPago(): void {
    const cobs: CatalogoModel[] = [];
    cobs.push({ sDato: 'CONTADO', sLlave: '0' });
    cobs.push({ sDato: 'SEMESTRAL', sLlave: '1' });
    cobs.push({ sDato: 'TRIMESTRAL', sLlave: '2' });
    cobs.push({ sDato: 'MENSUAL', sLlave: '3' });
    this.catFormaPago = cobs;
  }

  CargarMediosPago(): void{
    const medios: CatalogoModel[] = [];
    medios.push({ sDato: 'TARJETA DE CREDITO', sLlave: '0' });
    medios.push({ sDato: 'PAGO EN BANCO', sLlave: '1' });
    this.catMedioPago = medios;
  }

  onSelectCoberturaChange(): void {
    this.SeleccionaPagos();
  }

  onSelectFormaPagoChange(): void {
    this.SeleccionaPagos();
  }

  SeleccionaPagos(): void {
    if (
      this.itemCoberturas === this.itemVacio ||
      this.itemFormaPago === this.itemVacio
    ) {
      return;
    }

    let costoTotal = 0;

    switch (this.itemCoberturas.sLlave) {
      case '0':
        costoTotal = 12000;
        break;

      case '1':
        costoTotal = 24000;
        break;

      case '2':
        costoTotal = 36000;
        break;

      case '3':
        costoTotal = 48000;
        break;
    }

    this.recibosTotal = costoTotal;
    this.mostrarSubsecuentes = this.itemFormaPago.sLlave !== '0';

    let recibos = 0;

    switch (this.itemFormaPago.sLlave) {
      case '0':
        recibos = 1;
        break;

      case '1':
        recibos = 2;
        break;

      case '2':
        recibos = 4;
        break;

      case '3':
        recibos = 12;
        break;
    }

    console.log(recibos);
    const costoRecibos = costoTotal / recibos;

    if (this.itemFormaPago.sLlave === '0') {
      this.recibosTotal = costoTotal;
      this.recibosPrimero = 0;
      this.recibosSubsecuentes = 0;
    } else {
      this.recibosTotal = costoTotal + 300;
      this.recibosPrimero = costoRecibos + 300;
      this.recibosSubsecuentes = costoRecibos;
    }
  }
}
