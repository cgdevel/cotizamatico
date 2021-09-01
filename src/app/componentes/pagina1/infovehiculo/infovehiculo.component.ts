import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CatalogoModel } from 'src/app/interphaces/models/Catalogos.model';
import { InfovehiculoService } from '../../../servicios/infovehiculo.service';
import { CookieService } from 'ngx-cookie';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers'
import { RequestIdPeticionCotizacion } from 'src/app/interphaces/request/RequestIdPeticionCotizacion';
import { CotizamaticoActionsTypes, GetIdPeticion } from 'src/app/actions/cotizamatico.actions';
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
  peticionIdPeticion : Partial<RequestIdPeticionCotizacion>;

  variable1={
    cotizacion: {
                   iIdCotizacion: 0,
                   FechaInicioVigencia: "06/07/2021 16:08",
                   Domicilio: {
                                   iIdUbicacion: 27983,
                                   sCodigoPostal: 3330,
                                   iIdMunicipio: 268,
                                   sUbicacion: "Xoco",
                                   sMunicipio: "Benito Juárez",
                                   iIdEstado: 9,
                                   iEstadoPais: 0,
                                   iClaveEstadoCepomex: 0,
                                   sEstado: "Ciudad de México",
                                   sCalle: null,
                                   sNumeroExterior: null,
                                   sNumeroInterior: null
                   },
                   Persona: {
                                   sNombre: "DHFGGH",
                                   sApellidoPaterno: "GHFGHFGHFGH",
                                   sApellidoMaterno: null,
                                   sFechaNacimiento: null,
                                   sRfc: null,
                                   iEdad: 25,
                                   iSexo: 1,
                                   sEmail: "clilentes.cotizamatico@aarco.com.mx",
                                   sTelefono: null,
                                   iIdPais: 0,
                                   sNacionalidad: null,
                                   iIdOcupacion: 0,
                                   bSinoFuma: 0,
                                   bSiNoPersonaMoral: false
                   },
                   Credencial: {
                                   IdCredential: 3418,
                                   IdProfile: 85
                   },
                   SubRamo: {
                                   iIdSubRamo: 1,
                                   Ramo: null,
                                   iLineaNegocio: 0,
                                   iEstatus: 0, 
                                   iIdMostar: 0,
                                   iOrdenPresentacion: 0,
                                   sSubramo: "AUTOS",
                                   sAlias: null,
                                   sDescripcion: null,
                                   lineaNegocio: null
                   },
                   Sucursal: null,
                   Asociado: null,
                   Vehiculo: {
                                   iValorUnidad: 0.0,
                                   iValorFactura: 0.0,
                                   sTipoCarga: null,
                                   iIdTipoCarga: 0,
                                   FechaFactura: null,
                                   Marca: {
                                                   iIdMarca: 1,
                                                   sMarca: "CHEVROLET"
                                   },
                                   Modelo: {
                                                   iIdModelo: 13,
                                                   sModelo: "2012"
                                   },
                                   DescripcionModelo: {
                                                   iIdDescripcionModelo: 240,
                                                   iIdModeloSubmarca: 13,
                                                   iIdMostrar: 0,
                                                   sDescripcion: "E SEDAN STD 4 PTAS 5 OCP"
                                   },
                                   iValorPolizaMultiAnual: 0
                   },
                   Compania: null,
                   sXmls: null,
                   iIva: 0.0,
                   iIdAseguradora: 0,
                   iDescuento: 0.0
    },
    PaqueteCoberturasApi:{
                   idPaquete:2,
                   idAseguradora:5,
                   CoberturasApi:[
                   {
                                   idCobertura:275,
                                   idTipoCobertura:2,
                                   idFactor:17
                   },
                   {
                                   idCobertura:277,
                                   idTipoCobertura:2,
                                   idFactor:18
                   },
                   {
                                   idCobertura:278,
                                   idTipoCobertura:1,
                                   idFactor:10
                   },
                   {
                                   idCobertura:280,
                                   idTipoCobertura:1,
                                   idFactor:23
                   },
                   {
                                   idCobertura:282,
                                   idTipoCobertura:1,
                                   idFactor:6
                   }
                   ]
    },
    User: "COTIZAMATICO",
    Device: "EMULATOR30X1X5X0",
    Token: "7C2C8D3B-C488-4D14-B360-6B94013A0C4E"
}



  constructor(
    private infovehiculoService: InfovehiculoService,
    private cookieService: CookieService,
    private store: Store<fromRoot.State> 
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

  @Input() showchiquito: boolean;

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
    console.log(this.cookieService.getObject('modelo'));
     this.peticionIdPeticion.cotizacion.Credencial= {
      IdCredential: 3418,
      IdProfile: 85
    };
    this.peticionIdPeticion.cotizacion.SubRamo= {
      iIdSubRamo: 1,
      Ramo: null,
      iLineaNegocio: 0,
      iEstatus: 0,
      iIdMostar: 0,
      iOrdenPresentacion: 0,
      sSubramo:"AUTOS",
      sAlias: null,
      sDescripcion: null,
      lineaNegocio: null
    };

    this.store.dispatch( new GetIdPeticion(this.variable1) )




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
    this.emitTipoVehiculo.emit(
      this.itemTipoVehiculo
    );
    //  COOKIE CONTIENE MARCA
    let guardacookiemodelo =this.itemTipoVehiculo;
    this.cookieService.putObject('modelo', guardacookiemodelo);
    this.infovehiculoService
      .getCatalogos({
        iMarca: 0,
        iModelo: 0,
        iSubramo: Number(
          this.itemTipoVehiculo.sLlave
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
    this.emitAnioVehiculo.emit(
      this.itemAnioVehiculo
    );
   
    let guardacookieanio = this.itemAnioVehiculo;
    this.cookieService.putObject('anio', guardacookieanio);
    this.infovehiculoService
      .getCatalogos({
        iMarca: 0,
        iModelo: Number(
          this.itemAnioVehiculo.sLlave
        ),
        iSubramo: Number(
          this.itemTipoVehiculo.sLlave
        ),
        iTipoCatalogo: 30,
        sDescripcion: '',
      })
      .subscribe(
        (cat) => {
          // this.peticionIdPeticion.cotizacion.Vehiculo.Modelo.iIdModelo=cat
          if (!cat.bSuccess) {
            console.log('Error: Catálogos Marcas');
            console.log(cat.sMensaje);
          }

          this.catMarcaVehiculo = cat.catalogos;
          console.log(cat);
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
    this.emitMarcaVehiculo.emit(
      this.itemMarcaVehiculo
    );
    let guardacookiemarca = this.itemMarcaVehiculo;
    this.cookieService.putObject('marca', guardacookiemarca);
    this.infovehiculoService
      .getCatalogos({
        iMarca: Number(
          this.itemMarcaVehiculo.sLlave
        ),
        iModelo: Number(
          this.itemAnioVehiculo.sLlave
        ),
        iSubramo: Number(
          this.itemTipoVehiculo.sLlave
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
      this.itemDescripcionVehiculo
    );
    let guardacookiedescrip = this.itemDescripcionVehiculo;
    this.cookieService.putObject('descripcion', guardacookiedescrip);
    console.log(this.itemDescripcionVehiculo)
  }
  
}
