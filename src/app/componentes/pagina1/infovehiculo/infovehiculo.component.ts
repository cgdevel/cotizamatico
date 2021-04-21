import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CatalogoModel } from 'src/app/interphaces/models/Catalogos.model';
import { InfovehiculoService } from '../../../servicios/infovehiculo.service';
import { CookieService } from 'ngx-cookie';
//  para añadir script import * as $ from 'jquery';

@Component({
  selector: 'app-infovehiculo',
  templateUrl: './infovehiculo.component.html',
  styleUrls: ['./infovehiculo.component.css'],
})
export class InfovehiculoComponent implements OnInit {
  cookieModelo: any;
  cookieAnio: any;
  cookieMarca: any;
  cookieDescrip: any;

  constructor(
    private infovehiculoService: InfovehiculoService,
    private cookieService: CookieService
  ) {}
  @Output() emitTipoVehiculo = new EventEmitter<CatalogoModel>();
  @Output() emitAnioVehiculo = new EventEmitter<CatalogoModel>();
  @Output() emitMarcaVehiculo = new EventEmitter<CatalogoModel>();
  @Output() emitDescripcion = new EventEmitter<CatalogoModel>();

  catTipoVehiculo: CatalogoModel[];
  itemTipoVehiculo: CatalogoModel;

  catAnioVehiculo: CatalogoModel[];
  itemAnioVehiculo: CatalogoModel;

  catMarcaVehiculo: CatalogoModel[];
  itemMarcaVehiculo: CatalogoModel;

  catDescripcionVehiculo: CatalogoModel[];
  itemDescripcionVehiculo: CatalogoModel;
  item: string;

  @Input() disabled: boolean;
  @Input() modeloselpagina3: CatalogoModel;
  @Input() annoselpagina3: CatalogoModel;
  @Input() marcaselpagina3: CatalogoModel;
  @Input() descripselpagina3: CatalogoModel;
  @Input() modeloselpagina2: CatalogoModel;
  @Input() annoselpagina2: CatalogoModel;
  @Input() marcaselpagina2: CatalogoModel;
  @Input() descripselpagina2: CatalogoModel;
  /* Por borrar */

  @Input() modelosel: CatalogoModel;
  @Input() annosel: CatalogoModel;
  @Input() marcasel: CatalogoModel;
  @Input() descripsel: CatalogoModel;
  @Input() showchiquito: boolean;

  annos: CatalogoModel[];
  modelos: CatalogoModel[];
  marcas: CatalogoModel[];
  descripciones: CatalogoModel[];

  modelo: string; // Iniciamos
  vermodelo: string;
  anno: string; // Iniciamos
  veranno: string;
  marca: string; // Iniciamos
  vermarca: string;
  descripcion: string; // Iniciamos
  verdescripcion: string;

  itemVacio: CatalogoModel;

  ngOnInit(): void {
    this.catAnioVehiculo = [];
    this.catDescripcionVehiculo = [];
    this.catMarcaVehiculo = [];
    this.catTipoVehiculo = [];
    this.getTiposVehiculos();
    this.cookieModelo = this.cookieService.getObject('modelo');
    if (this.cookieModelo != null) {
      this.itemTipoVehiculo = this.cookieModelo;
      this.emitTipoVehiculo.emit(this.itemTipoVehiculo);
    } else {
      this.emitTipoVehiculo.emit(this.itemVacio);
    }
    this.cookieAnio = this.cookieService.getObject('anio');
    if (this.cookieAnio != null) {
      this.itemAnioVehiculo = this.cookieAnio;
      this.emitAnioVehiculo.emit(this.itemAnioVehiculo);
    } else {
      this.emitAnioVehiculo.emit(this.itemVacio);
    }
    this.cookieMarca = this.cookieService.getObject('marca');
    if (this.cookieMarca != null) {
      this.itemMarcaVehiculo = this.cookieMarca;
      this.emitMarcaVehiculo.emit(this.itemMarcaVehiculo);
    } else {
      this.emitMarcaVehiculo.emit(this.itemVacio);
    }
    this.cookieDescrip = this.cookieService.getObject('descripcion');
    if (this.cookieDescrip != null) {
      this.itemDescripcionVehiculo = this.cookieDescrip;
      this.emitDescripcion.emit(this.itemDescripcionVehiculo);
    } else {
      this.emitDescripcion.emit(this.itemVacio);
    }
    // console.log(this.cookieService.getObject('modelo'));
  }

