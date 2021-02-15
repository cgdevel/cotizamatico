import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CatalogoModel } from 'src/app/interphaces/models/Catalogos.model';
import { InfovehiculoService } from '../../../servicios/infovehiculo.service';

//  para añadir script import * as $ from 'jquery';

@Component({
  selector: 'app-infovehiculo',
  templateUrl: './infovehiculo.component.html',
  styleUrls: ['./infovehiculo.component.css'],
})
export class InfovehiculoComponent implements OnInit {
  constructor(private infovehiculoService: InfovehiculoService) {}
  @Output() gM = new EventEmitter<string>();
  @Output() gA = new EventEmitter<string>();
  @Output() gMarca = new EventEmitter<string>();
  @Output() gDesc = new EventEmitter<string>();

  @Input() modelosel;
  @Input() annosel;
  @Input() marcasel;
  @Input() descripsel;
  @Input() showchiquito;

  @Input() disabled;
  @Input() modeloselpagina3;
  @Input() annoselpagina3;
  @Input() marcaselpagina3;
  @Input() descripselpagina3;

  catTipoVehiculo: CatalogoModel[];
  itemTipoVehiculo: CatalogoModel;

  catAnioVehiculo: CatalogoModel[];
  itemAnioVehiculo: CatalogoModel;

  catMarcaVehiculo: CatalogoModel[];
  itemMarcaVehiculo: CatalogoModel;

  catDescripcionVehiculo: CatalogoModel[];
  itemDescripcionVehiculo: CatalogoModel;

  annos: CatalogoModel[];
  modelos: CatalogoModel[];
  marcas: CatalogoModel[];
  descripciones: CatalogoModel[];

  itemVacio: CatalogoModel;

  item: string;
  modelo: string; // Iniciamos
  vermodelo: string;
  anno: string; // Iniciamos
  veranno: string;
  marca: string; // Iniciamos
  vermarca: string;
  descripcion: string; // Iniciamos
  verdescripcion: string;

  ngOnInit(): void {
    this.getTiposVehiculos();
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

  selectAnioVehiculo(){
    this.catMarcaVehiculo = [];
    this.itemMarcaVehiculo = this.itemVacio;
    this.catDescripcionVehiculo = [];
    this.itemDescripcionVehiculo = this.itemVacio;

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

  selectMarca(){
    this.catDescripcionVehiculo = [];
    this.itemDescripcionVehiculo = this.itemVacio;

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

  selectDescripcion(){
    
  }

  getModelo() {
    // Limpia los select restantes
    this.annos = [];
    this.annosel = '';
    this.veranno = '';
    this.anno = '';
    this.marcas = [];
    this.marcasel = '';
    this.vermarca = '';
    this.marca = '';
    this.descripciones = [];
    this.descripsel = '';
    this.verdescripcion = '';
    this.descripcion = '';
    //Limpia el emisor
    this.gA.emit('');
    this.gMarca.emit('');
    this.gDesc.emit('');
    // Muestra modelo Seleccinonado
    // console.log(this.modelosel.sDato+'  '+this.modelosel.sLlave)
    this.modelo = this.modelosel.sLlave;
    this.vermodelo = this.modelosel.sDato;
    this.gM.emit(this.vermodelo);
    this.infovehiculoService
      .getApiInfovehiculo({
        iTipoCatalogo: '20',
        iModelo: '00',
        iMarca: '0',
        iSubramo: this.modelo,
        sDescripcion: '',
      })
      .subscribe((data: any) => {
        // console.log(data.catalogos)
        this.annos = data.catalogos;
      });
  }
  getAnno() {
    // Limpia los select restantes
    this.marcas = [];
    this.marcasel = '';
    this.vermarca = '';
    this.marca = '';
    this.descripciones = [];
    this.descripsel = '';
    this.verdescripcion = '';
    this.descripcion = '';
    //Limpia el emisor
    this.gMarca.emit('');
    this.gDesc.emit('');
    // Muestra año Seleccinonado
    // console.log(this.annosel.sDato+'  '+this.annosel.sLlave)
    this.anno = this.annosel.sLlave;
    this.veranno = this.annosel.sDato;
    this.gA.emit(this.veranno);
    this.infovehiculoService
      .getApiInfovehiculo({
        iTipoCatalogo: '30',
        iModelo: this.anno,
        iMarca: '0',
        iSubramo: this.modelo,
        sDescripcion: '',
      })
      .subscribe((data: any) => {
        // console.log(data.catalogos)
        this.marcas = data.catalogos;
      });
  }
  getMarca() {
    // Limpia los select restantes
    this.descripciones = [];
    this.descripsel = '';
    this.verdescripcion = '';
    this.descripcion = '';
    //Limpia el emisor
    this.gDesc.emit('');
    // Muestra marca seleccionada
    // console.log(this.marcasel.sDato+'  '+this.marcasel.sLlave)
    this.marca = this.marcasel.sLlave;
    this.vermarca = this.marcasel.sDato;
    this.gMarca.emit(this.vermarca);
    this.infovehiculoService
      .getApiInfovehiculo({
        iTipoCatalogo: '40',
        iModelo: this.anno,
        iMarca: this.marca,
        iSubramo: this.modelo,
        sDescripcion: '',
      })
      .subscribe((data: any) => {
        // console.log(data.catalogos)
        this.descripciones = data.catalogos;
      });
  }
  getDescripcion() {
    // Muestra marca seleccionada
    // console.log(this.descripsel.sDato+'  '+this.descripsel.sLlave)
    this.descripcion = this.descripsel.sLlave;
    this.verdescripcion = this.descripsel.sDato;
    this.gDesc.emit(this.verdescripcion);
  }
  getmodels() {
    this.infovehiculoService
      .getApiInfovehiculo({
        iTipoCatalogo: '10',
        iModelo: '00',
        iMarca: '0',
        iSubramo: '00',
        sDescripcion: '',
      })
      .subscribe((data: any) => {
        // console.log(data.catalogos)
        this.modelos = data.catalogos;
      });
  }
}
