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
import {requestIdPeticion} from 'src/app/interphaces/requesIdPeticionCotizzacion';
import { selectSesion } from 'src/app/selectors/login.selectors';
import { Session } from 'inspector';
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

  sesionByJson: Observable<any>;
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
  edad: number;
  age:number;
 
  nombresepa = new Array<string>();
  nombreNOCom: boolean;

  


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
    this.sesionByJson = this.store.select(selectSesion)
    this.sesionByJson.subscribe(sesion => {
      console.log(sesion);
      // requestIdPeticion.cotizacion.Credencial.IdCredential=parseInt(sesion.IdCredential,10) ;
      // requestIdPeticion.cotizacion.Credencial.IdProfile=parseInt(sesion.Profiles[0].IdProfile,10) ; 
    })
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
    requestIdPeticion.cotizacion.SubRamo.iIdSubRamo = !!e ? parseInt(e.sLlave,10) : null;
    requestIdPeticion.cotizacion.SubRamo.sSubramo= !!e ? e.sDato: null;
  }

  handlerVehiculoAnio(e: CatalogoModel) {
    this.vehiculoAnio = e;
    this.ValidarDatosObligatorios();
    requestIdPeticion.cotizacion.Vehiculo.Modelo.sModelo= !!e ? e.sDato: null;
    requestIdPeticion.cotizacion.Vehiculo.Modelo.iIdModelo = !!e ? parseInt(e.sLlave,10) : null;
  }

  handlerVehiculoMarca(e: CatalogoModel) {
    this.vehiculoMarca = e;
    this.ValidarDatosObligatorios();
    requestIdPeticion.cotizacion.Vehiculo.Marca.iIdMarca = !!e ? parseInt(e.sLlave,10) : null;
    requestIdPeticion.cotizacion.Vehiculo.Marca.sMarca= !!e ? e.sDato: null;
  }
  handlerVehiculoDescripcion(e: CatalogoModel) {
    this.vehiculoDescripcion = e;
    this.ValidarDatosObligatorios();
    requestIdPeticion.cotizacion.Vehiculo.DescripcionModelo.iIdDescripcionModelo = !!e ? parseInt(e.sLlave,10) : null;
    requestIdPeticion.cotizacion.Vehiculo.DescripcionModelo.sDescripcion= !!e ? e.sDato: null;
  }

  handlerClienteNombre(e: string) {
    this.clienteNombre = e;
    this.clienteNombre.trim( );
    this.ValidarDatosObligatorios();
    if (this.clienteTipoPersona !='Moral') {
      this.verificaCompletoNom(e);
    }else{
      // AQUI VA EL NOMBRE CUANDO LA PERSONA ES MORAL
      requestIdPeticion.cotizacion.Persona.sNombre = 'Cliente';
      requestIdPeticion.cotizacion.Persona.sApellidoPaterno = 'Especial';
    }
  }

  handlerClienteMail(e: string) {
    this.clienteMail = e;
    this.ValidarDatosObligatorios();
    requestIdPeticion.cotizacion.Persona.sEmail=e;
  }

  handlerClienteTelefono(e: string) {
    this.clienteTelefono = e;
    this.ValidarDatosObligatorios();
    requestIdPeticion.cotizacion.Persona.sTelefono=e;
  }

  handlerClienteTipoPersona(e: string) {
    this.clienteTipoPersona = e;
    this.ValidarDatosObligatorios();
    requestIdPeticion.cotizacion.Persona.bSiNoPersonaMoral= e=='Moral' ? true : false
    requestIdPeticion.cotizacion.Persona.iSexo= e=='Masculino' ? 1 : e=='Femenino' ? 2 : null;
  }

  handlerClienteCodigoPostal(e: string) {
    this.clienteCodigoPostal = e;
    // console.log(e);
    // console.log(this.clienteCodigoPostal)
    this.ValidarDatosObligatorios();
    requestIdPeticion.cotizacion.Domicilio.sCodigoPostal= e;
      const req: RequestCatalogoCotizamatico = {
        Filtro: e,
        IdAplication: 2,
        NombreCatalogo: 'Sepomex',
      };
        this.infovehiculoService.getCatalogosCotizamatico(req).subscribe((data) => {
        this.ubicacion = JSON.parse(data.CatalogoJsonString);
        requestIdPeticion.cotizacion.Domicilio.iIdUbicacion        = parseInt(this.ubicacion[0].Ubicacion[0].iIdUbicacion,10);
        requestIdPeticion.cotizacion.Domicilio.iIdMunicipio        = parseInt(this.ubicacion[0].Municipio.iIdMunicipio);
        requestIdPeticion.cotizacion.Domicilio.sUbicacion          = this.ubicacion[0].Ubicacion[0].sUbicacion;
        requestIdPeticion.cotizacion.Domicilio.sMunicipio          = this.ubicacion[0].Municipio.sMunicipio;
        requestIdPeticion.cotizacion.Domicilio.iIdEstado           = parseInt(this.ubicacion[0].Municipio.Estado.iIdEstado,10);
        requestIdPeticion.cotizacion.Domicilio.sEstado             = this.ubicacion[0].Municipio.Estado.sEstado;
        requestIdPeticion.cotizacion.Domicilio.iEstadoPais         = parseInt(this.ubicacion[0].Municipio.Estado.iEstadoPais,10);
        requestIdPeticion.cotizacion.Domicilio.iClaveEstadoCepomex = parseInt(this.ubicacion[0].Municipio.Estado.iClaveEstadoCepomex,10);
        requestIdPeticion.cotizacion.Persona.iIdPais             = parseInt(this.ubicacion[0].Municipio.Estado.iEstadoPais,10);
        // console.log(this.ubicacion)
      });
  }

  handlerClienteFechaNacimiento(e: FechasModel) {
    this.clienteFechaNacimiento = e;
    this.ValidarDatosObligatorios();
    requestIdPeticion.cotizacion.Persona.sRfc="XXXXAAMMDD000";
    requestIdPeticion.cotizacion.Persona.sFechaNacimiento=e.dia+"/"+e.mes+"/"+ e.anio;
    var today = new Date();
    this.year = today.getFullYear();
    this.date=today.getDate();
    this.month=today.getMonth()+1;
    switch (e.mes) {
        case 'Enero':
          this.age=1;
        break;
        case 'Febrero ':
          this.age=2;
        break;
        case 'Marzo':
          this.age=3;
        break;
        case 'Abril':
          this.age=4;
        break;
        case 'Mayo':
          this.age=5;
        break;
        case 'Junio':
          this.age=6;
        break;
        case 'Julio':
          this.age=7;
        break;
        case 'Agosto':
          this.age=8;
        break;
        case 'Septiembre':
          this.age=9;
        break;
        case 'Octubre':
          this.age=10;
        break;
        case 'Noviembre':
          this.age=11;
        break;
        case 'Diciembre':
          this.age=12;
        break;
        default: ''
          break;
      }
      if (this.age <= parseInt(this.month,10)  ) {
        let age1 = (parseInt(this.year,10) - parseInt(this.clienteFechaNacimiento.anio,10));
        requestIdPeticion.cotizacion.Persona.iEdad = age1;
      } else {
        let age2= parseInt(this.year,10) - parseInt(this.clienteFechaNacimiento.anio,10)- 1;
        requestIdPeticion.cotizacion.Persona.iEdad = age2;
      } 
// // para generar rfc
//       if (this.age<10 && parseInt(e.dia,10)<10) {
//         requestIdPeticion.cotizacion.Persona.sRfc='XXXX' + e.anio + '0' + this.age + '0' + e.dia + 'XXX';
//       } 
//       if (this.age<10 && parseInt(e.dia,10)>=10) {
//         requestIdPeticion.cotizacion.Persona.sRfc='XXXX' + e.anio + '0' + this.age + e.dia + 'XXX'
//       }
//       if (this.age>=10 && parseInt(e.dia,10)<10) {
//         requestIdPeticion.cotizacion.Persona.sRfc='XXXX' + e.anio  + this.age + '0' + e.dia + 'XXX';
//       } 
//       if (this.age>=10 && parseInt(e.dia,10)>=10) {
//         requestIdPeticion.cotizacion.Persona.sRfc='XXXX' + e.anio  + this.age + e.dia + 'XXX'
//       }
      
       
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
    requestIdPeticion.cotizacion.FechaInicioVigencia=date;
    requestIdPeticion.cotizacion.Persona.bSinoFuma=false;
     this.store.dispatch( new GetIdPeticion(requestIdPeticion) )
    console.log(requestIdPeticion)
  }

  dividirCadena(cadenaADividir, separador) {
    requestIdPeticion.cotizacion.Persona.sNombre='';
    const arrayDeCadenas = cadenaADividir.split(separador);
    for (const object of arrayDeCadenas) {
      // console.log(object);
      this.nombresepa.push(object);
    }
    // console.log(this.nombresepa.length);
    let tamanoNombre=this.nombresepa.length
    let petinombre='';
    // let index=0
    // do {
    //   const element = this.nombresepa[index];
    //   petinombre += element
    //   petinombre = petinombre+' '
    //   index+=1
    //   console.log(petinombre);
    // } while (index<tamanoNombre-1);
    for (let index = 0; index <tamanoNombre-2; index++) {
      const element = this.nombresepa[index];
      petinombre += element
      petinombre = petinombre+' '
      console.log(petinombre);
    }
    requestIdPeticion.cotizacion.Persona.sApellidoMaterno = this.nombresepa[tamanoNombre-2]
    requestIdPeticion.cotizacion.Persona.sApellidoPaterno = this.nombresepa[tamanoNombre-1]
    requestIdPeticion.cotizacion.Persona.sNombre=petinombre

   
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
         requestIdPeticion.cotizacion.Persona.sNombre = 'Cliente';
         requestIdPeticion.cotizacion.Persona.sApellidoPaterno = 'Especial';
      }
    }
  }

  
}