  getTiposVehiculos() {
    this.catTipoVehiculo = [];
    this.itemTipoVehiculo = this.itemVacio;
    this.catAnioVehiculo = [];
    this.itemAnioVehiculo = this.itemVacio;
    this.catMarcaVehiculo = [];
    this.itemMarcaVehiculo = this.itemVacio;
    this.catDescripcionVehiculo = [];
    this.itemDescripcionVehiculo = this.itemVacio;
    this.infovehiculoService
      .getCatalogos({
        iMarca: 0,
        iModelo: 0,
        iSubramo: 0,
        iTipoCatalogo: 10,
        sDescripcion: '',
      })
      .subscribe(
        (cat) => {
          if (!cat.bSuccess) {
            console.log('Error: Catálogos Tipo de Vehículo');
            console.log(cat.sMensaje);
          }

          this.catTipoVehiculo = cat.catalogos;
        },
        (err) => {
          console.log('Error: Catálogos Tipo de Vehículo');
          console.log(err.message);
        }
      );
  }

  selectTipoVehiculo() {
    this.catAnioVehiculo = [];
    this.itemAnioVehiculo = this.itemVacio;
    this.catMarcaVehiculo = [];
    this.itemMarcaVehiculo = this.itemVacio;
    this.catDescripcionVehiculo = [];
    this.itemDescripcionVehiculo = this.itemVacio;
    this.modeloselpagina2 = this.itemVacio;
    this.marcaselpagina2 = this.itemVacio;
    this.annoselpagina2 = this.itemVacio;
    this.descripselpagina2 = this.itemVacio;
    this.emitTipoVehiculo.emit(
      !!this.itemTipoVehiculo
        ? this.itemTipoVehiculo
        : !!this.modeloselpagina2
        ? this.modeloselpagina2
        : this.modeloselpagina3
    );
    //  COOKIE CONTIENE MARCA
    let guardacookiemodelo = !!this.itemTipoVehiculo
      ? this.itemTipoVehiculo
      : !!this.modeloselpagina2
      ? this.modeloselpagina2
      : this.modeloselpagina3;
    this.cookieService.putObject('modelo', guardacookiemodelo);
    this.infovehiculoService
      .getCatalogos({
        iMarca: 0,
        iModelo: 0,
        iSubramo: Number(
          !!this.itemTipoVehiculo
            ? this.itemTipoVehiculo.sLlave
            : !!this.modeloselpagina2
            ? this.modeloselpagina2.sLlave
            : this.modeloselpagina3.sLlave
        ),
        iTipoCatalogo: 20,
        sDescripcion: '',
      })
      .subscribe(
        (cat) => {
          if (!cat.bSuccess) {
            console.log('Error: Catálogos Años');
            console.log(cat.sMensaje);
          }

          this.catAnioVehiculo = cat.catalogos;
        },
        (err) => {
          console.log('Error: Catálogos Años');
          console.log(err.message);
        }
      );
  }

