import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable, Subscription } from 'rxjs';
import { Constantes } from '../../core/Constantes';
import { SecureStorageServiceService } from '../../core/secure-storage-service.service';
import { FechasModel } from '../../interphaces/models/Fechas.model';
import { CatalogoModel } from '../../interphaces/models/Catalogos.model';
import { RequestIdPeticionCotizacion } from 'src/app/interphaces/request/RequestIdPeticionCotizacion';
import { CotizamaticoActionsTypes, GetCotizacion, GetCotizacionResponse, GetIdPeticion , GetCoberturasporAse} from 'src/app/actions/cotizamatico.actions';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers'
import { InfovehiculoService } from 'src/app/servicios/infovehiculo.service';
import { RequestCatalogoCotizamatico } from 'src/app/interphaces/request/RequestCatalogoCotizamatico.model';
import { selectIdPeticionResponse } from 'src/app/selectors/cotizamatico.selectors';
import { RequestIdCotizacion } from 'src/app/interphaces/request/RequestIdCotizacion';
import { RequestCatalogoCoberturas } from 'src/app/interphaces/request/RequesteCatalogoCoberturas';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.css'],
})
export class Pagina1Component implements OnInit {
 
  constructor(
    private cookieService: CookieService,
    private storageService: SecureStorageServiceService,
    private store: Store<fromRoot.State>,
    private infovehiculoService: InfovehiculoService,
  ) {}

  sesion: any;
  ubicacion:any;

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

  year;
  month;
  date;

