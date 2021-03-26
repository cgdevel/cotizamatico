import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InfovehiculoService } from '../../../../servicios/infovehiculo.service';
import { CatalogoModel } from '../../../../interphaces/models/Catalogos.model';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datos-pago',
  templateUrl: './datos-pago.component.html',
  styleUrls: ['./datos-pago.component.css'],
})
export class DatosPagoComponent implements OnInit {
  fechaInicioVigencia: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;
  @Input() IdAseguradora: number;
  @Input () cobertura: any;
  @Input () pagoseleccionado: any;
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
  mostrarDatosTarjetas: boolean;

  constructor(private infovehiculoService: InfovehiculoService) {}

  ngOnInit(): void {
    this.itemCoberturas = this.itemVacio;
    this.itemFormaPago = this.itemVacio;
    this.itemMedioPago = this.itemVacio;

    this.recibosPrimero = 0;
    this.recibosSubsecuentes = 0;
    this.recibosTotal = 0;
    this.mostrarDatosTarjetas = false;

    this.CargarCoberturas();
    this.CargarFormasPago();
    this.CargarMediosPago();
    this.CargarBancos();
    this.catCoberturas.forEach(element => {
      if (this.cobertura === element.sDato) {
        this.itemCoberturas = element;
      }
    });
    this.catFormaPago.forEach(element1 => {
      if (this.pagoseleccionado === 'Anual' ) {
        this.itemFormaPago = { sDato: 'Contado', sLlave: '0' } ;
        this.SeleccionaPagos();
      }else if ( this.pagoseleccionado === element1.sDato){
        this.itemFormaPago = element1;
        this.SeleccionaPagos();
      }
    });
  }

  onSelectCoberturaChange(): void {
    this.SeleccionaPagos();
  }

  onSelectFormaPagoChange(): void {
    this.SeleccionaPagos();
  }

  onSelectMedioPagoChange(): void {
    if (this.itemMedioPago.sLlave === '0') {
      this.mostrarDatosTarjetas = true;
    } else {
      this.mostrarDatosTarjetas = false;
    }
  }

  CargarCoberturas(): void {
    const cobs: CatalogoModel[] = [];
    cobs.push({ sDato: 'Básica', sLlave: '0' });
    cobs.push({ sDato: 'Limitada', sLlave: '1' });
    cobs.push({ sDato: 'Amplia', sLlave: '2' });
    cobs.push({ sDato: 'Amplia Plus', sLlave: '3' });
    this.catCoberturas = cobs;
  }

  CargarFormasPago(): void {
    const cobs: CatalogoModel[] = [];
    cobs.push({ sDato: 'Contado', sLlave: '0' });
    cobs.push({ sDato: 'Semestral', sLlave: '1' });
    cobs.push({ sDato: 'Trimestral', sLlave: '2' });
    cobs.push({ sDato: 'Mensual', sLlave: '3' });
    this.catFormaPago = cobs;
  }

  CargarMediosPago(): void {
    const medios: CatalogoModel[] = [];
    medios.push({ sDato: 'TARJETA DE CREDITO', sLlave: '0' });
    medios.push({ sDato: 'PAGO EN BANCO', sLlave: '1' });
    this.catMedioPago = medios;
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

  CargarBancos(): void {
    this.infovehiculoService
      .getApiCatalogoBancos({
        Filtro: this.IdAseguradora,
        IdAplication: 2,
        NombreCatalogo: 'Banco',
      })
      .subscribe(
        (cat: any) => {
          console.log(cat);
        },
        (err) => {
          console.log('Error: Bancos');
          console.log(err.message);
        }
      );
  }
}
