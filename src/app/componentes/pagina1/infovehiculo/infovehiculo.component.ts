import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CatalogoModel } from '../../../interphaces/models/Catalogos.model';
import { InfovehiculoService } from '../../../servicios/infovehiculo.service';

//  para añadir script import * as $ from 'jquery';

@Component({
  selector: 'app-infovehiculo',
  templateUrl: './infovehiculo.component.html',
  styleUrls: ['./infovehiculo.component.css'],
})
export class InfovehiculoComponent implements OnInit {
  constructor(private infovehiculoService: InfovehiculoService) {}
  @Output() emitTipoVehiculo = new EventEmitter<CatalogoModel>();
  @Output() emitAnioVehiculo = new EventEmitter<CatalogoModel>();
  @Output() emitMarcaVehiculo = new EventEmitter<CatalogoModel>();
  @Output() emitDescripcion = new EventEmitter<CatalogoModel>();

  @Input() showchiquito: boolean;

  @Input() disabled: boolean;
  @Input() modeloselpagina3: any;
  @Input() annoselpagina3:any;
  @Input() marcaselpagina3: any;
  @Input() descripselpagina3: any;
  @Input() itemTipoVehiculo: CatalogoModel;
  @Input() itemAnioVehiculo: CatalogoModel;
  @Input() itemMarcaVehiculo: CatalogoModel;
  @Input() itemDescripcionVehiculo: CatalogoModel;

  catTipoVehiculo: CatalogoModel[];
  catAnioVehiculo: CatalogoModel[];
  catMarcaVehiculo: CatalogoModel[];
  catDescripcionVehiculo: CatalogoModel[];
  annos: CatalogoModel[];
  modelos: CatalogoModel[];
  marcas: CatalogoModel[];
  descripciones: CatalogoModel[];

  itemVacio: CatalogoModel;

  item: string;
  itemtipo:string;
  vermodelo: string;
  veranno: string;
  vermarca: string;
  verdescripcion: string;

  ngOnInit(): void {
    this.getTiposVehiculos();
  }

  getTiposVehiculos() {
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
          }else{
            this.catTipoVehiculo = cat.catalogos;
            console.log(this.catTipoVehiculo) ;
          }
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
    this.emitTipoVehiculo.emit(this.itemTipoVehiculo);
    this.infovehiculoService
      .getCatalogos({
        iMarca: 0,
        iModelo: 0,
        iSubramo: Number(this.itemTipoVehiculo.sLlave),
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
    this.emitAnioVehiculo.emit(this.itemAnioVehiculo);
    this.infovehiculoService
      .getCatalogos({
        iMarca: 0,
        iModelo: Number(this.itemAnioVehiculo.sLlave),
        iSubramo: Number(this.itemTipoVehiculo.sLlave),
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

    this.emitMarcaVehiculo.emit(this.itemMarcaVehiculo);

    this.infovehiculoService
      .getCatalogos({
        iMarca: Number(this.itemMarcaVehiculo.sLlave),
        iModelo: Number(this.itemAnioVehiculo.sLlave),
        iSubramo: Number(this.itemTipoVehiculo.sLlave),
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
    this.emitDescripcion.emit(this.itemDescripcionVehiculo);
  }
}