  nombresepa = new Array<string>();
  nombreNOCom: boolean;

// VARIABLE QUE SE MANDA PARA OBTENER EL IDPETICION
  requestIdPeticion: RequestIdPeticionCotizacion={
    cotizacion: {
                  iIdCotizacion: 0,
                  FechaInicioVigencia: null,
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
                },
                Sucursal: null,
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
                                  SubMarca: {
                                      iIdSubMarca: null,
                                      iIdMarcaSubramo: null,
                                      iIdMostrar: null,
                                      sSubMarca: null,
                                      bSiNoCotizamatico: null,
                                      bSiNoFlotillas: null
                                  },
                                  DescripcionModelo: {
                                                  iIdDescripcionModelo: null,
                                                  iIdModeloSubmarca: null,
                                                  iIdMostrar: null,
                                                  sDescripcion: null
                                  },
                                  iValorPolizaMultiAnual: null
                  },
                  Compania: {
                    sNombre: "AARCO",
                    sConexionCotizamatico: "Cotizamaticos",
                    sConexionDatosComunes: "AARCODatosComunes",
                    sConexion3030Net: "AARCO3030DotNet",
                    sCatalogoService: "http://192.168.211.5/AarcoCommon/CatalogoService.svc",
                    sCotizacionService: "http://192.168.211.5/AarcoCommon/CotizacionService.svc",
                    sPersonaService: "http://192.168.211.5/AarcoCommon/PersonaService.svc",
                    sEquivalenciaService: "http://192.168.211.5/AarcoCommon/EquivalenciaService.svc",
                    sLoggingService: "http://192.168.211.5/AarcoCommon/LoggingService.svc"
                },
                sXmls:null,
                  iIva: 0.0,
                  iIdAseguradora: 0,
                  iDescuento: 0.0
    },
    PaqueteCoberturasApi:{
      idPaquete:1,
      idAseguradora:null,
      CoberturasApi:null
    },
                User: "COTIZAMATICO",
                Device: "EMULATOR30X1X5X0",
                Token: "7C2C8D3B-C488-4D14-B360-6B94013A0C4E"
  }

  requestCoberAse: RequestCatalogoCoberturas={
    iIdAseguradoraSubRamo: 0,
    iIdProducto: 0,
    iIdCoberturaPorProducto: 0,
    iIdTipoValor: 0
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
    this.requestIdPeticion.cotizacion.SubRamo.iIdSubRamo = !!e ? parseInt(e.sLlave,10) : null;
    this.requestIdPeticion.cotizacion.SubRamo.sSubramo= !!e ? e.sDato: null;
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
    this.clienteNombre.trim( );
    this.ValidarDatosObligatorios();
    if (this.clienteTipoPersona !='Moral') {
      this.verificaCompletoNom(e);
    }else{
      // AQUI VA EL NOMBRE CUANDO LA PERSONA ES MORAL
      this.requestIdPeticion.cotizacion.Persona.sNombre = 'Cliente';
      this.requestIdPeticion.cotizacion.Persona.sApellidoPaterno = 'Especial';
    }
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
    if (e !='Moral') {
      this.verificaCompletoNom(this.clienteNombre);
    }else{
      // AQUI VA EL NOMBRE CUANDO LA PERSONA ES MORAL
      this.requestIdPeticion.cotizacion.Persona.sNombre = 'Cliente';
      this.requestIdPeticion.cotizacion.Persona.sApellidoPaterno = 'Especial';
    }
  }

  handlerClienteCodigoPostal(e: string) {
    this.clienteCodigoPostal = e;
    // console.log(e);
    // console.log(this.clienteCodigoPostal)
    this.ValidarDatosObligatorios();
    this.requestIdPeticion.cotizacion.Domicilio.sCodigoPostal= e;
      const req: RequestCatalogoCotizamatico = {
        Filtro: e,
        IdAplication: 2,
        NombreCatalogo: 'Sepomex',
      };
        this.infovehiculoService.getCatalogosCotizamatico(req).subscribe((data) => {
        this.ubicacion = JSON.parse(data.CatalogoJsonString);
        this.requestIdPeticion.cotizacion.Domicilio.iIdUbicacion        = parseInt(this.ubicacion[0].Ubicacion[0].iIdUbicacion,10);
        this.requestIdPeticion.cotizacion.Domicilio.iIdMunicipio        = parseInt(this.ubicacion[0].Municipio.iIdMunicipio);
        this.requestIdPeticion.cotizacion.Domicilio.sUbicacion          = this.ubicacion[0].Ubicacion[0].sUbicacion;
        this.requestIdPeticion.cotizacion.Domicilio.sMunicipio          = this.ubicacion[0].Municipio.sMunicipio;
        this.requestIdPeticion.cotizacion.Domicilio.iIdEstado           = parseInt(this.ubicacion[0].Municipio.Estado.iIdEstado,10);
        this.requestIdPeticion.cotizacion.Domicilio.iEstadoPais         = parseInt(this.ubicacion[0].Municipio.Estado.iEstadoPais,10);
        this.requestIdPeticion.cotizacion.Domicilio.iClaveEstadoCepomex = parseInt(this.ubicacion[0].Municipio.Estado.iClaveEstadoCepomex,10);
        this.requestIdPeticion.cotizacion.Domicilio.sEstado             = this.ubicacion[0].Municipio.Estado.sEstado;
        // console.log(this.ubicacion)
      });
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
    // this.store.dispatch( new GetCoberturasporAse(this.requestCoberAse.) ) 
    var today = new Date();
    this.year = today.getFullYear();
    this.date=today.getDate();
    this.month=today.getMonth()+1;
    var hour= today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
    let date=this.date+'/'+this.month+'/'+this.year+" "+hour
    this.requestIdPeticion.cotizacion.FechaInicioVigencia=date;
    
     this.store.dispatch( new GetIdPeticion(this.requestIdPeticion) )
    console.log(this.requestIdPeticion)

  }

  dividirCadena(cadenaADividir, separador) {
    this.requestIdPeticion.cotizacion.Persona.sNombre='';
    const arrayDeCadenas = cadenaADividir.split(separador);
    for (const object of arrayDeCadenas) {
      // console.log(object);
      this.nombresepa.push(object);
    }
    // console.log(this.nombresepa.length);
    let tamanoNombre=this.nombresepa.length
    let petinombre='';
    
    let index=0
    do {
      const element = this.nombresepa[index];
      petinombre += element
      petinombre = petinombre+' '
      index+=1
    } while (index<tamanoNombre-2);
    this.requestIdPeticion.cotizacion.Persona.sApellidoMaterno = this.nombresepa[tamanoNombre-2]
    this.requestIdPeticion.cotizacion.Persona.sApellidoPaterno = this.nombresepa[tamanoNombre-1]
    this.requestIdPeticion.cotizacion.Persona.sNombre=petinombre

   
  }

  verificaCompletoNom(cnam: string) {
    if (cnam === '') {
      return (this.nombreNOCom = false);
    } else {
      let ArrayEmparejamientos = {};
      const reg = /(([A-Za-záéíóúÁÉÍÓÚ])\w+(\s)){2,}(([A-Za-záéíóúÁÉÍÓÚ]+\w)\s?)/;
      ArrayEmparejamientos = cnam.match(reg);
      this.nombreNOCom = reg.test(cnam);
      if (this.nombreNOCom) {
        this.dividirCadena(cnam, ' ');
      } else {
         this.requestIdPeticion.cotizacion.Persona.sNombre = 'Cliente';
         this.requestIdPeticion.cotizacion.Persona.sApellidoPaterno = 'Especial';
      }
    }
  }
}
