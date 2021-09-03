import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable, Subscription } from 'rxjs';
import { Constantes } from '../../core/Constantes';
import { SecureStorageServiceService } from '../../core/secure-storage-service.service';
import { FechasModel } from '../../interphaces/models/Fechas.model';
import { CatalogoModel } from '../../interphaces/models/Catalogos.model';
import { RequestIdPeticionCotizacion } from 'src/app/interphaces/request/RequestIdPeticionCotizacion';
import { CotizamaticoActionsTypes, GetIdPeticion } from 'src/app/actions/cotizamatico.actions';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers'
@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.css'],
})
export class Pagina1Component implements OnInit {

  constructor(
    private cookieService: CookieService,
    private storageService: SecureStorageServiceService,
    private store: Store<fromRoot.State> 
  ) {}
  
  sesion: any;

  size: number;
  verCarousle: boolean;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  /* Asociados */
  catAsociados: CatalogoModel[];
  asociado: CatalogoModel;
  mostraComboAsociados: boolean;

  /* Valores vehículo */
  vehiculoTipo: CatalogoModel;
  vehiculoAnio: CatalogoModel;
  vehiculoMarca: CatalogoModel;
  vehiculoDescripcion: CatalogoModel;
  itemVacio = { sDato: '', sLlave: '' };

  /* Valores cliente */
  clienteNombre: string;
  clienteMail: string;
  clienteTelefono: string;
  clienteTipoPersona: string;
  clienteCodigoPostal: string;
  clienteFechaNacimiento: FechasModel;
  clienteAviso: boolean;

  datosValidos: boolean;


// VARIABLE QUE SE MANDA PARA OBTENER EL IDPETICION
requestIdPeticion: RequestIdPeticionCotizacion={
  cotizacion: {
                 iIdCotizacion: 0,
                 FechaInicioVigencia: "06/07/2021 16:08",
                 Domicilio: {
                                 iIdUbicacion: null,
                                 sCodigoPostal: null,
                                 iIdMunicipio: null,
                                 sUbicacion: null,
                                 sMunicipio: null,
                                 iIdEstado: null,
                                 iEstadoPais: null,
                                 iClaveEstadoCepomex: null,
                                 sEstado: null,
                                 sCalle: null,
                                 sNumeroExterior: null,
                                 sNumeroInterior: null
                 },
                 Persona: {
                                 sNombre: null,
                                 sApellidoPaterno: null,
                                 sApellidoMaterno: null,
                                 sFechaNacimiento: null,
                                 sRfc: null,
                                 iEdad: null,
                                 iSexo: null,
                                 sEmail: null,
                                 sTelefono: null,
                                 iIdPais: null,
                                 sNacionalidad: null,
                                 iIdOcupacion: null,
                                 bSinoFuma: null,
                                 bSiNoPersonaMoral: null
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
               }
                 ,Sucursal: null,
                 Asociado: null,
                 Vehiculo: {
                                 iValorUnidad: null,
                                 iValorFactura: null,
                                 sTipoCarga: null,
                                 iIdTipoCarga: null,
                                 FechaFactura: null,
                                 Marca: {
                                                 iIdMarca: null,
                                                 sMarca: null
                                 },
                                 Modelo: {
                                                 iIdModelo: null,
                                                 sModelo: null
                                 },
                                 DescripcionModelo: {
                                                 iIdDescripcionModelo: null,
                                                 iIdModeloSubmarca: null,
                                                 iIdMostrar: null,
                                                 sDescripcion: null
                                 },
                                 iValorPolizaMultiAnual: null
                 },
                 Compania: null,
                 sXmls: null,
                 iIva:null,
                 iIdAseguradora: null,
                 iDescuento: null
  },
  PaqueteCoberturasApi:{
                 idPaquete:null,
                 idAseguradora:null,
                 CoberturasApi:[
                 {
                                 idCobertura:null,
                                 idTipoCobertura:null,
                                 idFactor:null
                 },
                 {
                                 idCobertura:null,
                                 idTipoCobertura:null,
                                 idFactor:null
                 },
                 {
                                 idCobertura:null,
                                 idTipoCobertura:null,
                                 idFactor:null
                 },
                 {
                                 idCobertura:null,
                                 idTipoCobertura:null,
                                 idFactor:null
                 },
                 {
                                 idCobertura:null,
                                 idTipoCobertura:null,
                                 idFactor:null
                 }
                 ]
  },
              User: "COTIZAMATICO",
              Device: "EMULATOR30X1X5X0",
              Token: "7C2C8D3B-C488-4D14-B360-6B94013A0C4E"
}




  

  ngOnInit(): void {
    const sesion = this.storageService.getJsonValue(
      Constantes.sesiones.datosSesion
    );

    if (sesion !== null && sesion !== undefined) {
      this.sesion = sesion;
    }

    this.itemVacio = { sDato: '', sLlave: '' };
    this.vehiculoTipo = this.itemVacio;
    this.vehiculoAnio = this.itemVacio;
    this.vehiculoMarca = this.itemVacio;
    this.vehiculoDescripcion = this.itemVacio;
    this.clienteNombre = '';
    this.clienteMail = '';
    this.clienteTelefono = '';
    this.clienteTipoPersona = '';
    this.clienteFechaNacimiento = { anio: '', dia: '', mes: '' };
    this.clienteCodigoPostal = '';
    this.datosValidos = false;
    this.clienteAviso = false;

    this.mostraComboAsociados = false;
    this.asociado = this.itemVacio;

    // localStorage.clear();
    // this.cookieService.removeAll();
  }

