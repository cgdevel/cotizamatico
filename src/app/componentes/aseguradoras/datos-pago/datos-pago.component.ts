import { Component, Input, OnInit } from '@angular/core';
import { InfovehiculoService } from '../../../servicios/infovehiculo.service';
import { CatalogoModel } from '../../../interphaces/models/Catalogos.model';
import { BancoModel } from '../../../interphaces/models/Banco.model';

@Component({
  selector: 'app-datos-pago',
  templateUrl: './datos-pago.component.html',
  styleUrls: ['./datos-pago.component.css'],
})
export class DatosPagoComponent implements OnInit {
  @Input() IdAseguradora: number;
  @Input() cobertura: any;
  @Input() pagoseleccionado: any;

  catCoberturas: CatalogoModel[];
  itemCoberturas: CatalogoModel;
  catFormaPago: CatalogoModel[];
  itemFormaPago: CatalogoModel;
  catMedioPago: CatalogoModel[];
  itemMedioPago: CatalogoModel;
  catBancos: CatalogoModel[];
  itemBancos: CatalogoModel;
  itemVacio: CatalogoModel;
  item: string;

  recibosTotal: number;
  recibosPrimero: number;
  recibosSubsecuentes: number;
  mostrarSubsecuentes: boolean;
  mostrarDatosTarjetas: boolean;
  polizaInicioVigencia: string;

  tarjetaMaximoTarjeta: number;
  tarjetaMaximoCvv: number;
  tarjetaNombre: string;
  tarjetaPaterno: string;
  tarjetaMaterno: string;
  tarjetaNumero: string;
  tarjetaNumeroValido: boolean;
  tarjetaCodigo: string;
  tarjetaCodigoValido: boolean;
  tarjetaVigenciaMes: string;
  tarjetaVigenciaAnio: string;

  constructor(private infovehiculoService: InfovehiculoService) {}

  ngOnInit(): void {
    this.itemCoberturas = this.itemVacio;
    this.itemFormaPago = this.itemVacio;
    this.itemMedioPago = this.itemVacio;
    this.itemBancos = this.itemVacio;

    this.recibosPrimero = 0;
    this.recibosSubsecuentes = 0;
    this.recibosTotal = 0;

    this.mostrarDatosTarjetas = false;
    this.tarjetaMaximoCvv = 3;
    this.tarjetaMaximoTarjeta = 16;

    this.tarjetaNombre = '';
    this.tarjetaPaterno = '';
    this.tarjetaMaterno = '';
    this.tarjetaNumero = '';
    this.tarjetaCodigo = '';
    this.tarjetaVigenciaAnio = '';
    this.tarjetaVigenciaMes = '';
    this.tarjetaNumeroValido = true;
    this.tarjetaCodigoValido = true;
    this.polizaInicioVigencia = (new Date()).toISOString().split('T')[0];

    this.CargarCoberturas();
    this.CargarFormasPago();
    this.CargarMediosPago();
    this.CargarBancos();
    this.catCoberturas.forEach((element) => {
      if (this.cobertura === element.sDato) {
        this.itemCoberturas = element;
      }
    });
    this.catFormaPago.forEach((element1) => {
      if (this.pagoseleccionado === 'Anual') {
        this.itemFormaPago = { sDato: 'Contado', sLlave: '0' };
        this.SeleccionaPagos();
      } else if (this.pagoseleccionado === element1.sDato) {
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

  onSelectBancoChange(): void {
    if (this.itemBancos.sLlave === '103') {
      this.tarjetaMaximoTarjeta = 15;
      this.tarjetaMaximoCvv = 4;
      return;
    }

    this.tarjetaMaximoTarjeta = 16;
    this.tarjetaMaximoCvv = 3;

    this.onNumeroTarjetaChange();
    this.onNumeroCvvChange();
  }

  onNumeroTarjetaChange(): void {
    if (this.tarjetaNumero === '') {
      this.tarjetaNumeroValido = true;
      return;
    }

    this.tarjetaNumeroValido =
      this.tarjetaNumero.length === this.tarjetaMaximoTarjeta;
  }

  onNumeroCvvChange(): void {
    if (this.tarjetaCodigo === '') {
      this.tarjetaCodigoValido = true;
      return;
    }

    this.tarjetaCodigoValido =
      this.tarjetaCodigo.length === this.tarjetaMaximoCvv;
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
          const bancos = JSON.parse(cat.CatalogoJsonString) as BancoModel[];
          const arrBanco: CatalogoModel[] = [];
          bancos.forEach((banco) =>
            arrBanco.push({
              sLlave: banco.iIdBanco.toString(),
              sDato: banco.sBanco,
            })
          );
          this.catBancos = arrBanco;
        },
        (err) => {
          console.log('Error: Bancos');
          console.log(err.message);
        }
      );
  }
}