  selectAnioVehiculo() {
    this.catMarcaVehiculo = [];
    this.itemMarcaVehiculo = this.itemVacio;
    this.catDescripcionVehiculo = [];
    this.itemDescripcionVehiculo = this.itemVacio;
    this.marcaselpagina2 = this.itemVacio;
    this.descripselpagina2 = this.itemVacio;
    this.emitAnioVehiculo.emit(
      !!this.itemAnioVehiculo
        ? this.itemAnioVehiculo
        : !!this.annoselpagina2
        ? this.annoselpagina2
        : this.annoselpagina3
    );
    let guardacookieanio = !!this.itemAnioVehiculo
      ? this.itemAnioVehiculo
      : !!this.annoselpagina2
      ? this.annoselpagina2
      : this.annoselpagina3;
    this.cookieService.putObject('anio', guardacookieanio);
    this.infovehiculoService
      .getCatalogos({
        iMarca: 0,
        iModelo: Number(
          !!this.itemAnioVehiculo
            ? this.itemAnioVehiculo.sLlave
            : !!this.annoselpagina2
            ? this.annoselpagina2.sLlave
            : this.annoselpagina3.sLlave
        ),
        iSubramo: Number(
          !!this.itemTipoVehiculo
            ? this.itemTipoVehiculo.sLlave
            : !!this.modeloselpagina2
            ? this.modeloselpagina2.sLlave
            : this.modeloselpagina3.sLlave
        ),
        iTipoCatalogo: 30,
        sDescripcion: '',
      })
      .subscribe(
        (cat) => {
          if (!cat.bSuccess) {
            console.log('Error: Catálogos Marcas');
            console.log(cat.sMensaje);
          }

          this.catMarcaVehiculo = cat.catalogos;
        },
        (err) => {
          console.log('Error: Catálogos Marcas');
          console.log(err.message);
        }
      );
  }

  selectMarca() {
    this.catDescripcionVehiculo = [];
    this.itemDescripcionVehiculo = this.itemVacio;
    this.descripselpagina2 = this.itemVacio;
    this.emitMarcaVehiculo.emit(
      !!this.itemMarcaVehiculo
        ? this.itemMarcaVehiculo
        : !!this.marcaselpagina2
        ? this.marcaselpagina2
        : this.marcaselpagina3
    );
    let guardacookiemarca = !!this.itemMarcaVehiculo
      ? this.itemMarcaVehiculo
      : !!this.marcaselpagina2
      ? this.marcaselpagina2
      : this.marcaselpagina3;
    this.cookieService.putObject('marca', guardacookiemarca);
    this.infovehiculoService
      .getCatalogos({
        iMarca: Number(
          !!this.itemMarcaVehiculo
            ? this.itemMarcaVehiculo.sLlave
            : !!this.marcaselpagina2
            ? this.marcaselpagina2.sLlave
            : this.marcaselpagina3.sLlave
        ),
        iModelo: Number(
          !!this.itemAnioVehiculo
            ? this.itemAnioVehiculo.sLlave
            : !!this.annoselpagina2
            ? this.annoselpagina2.sLlave
            : this.annoselpagina3.sLlave
        ),
        iSubramo: Number(
          !!this.itemTipoVehiculo
            ? this.itemTipoVehiculo.sLlave
            : !!this.modeloselpagina2
            ? this.modeloselpagina2.sLlave
            : this.modeloselpagina3.sLlave
        ),
        iTipoCatalogo: 40,
        sDescripcion: '',
      })
      .subscribe(
        (cat) => {
          if (!cat.bSuccess) {
            console.log('Error: Catálogos Descripción');
            console.log(cat.sMensaje);
          }

          this.catDescripcionVehiculo = cat.catalogos;
        },
        (err) => {
          console.log('Error: Catálogos Descripción');
          console.log(err.message);
        }
      );
  }

  selectDescripcion() {

    this.emitDescripcion.emit(
      !!this.itemDescripcionVehiculo
        ? this.itemDescripcionVehiculo
        : !!this.descripselpagina2
        ? this.descripselpagina2
        : this.descripselpagina3
    );
    let guardacookiedescrip = !!this.itemDescripcionVehiculo
      ? this.itemDescripcionVehiculo
      : !!this.descripselpagina2
      ? this.descripselpagina2
      : this.descripselpagina3;
    this.cookieService.putObject('descripcion', guardacookiedescrip);
  }
}