  handlerVehiculoTipo(e: CatalogoModel) {
    this.vehiculoTipo = e;
    this.ValidarDatosObligatorios();
  }

  handlerVehiculoAnio(e: CatalogoModel) {
    this.vehiculoAnio = e;
    this.ValidarDatosObligatorios();
    this.requestIdPeticion.cotizacion.Vehiculo.Modelo.sModelo= !!e ? e.sDato: null;
    this.requestIdPeticion.cotizacion.Vehiculo.Modelo.iIdModelo = !!e ? parseInt(e.sLlave,10) : null;
  }

  handlerVehiculoMarca(e: CatalogoModel) {
    this.vehiculoMarca = e;
    this.ValidarDatosObligatorios();
    this.requestIdPeticion.cotizacion.Vehiculo.Marca.iIdMarca = !!e ? parseInt(e.sLlave,10) : null;
    this.requestIdPeticion.cotizacion.Vehiculo.Marca.sMarca= !!e ? e.sDato: null;
  }
  handlerVehiculoDescripcion(e: CatalogoModel) {
    this.vehiculoDescripcion = e;
    this.ValidarDatosObligatorios();
    this.requestIdPeticion.cotizacion.Vehiculo.DescripcionModelo.iIdDescripcionModelo = !!e ? parseInt(e.sLlave,10) : null;
    this.requestIdPeticion.cotizacion.Vehiculo.DescripcionModelo.sDescripcion= !!e ? e.sDato: null;
  }

  handlerClienteNombre(e: string) {
    this.clienteNombre = e;
    this.ValidarDatosObligatorios();
    this.requestIdPeticion.cotizacion.Persona.sNombre= e;
  }

  handlerClienteMail(e: string) {
    this.clienteMail = e;
    this.ValidarDatosObligatorios();
    this.requestIdPeticion.cotizacion.Persona.sEmail=e;
  }

  handlerClienteTelefono(e: string) {
    this.clienteTelefono = e;
    this.ValidarDatosObligatorios();
    this.requestIdPeticion.cotizacion.Persona.sTelefono=parseInt(e,10);
  }

  handlerClienteTipoPersona(e: string) {
    this.clienteTipoPersona = e;
    this.ValidarDatosObligatorios();
    this.requestIdPeticion.cotizacion.Persona.bSiNoPersonaMoral= e=='Moral' ? true : false
    this.requestIdPeticion.cotizacion.Persona.iSexo= e=='Masculino' ? 1 : e=='Femenino' ? 2 : null;
  }

  handlerClienteCodigoPostal(e: string) {
    this.clienteCodigoPostal = e;
    // console.log(e);
    // console.log(this.clienteCodigoPostal)
    this.ValidarDatosObligatorios();
    this.requestIdPeticion.cotizacion.Domicilio.sCodigoPostal= parseInt(e,10);
  }

  handlerClienteFechaNacimiento(e: FechasModel) {
    this.clienteFechaNacimiento = e;
    this.ValidarDatosObligatorios();
    this.requestIdPeticion.cotizacion.Persona.sFechaNacimiento=e.dia+"/"+e.mes+"/"+ e.anio;
  }

  ValidarDatosObligatorios() {
    if (this.vehiculoTipo === this.itemVacio) {
      return (this.datosValidos = false);
    } else if (this.vehiculoAnio === this.itemVacio) {
      return (this.datosValidos = false);
    } else if (this.vehiculoMarca === this.itemVacio) {
      return (this.datosValidos = false);
    } else if (this.vehiculoDescripcion === this.itemVacio) {
      return (this.datosValidos = false);
    } else if (this.clienteNombre === '') {
      return (this.datosValidos = false);
    } else if (this.clienteMail === '') {
      return (this.datosValidos = false);
    } else if (this.clienteTelefono === '') {
      return (this.datosValidos = false);
    } else if (this.clienteTipoPersona === '') {
      return (this.datosValidos = false);
    } else {
      if (this.clienteTipoPersona !== 'Moral') {
        if (
          this.clienteFechaNacimiento.anio === '' ||
          this.clienteFechaNacimiento.dia === '' ||
          this.clienteFechaNacimiento.mes === ''
        ) {
          return (this.datosValidos = false);
        }
      }
    }
    if (this.clienteCodigoPostal === '') {
      return (this.datosValidos = false);
    }
    // console.log('validando datos - asociado');
    // if (this.mostraComboAsociados) {
    //   console.log('validando datos - asociado - si');
    //   if (this.asociado === this.itemVacio) {
    //     return;
    //   }
    // }
    return (this.datosValidos = true);
  }

  getIdPeticion(){
     this.store.dispatch( new GetIdPeticion(this.requestIdPeticion) )
  }
}
