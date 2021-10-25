import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogoModel } from '../../interphaces/models/Catalogos.model';
import { FechasModel } from 'src/app/interphaces/models/Fechas.model';
import { Aseguradoras } from 'src/app/interphaces/models/Aseguradoras.model';
import { InfovehiculoService } from '../../servicios/infovehiculo.service';
import AseguradoraCobJson from '../../seeds/asegcob.json';
import AseguradoraJson from '../../interphaces/aseguradoras';
import AseguradoraCobJ from '../../interphaces/aseguradoracob';
import {selectCotizacionResponse, selectIdPeticionResponse} from '../../selectors/cotizamatico.selectors';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { CotizamaticoActionsTypes, GetCotizacion, GetCotizacionResponse, GetIdPeticion, ModificarVehiculo } from 'src/app/actions/cotizamatico.actions';
import { RequestIdCotizacion } from 'src/app/interphaces/request/RequestIdCotizacion';
import {RequestIdPeticionCotizacion  } from 'src/app/interphaces/request/RequestIdPeticionCotizacion';

import{ResponseIdCotizacion} from 'src/app/interphaces/response/ResponseIdCotizacion';
import { Observable } from 'rxjs';
import { selectMarca, selectDescripcion, selectModelo, selectTipo } from 'src/app/selectors/cotizamatico.selectors';
import { map, take } from 'rxjs/Operators';
import {requestIdPeticion} from 'src/app/interphaces/requesIdPeticionCotizzacion';
import {PaqueteCoberturasApi} from '../../interphaces/paqueteCoberturasAPI';
@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.component.html',
  styleUrls: ['./pagina2.component.css'],
})
export class Pagina2Component implements OnInit {
constructor(
    private route: ActivatedRoute,
    private infovehiculoService: InfovehiculoService,
    private store: Store<fromRoot.State>,

  ) {}
  itemVacio = { sDato: '', sLlave: '' };
  AseguradorasPoDesc: Aseguradoras[] = [];
  Aseguradoras: Aseguradoras[] = [];
  aseguradora: string;
  pago = 'Anual';
  poliza = 'Amplia';
  robototal = 0;
  cobertura: number = 1;
  array: AseguradoraCobJ[] = [];
  // VARIABLE DE LA QUE DEPENDE EDITAR DATOS
  show = false;
  // Variables a las que asigno datos de pagina1
  vermodelo$: Observable<any>;
  vermarca$: Observable<any>;
  verdescripcion$: Observable<any>;
  veranno$: Observable<any>;
  nombre: any;
  email: any;
  telefono: any;
  genero: any;
  codigopostal: any;
  fechanac: FechasModel;
  // Valores botón tipo de cobertura
  ampliaplus = false;
  amplia = false;
  limitada = false;
  basica = false;
  statusAP = 'NoSelected';
  statusA = 'NoSelected';
  statusL = 'NoSelected';
  statusB = 'NoSelected';
  width: any;
  una: any;
  // Valores botón descuento
  descALTO = false;
  descMEDIO = false;
  descBAJO = false;
  statusDA = 'NoSelected';
  statusDM = 'NoSelected';
  statusDB = 'NoSelected';
  // Valores del botones tipo de pago
  mensual = false;
  trimestral = false;
  semestral = false;
  anual = false;
  statusM = 'NoSelected';
  statusT = 'NoSelected';
  statusS = 'NoSelected';
  statusAn = 'NoSelected';
  noBasica=0;
  siBasica=0;
  // Valores del switch
  as: boolean;
  des: boolean;
  erc: boolean;
  rcext: boolean;
  rcocu: boolean;
  // VARIABLES PARA EVENT EMITTER
  modelo: CatalogoModel;
  marca: CatalogoModel;
  descripcion: CatalogoModel;
  anno: CatalogoModel;
  //VARIABLES INPUT DE COMPONENTE COBERTURAS
  @Output() emitFormaPago = new EventEmitter<string>();
  cobDamage: number;
  cobtothe : number;
  Damage: number;
  totalTheft: number;     
  civilLiability : number;
  medicalExpenses: number;
  driverAccident : number;
  ocuppantsLiability: number;
  requestIdCotizacion: RequestIdCotizacion={
    User: "COTIZAMATICO",
    Device: "EMULATOR30X1X5X0",
    Token: "7C2C8D3B-C488-4D14-B360-6B94013A0C4E",
    IdPeticion: null
  }
  responseCotizacionJSON =new Array
  ngOnInit(): void {
      this.store.select(selectIdPeticionResponse).subscribe(id=>{
        console.log(id.iDPeticion);
        if(id.iDPeticion === null) return
      this.requestIdCotizacion.IdPeticion = id.iDPeticion;
      this.store.dispatch(new GetCotizacion(this.requestIdCotizacion));
    });
    this.store.select(selectCotizacionResponse).subscribe(res => 
      {
        if(!res.jsonCotizacion.length&& res.idCotizacion!=1) 
        {
          return
        } else{
            this.responseCotizacionJSON=[];
          //   res.jsonCotizacion.forEach(element => {
          //   let json=JSON.parse(element)
          //   this.responseCotizacionJSON.push(json)
          // });
          for (let index = 0; index < res.jsonCotizacion.length; index++) {
            const element = JSON.parse(res.jsonCotizacion[index]);
            this.responseCotizacionJSON.push(element);
          }
          // OBTIENE EL IDPRODUCTO DE PRECIOCOTIZACION POR CADA this.Aseguradora Y DESHABILITAR BOTON BASICA
          console.log(this.responseCotizacionJSON);
          this.siBasica=0;
          this.noBasica=0;
          for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
            const for1 = this.responseCotizacionJSON[index].PrecioCotizacion;
            for (let index = 0; index < for1.length; index++) {
              const for2 = for1[index].IdProducto;
              if (for2<=3) {
                    this.noBasica+=1;
                  }else{
                    this.siBasica+=1;
                  }
            }
          }
          console.log(this.noBasica,this.siBasica);
        }
      })
    
    this.vermodelo$ = this.store.select(selectTipo)
    this.veranno$ = this.store.select(selectModelo)
    this.vermarca$ = this.store.select(selectMarca)
    this.verdescripcion$ = this.store.select(selectDescripcion)
    this.verdescripcion$.subscribe(desc => {
      // console.log(desc)

    })
    // this.Aseguradoras = this.getAsePorDescrip(this.verdescripcion$);
    // console.log(this.Aseguradoras);
    this.nombre = history.state.namease;
    // console.log(this.nombre);
    this.email = history.state.emailase;
    this.telefono = history.state.phonease;
    this.genero = history.state.tipoperase;
    this.codigopostal = history.state.cpase;
    // console.log(this.codigopostal);
    this.fechanac = history.state.fechanacase;
    this.amplia = true;
    this.descMEDIO = true;
    this.anual = true;
    this.cobtothe= 10;
    this.cobDamage = 5 ;
    this.una = history.state.sizeta;
  } // init

  // Funciones cobertura
  Ampliaplus() {
    // tiene selected this.statusAP
    this.ampliaplus = !this.ampliaplus;
    this.amplia = false;
    this.limitada = false;
    this.basica = false;
    this.statusA = 'NoSelected';
    this.statusL = 'NoSelected';
    this.statusB = 'NoSelected';
    this.statusAP = this.ampliaplus ? 'Selected' : 'NoSelected';
    this.cobertura = 0;
    this.cobDamage = 3;
    this.cobtothe = 5 ;
    this.poliza ="Amplia Plus";
    requestIdPeticion.PaqueteCoberturasApi.splice(0,requestIdPeticion.PaqueteCoberturasApi.length);
    // console.log("Amplia Plus:"+' '+this.ampliaplus+' '+this.statusAP)
    // console.log("Amplia :"+' '+this.amplia+' '+this.statusA)
    // console.log("Limitada :"+' '+this.limitada+' '+this.statusL)
    // console.log("Básica :"+' '+this.basica+' '+this.statusB)
  }
  Amplia() {
    // tiene selected this.statusA
    this.amplia = !this.amplia;
    this.ampliaplus = false;
    this.limitada = false;
    this.basica = false;
    this.statusAP = 'NoSelected';
    this.statusL = 'NoSelected';
    this.statusB = 'NoSelected';
    this.statusA = this.amplia ? 'Selected' : 'NoSelected';
    this.cobertura = 1;
    this.cobDamage = 5;
    this.cobtothe = 10 ;
    this.poliza ="Amplia";
    requestIdPeticion.PaqueteCoberturasApi.splice(0,requestIdPeticion.PaqueteCoberturasApi.length);
    // console.log("Amplia :"+' '+this.amplia+' '+this.statusA)
    // console.log("Amplia Plus:"+' '+this.ampliaplus+' '+this.statusAP)
    // console.log("Limitada :"+' '+this.limitada+' '+this.statusL)
    // console.log("Básica :"+' '+this.basica+' '+this.statusB)
  }
  Limitada() {
    // tiene selected this.statusL
    this.limitada = !this.limitada;
    this.ampliaplus = false;
    this.amplia = false;
    this.basica = false;
    this.statusAP = 'NoSelected';
    this.statusA = 'NoSelected';
    this.statusB = 'NoSelected';
    this.statusL = this.limitada ? 'Selected' : 'NoSelected';
    this.cobertura = 2;
    this.poliza ="Limitada";
    requestIdPeticion.PaqueteCoberturasApi.splice(0,requestIdPeticion.PaqueteCoberturasApi.length);
    // console.log("Limitada :"+' '+this.limitada+' '+this.statusL)
    // console.log("Amplia Plus:"+' '+this.ampliaplus+' '+this.statusAP)
    // console.log("Amplia :"+' '+this.amplia+' '+this.statusA)
    // console.log("Básica :"+' '+this.basica+' '+this.statusB)
  }
  Basica() {
    // tiene selected this.statusB
    this.basica = !this.basica;
    this.ampliaplus = false;
    this.amplia = false;
    this.limitada = false;
    this.statusAP = 'NoSelected';
    this.statusA = 'NoSelected';
    this.statusL = 'NoSelected';
    this.statusB = this.basica ? 'Selected' : 'NoSelected';
    this.cobertura = 3;
    this.poliza ="Básica";
    requestIdPeticion.PaqueteCoberturasApi.splice(0,requestIdPeticion.PaqueteCoberturasApi.length);
    // this.store.select(selectCotizacionResponse).subscribe(res => 
    //   {
    //     if(!res.jsonCotizacion.length&& res.idCotizacion!=1) 
    //     {
    //       return
    //     } else{
    //         this.responseCotizacionJSON=[];
    //       for (let index = 0; index < res.jsonCotizacion.length; index++) {
    //         const element = JSON.parse(res.jsonCotizacion[index]);
    //         this.responseCotizacionJSON.push(element);
    //       }
    //       console.log(this.responseCotizacionJSON);
    //     }
    //   })
     
        

    // console.log("Básica :"+' '+this.basica+' '+this.statusB)
    // console.log("Amplia Plus:"+' '+this.ampliaplus+' '+this.statusAP)
    // console.log("Amplia :"+' '+this.amplia+' '+this.statusA)
    // console.log("Limitada :"+' '+this.limitada+' '+this.statusL)
  }
  // Función para select versión repsonsiva
  ChangePoliza(){
    // Limpia variables NoResponsiva
    this.ampliaplus =false;
    this.amplia     =false;
    this.limitada   =false;
    this.basica     =false;
    this.cobertura=undefined;
    requestIdPeticion.PaqueteCoberturasApi.splice(0,requestIdPeticion.PaqueteCoberturasApi.length);
    if (this.poliza=='Amplia Plus') {
      this.cobDamage = 3;
      this.cobtothe = 5 ;
    } else if(this.poliza=='Amplia'){
      this.cobDamage = 5;
      this.cobtothe = 10 ;
    }
  }
  ChangePago(){
    // Limpia variables NoResponsiva
    this.semestral  =false;
    this.trimestral =false;
    this.anual      =false;
    this.mensual    =false;
  }
  // Funciones descuento
  Descuentoalto() {
    // tiene selected this.statusDA
    this.descALTO = !this.descALTO;
    this.descMEDIO = false;
    this.statusDM = 'NoSelected';
    this.descBAJO = false;
    this.statusDB = 'NoSelected';
    this.statusDA = this.descALTO ? 'Selected' : 'NoSelected';
    // console.log("Descuento Alto:"+' '+this.descALTO+' '+this.statusDA)
    // console.log("Descuento Medio :"+' '+this.descMEDIO+' '+this.statusDM)
    // console.log("Descuento Bajo :"+' '+this.descBAJO+' '+this.statusDB)
  }
  Descuentomedio() {
    // tiene selected this.statusDM
    this.descMEDIO = !this.descMEDIO;
    this.descALTO = false;
    this.statusDA = 'NoSelected';
    this.descBAJO = false;
    this.statusDB = 'NoSelected';
    this.statusDM = this.descMEDIO ? 'Selected' : 'NoSelected';
    // console.log("Descuento Medio :"+' '+this.descMEDIO+' '+this.statusDM)
  }
  Descuentobajo() {
    // tiene selected this.statusDB
    this.descBAJO = !this.descBAJO;
    this.descALTO = false;
    this.statusDA = 'NoSelected';
    this.descMEDIO = false;
    this.statusDM = 'NoSelected';
    this.statusDB = this.descBAJO ? 'Selected' : 'NoSelected';
    // console.log("Descuento Bajo :"+' '+this.descBAJO+' '+this.statusDB)
  }
  // Funciones pago
  Mensual() {
    // tiene selected this.statusM
    this.mensual = !this.mensual;
    this.trimestral = false;
    this.semestral = false;
    this.anual = false;
    this.statusT = 'NoSelected';
    this.statusS = 'NoSelected';
    this.statusAn = 'NoSelected';
    this.statusM = this.mensual ? 'Selected' : 'NoSelected';
    // console.log("Mensual:"+' '+this.mensual+' '+this.statusM)
    // console.log("Trimestral :"+' '+this.trimestral+' '+this.statusT)
    // console.log("Semestral :"+' '+this.semestral+' '+this.statusS)
    // console.log("Anual :"+' '+this.anual+' '+this.statusAn)
    // this.emitFormaPago(  'Mensual' );
    this.pago = 'Mensual';
  }
  Trimestral() {
    // tiene selected this.statusT
    this.trimestral = !this.trimestral;
    this.mensual = false;
    this.semestral = false;
    this.anual = false;
    this.statusM = 'NoSelected';
    this.statusS = 'NoSelected';
    this.statusAn = 'NoSelected';
    this.statusT = this.trimestral ? 'Selected' : 'NoSelected';
    // console.log("Trimestral :"+' '+this.trimestral+' '+this.statusT)
    // console.log("Mensual:"+' '+this.mensual+' '+this.statusM)
    // console.log("Semestral :"+' '+this.semestral+' '+this.statusS)
    // console.log("Anual :"+' '+this.anual+' '+this.statusAn)
    // this.emitFormaPago( 'Trimestral' );
    this.pago = 'Trimestral';
    // console.log(this.emitFormaPago);
  }
  Semestral() {
    // tiene selected this.statusS
    this.semestral = !this.semestral;
    this.mensual = false;
    this.trimestral = false;
    this.anual = false;
    this.statusM = 'NoSelected';
    this.statusT = 'NoSelected';
    this.statusAn = 'NoSelected';
    this.statusS = this.semestral ? 'Selected' : 'NoSelected';
    // console.log("Semestral :"+' '+this.semestral+' '+this.statusS)
    // console.log("Trimestral :"+' '+this.trimestral+' '+this.statusT)
    // console.log("Mensual:"+' '+this.mensual+' '+this.statusM)
    // console.log("Anual :"+' '+this.anual+' '+this.statusAn)
    // this.emitFormaPago( 'Semestral' );
    this.pago = 'Semestral';
  }
  Anual() {
    // tiene selected this.statusAn
    this.anual = !this.anual;
    this.mensual = false;
    this.trimestral = false;
    this.semestral = false;
    this.statusM = 'NoSelected';
    this.statusT = 'NoSelected';
    this.statusS = 'NoSelected';
    this.statusAn = this.anual ? 'Selected' : 'NoSelected';
    // console.log("Anual :"+' '+this.anual+' '+this.statusAn)
    // console.log("Trimestral :"+' '+this.trimestral+' '+this.statusT)
    // console.log("Mensual:"+' '+this.mensual+' '+this.statusM)
    // console.log("Semestral :"+' '+this.semestral+' '+this.statusS)
    // this.emitFormaPago( 'Anual');
    this.pago = 'Anual';
  }

  toggle() {
    this.show = !this.show;
  }
  // DanMaterial(e) {
  //   this.robototal = e;
  //   console.log(this.robototal);
  // }
  guarda() {
    this.store.dispatch(new ModificarVehiculo({
      modelo: {
        sLlave: this.anno.sLlave,
        sDato: this.anno.sDato
      },
      marca: {
        sLlave: this.marca.sLlave,
        sDato: this.marca.sDato
      },
      descripcion: {
        sLlave: this.descripcion.sLlave,
        sDato: this.descripcion.sDato
      },
      tipo: {
        sLlave: this.modelo.sLlave,
        sDato: this.modelo.sDato
      }

    }))


    requestIdPeticion.cotizacion.Vehiculo.DescripcionModelo.sDescripcion= this.descripcion.sDato
    requestIdPeticion.cotizacion.Vehiculo.DescripcionModelo.iIdDescripcionModelo =parseInt(this.descripcion.sLlave,10) 
    requestIdPeticion.cotizacion.Vehiculo.Modelo.iIdModelo= parseInt(this.anno.sLlave,10) 
    requestIdPeticion.cotizacion.Vehiculo.Modelo.sModelo=this.anno.sDato
    requestIdPeticion.cotizacion.Vehiculo.Marca.iIdMarca=parseInt(this.marca.sLlave,10) 
    requestIdPeticion.cotizacion.Vehiculo.Marca.sMarca=this.marca.sDato
    requestIdPeticion.cotizacion.SubRamo.sSubramo=this.modelo.sDato
    requestIdPeticion.cotizacion.SubRamo.iIdSubRamo=parseInt(this.modelo.sLlave,10) 

    this.store.dispatch( new GetIdPeticion(requestIdPeticion) )
   
    setTimeout(()=>
      {
          this.store.select(selectIdPeticionResponse).pipe(take(1)).subscribe(
          selectCotizacionResponse=>{
            this.requestIdCotizacion.IdPeticion= selectCotizacionResponse.iDPeticion
            return this.store.dispatch( new GetCotizacion(this.requestIdCotizacion) )
          })
      },9000)
    
    this.show = false;
    
    
    //this.vermodelo.sDato = this.modelo.sDato;
    // this.vermarca.sDato = this.marca.sDato;
    // this.veranno.sDato = this.anno.sDato;
    // this.verdescripcion.sDato = this.descripcion.sDato;
    // this.Aseguradoras = [];
    // this.Aseguradoras = this.getAsePorDescrip(this.descripcion.sLlave);
    // console.log(this.vermodelo+' '+this.vermarca+' '+this.verdescripcion+' '+this.veranno)
    
  }
  // FUNCIONES EVENT EMITTER DE INFOVEHICULO
  emitTipoVehiculo(e) {
    // console.log(e);
    this.modelo = e;
  }
  emitAnioVehiculo(e) {
    // console.log(e);
    this.anno = e;
  }
  emitMarcaVehiculo(e) {
    // console.log(e);
    this.marca = e;
  }
  emitDescripcion(e) {
    // console.log(e);
    this.descripcion = e;
  }

  handlerOptionsDamage(e: number) {
   this.Damage=e;
   requestIdPeticion.PaqueteCoberturasApi.splice(0,requestIdPeticion.PaqueteCoberturasApi.length);
   if (this.poliza=='Amplia'|| this.amplia) {
    for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
      let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora,10);
      console.log(element)
      switch (element) {
            // case 1  :
            // break;
            case 2  :
              requestIdPeticion.PaqueteCoberturasApi.push({
                    idPaquete:1,
                    idAseguradora:2,
                    CoberturasApi: [{
                    idCobertura: 1,       //cobertura por producto
                    idTipoCobertura:2,    //suma asegurada o deducible
                    idFactor:e
                  }]
              })
            break;
            case 4  :
              requestIdPeticion.PaqueteCoberturasApi.push({
                idPaquete:1,
                idAseguradora:4,
                CoberturasApi: [{
                  idCobertura: 226,       //cobertura por producto
                  idTipoCobertura:2,    //suma asegurada o deducible
                  idFactor:e 
                }]
              })
            break;
            case 5  :
              requestIdPeticion.PaqueteCoberturasApi.push({
                idPaquete:1,
                idAseguradora:5,
                CoberturasApi: [{
                  idCobertura: 264,       //cobertura por producto
                  idTipoCobertura:2,    //suma asegurada o deducible
                  idFactor:e 
                }]
              })
            break;
            // case 6  :
            // break;
            // case 26	:
            // break;
            case 27	:
              requestIdPeticion.PaqueteCoberturasApi.push({
                idPaquete:1,
                idAseguradora:27,
                CoberturasApi: [{
                  idCobertura: 113,       //cobertura por producto
                  idTipoCobertura:2,    //suma asegurada o deducible
                  idFactor:e 
                }]
              })
            break;
            // case 450:
            // break;
            case 494:
                  requestIdPeticion.PaqueteCoberturasApi.push({
                    idPaquete:1,
                    idAseguradora:494,
                    CoberturasApi: [{
                      idCobertura: 1791,       //cobertura por producto
                      idTipoCobertura:2,    //suma asegurada o deducible
                      idFactor:e 
                    }]
                  })
            break;
            case 553:
              requestIdPeticion.PaqueteCoberturasApi.push({
                idPaquete:1,
                idAseguradora:553,
                CoberturasApi: [{
                  idCobertura: 1887,       //cobertura por producto
                  idTipoCobertura:2,    //suma asegurada o deducible
                  idFactor:e 
                }]
              })
            break;
            default:  
              requestIdPeticion.PaqueteCoberturasApi.push({
                idPaquete:1,
                idAseguradora:element,
                CoberturasApi: [{
                  idCobertura: null,       //cobertura por producto
                  idTipoCobertura:null,    //suma asegurada o deducible
                  idFactor:null
                }]
              })
            break;
      }
    }
    for (let index = 0; index < requestIdPeticion.PaqueteCoberturasApi.length; index++) {
      let newPaqueteCoberturasAPI = requestIdPeticion.PaqueteCoberturasApi[index];
      console.log(newPaqueteCoberturasAPI)
      let ob = {...newPaqueteCoberturasAPI, ...newPaqueteCoberturasAPI} ;
      console.log(newPaqueteCoberturasAPI)
      console.log(ob)
    }
   } 
   if (this.poliza=='Amplia Plus'|| this.ampliaplus) {
    for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
      let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora,10);
      // switch (element) {
      //           // case 1  :
      //           // break;
      //       case 2:
      //           requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
      //                {
      //               idCobertura: 12, //cobertura por producto
      //               idTipoCobertura: 2, //suma asegurada o deducible
      //               idFactor: e
      //           })
      //           requestIdPeticion.PaqueteCoberturasApi = {
      //               ...requestIdPeticion.PaqueteCoberturasApi,
      //               idPaquete: 2,
      //               idAseguradora: null,
      //               CoberturasApi: [
      //                   ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
      //               ]
      //           }
      //           break;
      //       case 4:
      //           requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
      //             {
      //               idCobertura: 237	, //cobertura por producto
      //               idTipoCobertura: 2, //suma asegurada o deducible
      //               idFactor: e
      //           })
      //           requestIdPeticion.PaqueteCoberturasApi = {
      //               ...requestIdPeticion.PaqueteCoberturasApi,
      //               idPaquete: 2,
      //               idAseguradora: null,
      //               CoberturasApi: [
      //                   ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
      //               ]
      //           }
      //           break;
      //       case 5:
      //           requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
      //                {
      //               idCobertura: 275, //cobertura por producto
      //               idTipoCobertura: 2, //suma asegurada o deducible
      //               idFactor: e
      //           })
      //           requestIdPeticion.PaqueteCoberturasApi = {
      //               ...requestIdPeticion.PaqueteCoberturasApi,
      //               idPaquete: 2,
      //               idAseguradora: null,
      //               CoberturasApi: [
      //                   ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
      //               ]
      //           }
      //           break;
      //           // case 6  :
      //           // break;
      //           // case 26	:
      //           // break;
      //       case 27:
      //           requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
      //                {
      //               idCobertura: 124, //cobertura por producto
      //               idTipoCobertura: 2, //suma asegurada o deducible
      //               idFactor: e
      //           })
      //           requestIdPeticion.PaqueteCoberturasApi = {
      //               ...requestIdPeticion.PaqueteCoberturasApi,
      //               idPaquete: 2,
      //               idAseguradora: null,
      //               CoberturasApi: [
      //                   ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
      //               ]
      //           }
      //           break;
      //           // case 450:
      //           // break;
      //       case 494:
      //           requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
      //                {
      //               idCobertura: 1776, //cobertura por producto
      //               idTipoCobertura: 2, //suma asegurada o deducible
      //               idFactor: e
      //           })
      //           requestIdPeticion.PaqueteCoberturasApi = {
      //               ...requestIdPeticion.PaqueteCoberturasApi,
      //               idPaquete: 2,
      //               idAseguradora: null,
      //               CoberturasApi: [
      //                   ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
      //               ]
      //           }
      //           break;
      //       case 553:
      //           requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
      //                {
      //               idCobertura: 1870, //cobertura por producto
      //               idTipoCobertura: 2, //suma asegurada o deducible
      //               idFactor: e
      //           })
      //           requestIdPeticion.PaqueteCoberturasApi = {
      //               ...requestIdPeticion.PaqueteCoberturasApi,
      //               idPaquete: 2,
      //               idAseguradora: null,
      //               CoberturasApi: [
      //                   ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
      //               ]
      //           }
      //           break;
      //       default:
      //         requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
              
      //           {
      //             idCobertura: null,       //cobertura por producto
      //             idTipoCobertura:null,    //suma asegurada o deducible
      //             idFactor:null 
      //           }
      //           )
      //         requestIdPeticion.PaqueteCoberturasApi={
      //           ...requestIdPeticion.PaqueteCoberturasApi,
      //           idPaquete:2,
      //           idAseguradora:null,
      //           CoberturasApi: [
      //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
      //           ]
      //         }
      //       break;
      // }
    }  
   } 
   console.log(requestIdPeticion)
  }

  handlerOptionstotalTheft(e: number) {
    this.totalTheft=e; 
    requestIdPeticion.PaqueteCoberturasApi.splice(0,requestIdPeticion.PaqueteCoberturasApi.length);
    if (this.poliza == 'Amplia' || this.amplia) {
      for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
          let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora, 10);
          console.log(element)
          // switch (element) {
          //     // case 1  :
          //     // break;
          // case 2:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 4, //cobertura por producto
          //         idTipoCobertura: 2, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // case 4:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 228, //cobertura por producto
          //         idTipoCobertura: 2, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // case 5:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 266, //cobertura por producto
          //         idTipoCobertura: 2, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          //     // case 6  :
          //     // break;
          //     // case 26	:
          //     // break;
          // case 27:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
          //         {
          //         idCobertura: 115, //cobertura por producto
          //         idTipoCobertura: 2, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          //     // case 450:
          //     // break;
          // case 494:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
          //         {
          //         idCobertura: 1793, //cobertura por producto
          //         idTipoCobertura: 2, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // case 553:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
          //         {
          //         idCobertura: 1889, //cobertura por producto
          //         idTipoCobertura: 2, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // default:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
          //         {
          //         idCobertura: null, //cobertura por producto
          //         idTipoCobertura: null, //suma asegurada o deducible
          //         idFactor: null
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // }
      }
    }
    if (this.poliza=='Amplia Plus'|| this.ampliaplus) {
      for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
        let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora,10);
        // switch (element) {
        //           // case 1  :
        //           // break;
        //       case 2:
        //           requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //                {
        //               idCobertura: 14, //cobertura por producto
        //               idTipoCobertura: 2, //suma asegurada o deducible
        //               idFactor: e
        //           })
        //           requestIdPeticion.PaqueteCoberturasApi = {
        //               ...requestIdPeticion.PaqueteCoberturasApi,
        //               idPaquete: 2,
        //               idAseguradora: null,
        //               CoberturasApi: [
        //                   ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //               ]
        //           }
        //           break;
        //       case 4:
        //           requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //                {
        //               idCobertura: 239, //cobertura por producto
        //               idTipoCobertura: 2, //suma asegurada o deducible
        //               idFactor: e
        //           })
        //           requestIdPeticion.PaqueteCoberturasApi = {
        //               ...requestIdPeticion.PaqueteCoberturasApi,
        //               idPaquete: 2,
        //               idAseguradora: null,
        //               CoberturasApi: [
        //                   ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //               ]
        //           }
        //           break;
        //       case 5:
        //           requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //                {
        //               idCobertura: 277, //cobertura por producto
        //               idTipoCobertura: 2, //suma asegurada o deducible
        //               idFactor: e
        //           })
        //           requestIdPeticion.PaqueteCoberturasApi = {
        //               ...requestIdPeticion.PaqueteCoberturasApi,
        //               idPaquete: 2,
        //               idAseguradora: null,
        //               CoberturasApi: [
        //                   ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //               ]
        //           }
        //           break;
        //           // case 6  :
        //           // break;
        //           // case 26	:
        //           // break;
        //       case 27:
        //           requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //                {
        //               idCobertura: 126, //cobertura por producto
        //               idTipoCobertura: 2, //suma asegurada o deducible
        //               idFactor: e
        //           })
        //           requestIdPeticion.PaqueteCoberturasApi = {
        //               ...requestIdPeticion.PaqueteCoberturasApi,
        //               idPaquete: 2,
        //               idAseguradora: null,
        //               CoberturasApi: [
        //                   ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //               ]
        //           }
        //           break;
        //           // case 450:
        //           // break;
        //       case 494:
        //           requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //                {
        //               idCobertura: 1778, //cobertura por producto
        //               idTipoCobertura: 2, //suma asegurada o deducible
        //               idFactor: e
        //           })
        //           requestIdPeticion.PaqueteCoberturasApi = {
        //               ...requestIdPeticion.PaqueteCoberturasApi,
        //               idPaquete: 2,
        //               idAseguradora: null,
        //               CoberturasApi: [
        //                   ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //               ]
        //           }
        //           break;
        //       case 553:
        //           requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //                {
        //               idCobertura: 1872, //cobertura por producto
        //               idTipoCobertura: 2, //suma asegurada o deducible
        //               idFactor: e
        //           })
        //           requestIdPeticion.PaqueteCoberturasApi = {
        //               ...requestIdPeticion.PaqueteCoberturasApi,
        //               idPaquete: 2,
        //               idAseguradora: null,
        //               CoberturasApi: [
        //                   ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //               ]
        //           }
        //           break;
        //       default:
        //         requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
                
        //           {
        //             idCobertura: null,       //cobertura por producto
        //             idTipoCobertura:null,    //suma asegurada o deducible
        //             idFactor:null 
        //           }
        //           )
        //         requestIdPeticion.PaqueteCoberturasApi={
        //           ...requestIdPeticion.PaqueteCoberturasApi,
        //           idPaquete:2,
        //           idAseguradora:null,
        //           CoberturasApi: [
        //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //           ]
        //         }
        //       break;
        // }
      }  
    }
    if (this.poliza == 'Limitada' || this.limitada) {
      for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
          let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora, 10);
          console.log(element)
          // switch (element) {
          //   // case 1  :
          //   // break;
          //   case 2:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //       idCobertura: 30, //cobertura por producto
          //       idTipoCobertura: 2, //suma asegurada o deducible
          //       idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //       ...requestIdPeticion.PaqueteCoberturasApi,
          //       idPaquete: 3,
          //       idAseguradora: null,
          //       CoberturasApi: [
          //         ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //       ]
          //     }
          //   break;
          //   // case 6  :
          //   // break;
          //   case 5:
          //       requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //       idCobertura: 294, //cobertura por producto
          //       idTipoCobertura: 2, //suma asegurada o deducible
          //       idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //       ...requestIdPeticion.PaqueteCoberturasApi,
          //       idPaquete: 3,
          //       idAseguradora: null,
          //       CoberturasApi: [
          //         ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //       ]
          //     }
          //   break;
          //   // case 6  :
          //   // break;
          //   // case 26	:
          //   // break;
          //   case 27:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //       idCobertura: 142, //cobertura por producto
          //       idTipoCobertura: 2, //suma asegurada o deducible
          //       idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //       ...requestIdPeticion.PaqueteCoberturasApi,
          //       idPaquete: 3,
          //       idAseguradora: null,
          //       CoberturasApi: [
          //         ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //       ]
          //     }
          //   break;
          //   // case 450:
          //   // break;
          //   case 494:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //       idCobertura: 1805, //cobertura por producto
          //       idTipoCobertura: 2, //suma asegurada o deducible
          //       idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //       ...requestIdPeticion.PaqueteCoberturasApi,
          //       idPaquete: 3,
          //       idAseguradora: null,
          //       CoberturasApi: [
          //         ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //       ]
          //     }
          //   break;
          //   case 553:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 1901, //cobertura por producto
          //         idTipoCobertura: 2, //suma asegurada o deducible
          //         idFactor: e
          //       })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //       ...requestIdPeticion.PaqueteCoberturasApi,
          //       idPaquete: 3,
          //       idAseguradora: null,
          //       CoberturasApi: [
          //         ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //       ]
          //     }
          //   break;
          //   default:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
          //         {
          //         idCobertura: null, //cobertura por producto
          //         idTipoCobertura: null, //suma asegurada o deducible
          //         idFactor: null
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 3,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // }
      }
    }
   console.log(requestIdPeticion)
  }

  handlerOptionscivilLiability( e: number) {
    this.civilLiability =e;
    requestIdPeticion.PaqueteCoberturasApi.splice(0,requestIdPeticion.PaqueteCoberturasApi.length);
    if (this.poliza == 'Amplia' || this.amplia) {
      for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
          let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora, 10);
          console.log(element)
          // switch (element) {
          //     // case 1  :
          //     // break;
          // case 2:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 5, //cobertura por producto
          //         idTipoCobertura: 1, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // case 4:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 229, //cobertura por producto
          //         idTipoCobertura: 1, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // case 5:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 267, //cobertura por producto
          //         idTipoCobertura: 1, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          //     // case 6  :
          //     // break;
          //     // case 26	:
          //     // break;
          //     // case 27	:
          //     // break;
          //     // case 450:
          //     // break;
          // case 494:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 1795, //cobertura por producto
          //         idTipoCobertura: 1, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // case 553:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 1890, //cobertura por producto
          //         idTipoCobertura: 1, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // default:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: null, //cobertura por producto
          //         idTipoCobertura: null, //suma asegurada o deducible
          //         idFactor: null
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // }
      }
    }
    if (this.poliza == 'Amplia Plus' || this.ampliaplus) {
        for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
            let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora, 10);
            console.log(element)
            // switch (element) {
            //     // case 1  :
            //     // break;
            // case 2:
            //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
            //         idCobertura: 15, //cobertura por producto
            //         idTipoCobertura: 1, //suma asegurada o deducible
            //         idFactor: e
            //     })
            //     requestIdPeticion.PaqueteCoberturasApi = {
            //         ...requestIdPeticion.PaqueteCoberturasApi,
            //         idPaquete: 2,
            //         idAseguradora: null,
            //         CoberturasApi: [
            //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
            //         ]
            //     }
            //     break;
            // case 4:
            //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
            //         idCobertura: 240, //cobertura por producto
            //         idTipoCobertura: 1, //suma asegurada o deducible
            //         idFactor: e
            //     })
            //     requestIdPeticion.PaqueteCoberturasApi = {
            //         ...requestIdPeticion.PaqueteCoberturasApi,
            //         idPaquete: 2,
            //         idAseguradora: null,
            //         CoberturasApi: [
            //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
            //         ]
            //     }
            //     break;
            // case 5:
            //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
            //         idCobertura: 278, //cobertura por producto
            //         idTipoCobertura: 1, //suma asegurada o deducible
            //         idFactor: e
            //     })
            //     requestIdPeticion.PaqueteCoberturasApi = {
            //         ...requestIdPeticion.PaqueteCoberturasApi,
            //         idPaquete: 2,
            //         idAseguradora: null,
            //         CoberturasApi: [
            //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
            //         ]
            //     }
            //     break;
            //     // case 6  :
            //     // break;
            //     // case 26	:
            //     // break;
            //     // case 27	:
            //     // break;
            //     // case 450:
            //     // break;
            // case 494:
            //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
            //         idCobertura: 1780, //cobertura por producto
            //         idTipoCobertura: 1, //suma asegurada o deducible
            //         idFactor: e
            //     })
            //     requestIdPeticion.PaqueteCoberturasApi = {
            //         ...requestIdPeticion.PaqueteCoberturasApi,
            //         idPaquete: 2,
            //         idAseguradora: null,
            //         CoberturasApi: [
            //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
            //         ]
            //     }
            //     break;
            // case 553:
            //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
            //         idCobertura: 1873, //cobertura por producto
            //         idTipoCobertura: 1, //suma asegurada o deducible
            //         idFactor: e
            //     })
            //     requestIdPeticion.PaqueteCoberturasApi = {
            //         ...requestIdPeticion.PaqueteCoberturasApi,
            //         idPaquete: 2,
            //         idAseguradora: null,
            //         CoberturasApi: [
            //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
            //         ]
            //     }
            //     break;
            // default:
            //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
            //         idCobertura: null, //cobertura por producto
            //         idTipoCobertura: null, //suma asegurada o deducible
            //         idFactor: null
            //     })
            //     requestIdPeticion.PaqueteCoberturasApi = {
            //         ...requestIdPeticion.PaqueteCoberturasApi,
            //         idPaquete: 2,
            //         idAseguradora: null,
            //         CoberturasApi: [
            //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
            //         ]
            //     }
            //     break;
            // }
        }
    }
    if (this.poliza == 'Limitada' || this.limitada) {
        for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
            let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora, 10);
            console.log(element)
            // switch (element) {
            //     // case 1  :
            //     // break;
            // case 2:
            //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
            //         idCobertura: 31, //cobertura por producto
            //         idTipoCobertura: 1, //suma asegurada o deducible
            //         idFactor: e
            //     })
            //     requestIdPeticion.PaqueteCoberturasApi = {
            //         ...requestIdPeticion.PaqueteCoberturasApi,
            //         idPaquete: 3,
            //         idAseguradora: null,
            //         CoberturasApi: [
            //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
            //         ]
            //     }
            //     break;
            //     // case 4  :
            //     // break;
            // case 5:
            //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
            //         idCobertura: 295, //cobertura por producto
            //         idTipoCobertura: 1, //suma asegurada o deducible
            //         idFactor: e
            //     })
            //     requestIdPeticion.PaqueteCoberturasApi = {
            //         ...requestIdPeticion.PaqueteCoberturasApi,
            //         idPaquete: 3,
            //         idAseguradora: null,
            //         CoberturasApi: [
            //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
            //         ]
            //     }
            //     break;
            //     // case 6  :
            //     // break;
            //     // case 26	:
            //     // break;
            //     // case 27	:
            //     // break;
            //     // case 450:
            //     // break;
            // case 494:
            //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
            //         idCobertura: 1807, //cobertura por producto
            //         idTipoCobertura: 1, //suma asegurada o deducible
            //         idFactor: e
            //     })
            //     requestIdPeticion.PaqueteCoberturasApi = {
            //         ...requestIdPeticion.PaqueteCoberturasApi,
            //         idPaquete: 3,
            //         idAseguradora: null,
            //         CoberturasApi: [
            //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
            //         ]
            //     }
            //     break;
            // case 553:
            //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
            //         idCobertura: 1902, //cobertura por producto
            //         idTipoCobertura: 1, //suma asegurada o deducible
            //         idFactor: e
            //     })
            //     requestIdPeticion.PaqueteCoberturasApi = {
            //         ...requestIdPeticion.PaqueteCoberturasApi,
            //         idPaquete: 3,
            //         idAseguradora: null,
            //         CoberturasApi: [
            //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
            //         ]
            //     }
            //     break;
            // default:
            //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
            //         idCobertura: null, //cobertura por producto
            //         idTipoCobertura: null, //suma asegurada o deducible
            //         idFactor: null
            //     })
            //     requestIdPeticion.PaqueteCoberturasApi = {
            //         ...requestIdPeticion.PaqueteCoberturasApi,
            //         idPaquete: 3,
            //         idAseguradora: null,
            //         CoberturasApi: [
            //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
            //         ]
            //     }
            //     break;
            // }
        }
    }
    console.log(requestIdPeticion)
  }

  handlerOptionsmedicalExpenses(e: number) {
    this.medicalExpenses =e;
    requestIdPeticion.PaqueteCoberturasApi.splice(0,requestIdPeticion.PaqueteCoberturasApi.length);
    if (this.poliza == 'Amplia' || this.amplia) {
      for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
          let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora, 10);
          console.log(element)
        //   switch (element) {
        //       // case 1  :
        //       // break;
        //   case 2:
        //       requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
        //           idCobertura: 7, //cobertura por producto
        //           idTipoCobertura: 1, //suma asegurada o deducible
        //           idFactor: e
        //       })
        //       requestIdPeticion.PaqueteCoberturasApi = {
        //           ...requestIdPeticion.PaqueteCoberturasApi,
        //           idPaquete: 1,
        //           idAseguradora: null,
        //           CoberturasApi: [
        //               ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //           ]
        //       }
        //       break;
        //   case 4:
        //       requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
        //           idCobertura: 231, //cobertura por producto
        //           idTipoCobertura: 1, //suma asegurada o deducible
        //           idFactor: e
        //       })
        //       requestIdPeticion.PaqueteCoberturasApi = {
        //           ...requestIdPeticion.PaqueteCoberturasApi,
        //           idPaquete: 1,
        //           idAseguradora: null,
        //           CoberturasApi: [
        //               ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //           ]
        //       }
        //       break;
        //   case 5:
        //       requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
        //           idCobertura: 269, //cobertura por producto
        //           idTipoCobertura: 1, //suma asegurada o deducible
        //           idFactor: e
        //       })
        //       requestIdPeticion.PaqueteCoberturasApi = {
        //           ...requestIdPeticion.PaqueteCoberturasApi,
        //           idPaquete: 1,
        //           idAseguradora: null,
        //           CoberturasApi: [
        //               ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //           ]
        //       }
        //       break;
        //       // case 6  :
        //       // break;
        //       // case 26	:
        //       // break;
			  // case 27	:
        //       requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //           {
        //           idCobertura: 118, //cobertura por producto
        //           idTipoCobertura: 1, //suma asegurada o deducible
        //           idFactor: e
        //       })
        //       requestIdPeticion.PaqueteCoberturasApi = {
        //           ...requestIdPeticion.PaqueteCoberturasApi,
        //           idPaquete: 1,
        //           idAseguradora: null,
        //           CoberturasApi: [
        //               ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //           ]
        //       }
        //       break;
        //       // case 450:
        //       // break;
			  // // case 494  :
        //       // break;
        //   case 553:
        //       requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //           {
        //           idCobertura: 1893, //cobertura por producto
        //           idTipoCobertura: 1, //suma asegurada o deducible
        //           idFactor: e
        //       })
        //       requestIdPeticion.PaqueteCoberturasApi = {
        //           ...requestIdPeticion.PaqueteCoberturasApi,
        //           idPaquete: 1,
        //           idAseguradora: null,
        //           CoberturasApi: [
        //               ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //           ]
        //       }
        //       break;
        //   default:
        //       requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //           {
        //           idCobertura: null, //cobertura por producto
        //           idTipoCobertura: null, //suma asegurada o deducible
        //           idFactor: null
        //       })
        //       requestIdPeticion.PaqueteCoberturasApi = {
        //           ...requestIdPeticion.PaqueteCoberturasApi,
        //           idPaquete: 1,
        //           idAseguradora: null,
        //           CoberturasApi: [
        //               ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //           ]
        //       }
        //       break;
        //   }
      }
    }
    if (this.poliza=='Amplia Plus'|| this.ampliaplus) {
      for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
          let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora, 10);
          console.log(element)
      //     switch (element) {
      //         // case 1  :
      //         // break;
      //     case 2:
      //         requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
      //             idCobertura: 17, //cobertura por producto
      //             idTipoCobertura: 1, //suma asegurada o deducible
      //             idFactor: e
      //         })
      //         requestIdPeticion.PaqueteCoberturasApi = {
      //             ...requestIdPeticion.PaqueteCoberturasApi,
      //             idPaquete: 2,
      //             idAseguradora: null,
      //             CoberturasApi: [
      //                 ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
      //             ]
      //         }
      //         break;
      //     case 4:
      //       requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
      //           idCobertura: 242, //cobertura por producto
      //           idTipoCobertura: 1, //suma asegurada o deducible
      //           idFactor: e
      //       })
      //       requestIdPeticion.PaqueteCoberturasApi = {
      //           ...requestIdPeticion.PaqueteCoberturasApi,
      //           idPaquete: 2,
      //           idAseguradora: null,
      //           CoberturasApi: [
      //               ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
      //           ]
      //       }
      //     break;
      //     case 5:
      //       requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
      //           idCobertura: 280, //cobertura por producto
      //           idTipoCobertura: 1, //suma asegurada o deducible
      //           idFactor: e
      //       })
      //       requestIdPeticion.PaqueteCoberturasApi = {
      //           ...requestIdPeticion.PaqueteCoberturasApi,
      //           idPaquete: 2,
      //           idAseguradora: null,
      //           CoberturasApi: [
      //               ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
      //           ]
      //       }
      //     break;
      //         // case 6  :
      //         // break;
      //         // case 26	:
      //         // break;
			//     case 27	:
      //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
      //         {
      //         idCobertura: 129, //cobertura por producto
      //         idTipoCobertura: 1, //suma asegurada o deducible
      //         idFactor: e
      //     })
      //     requestIdPeticion.PaqueteCoberturasApi = {
      //         ...requestIdPeticion.PaqueteCoberturasApi,
      //         idPaquete: 2,
      //         idAseguradora: null,
      //         CoberturasApi: [
      //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
      //         ]
      //     }
      //   break;
      //         // case 450:
      //         // break;
		  //     case 494  :
			//   requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
			// 		  {
			// 		  idCobertura: 1782, //cobertura por producto
			// 		  idTipoCobertura: 1, //suma asegurada o deducible
			// 		  idFactor: e
			// 	  })
			//   requestIdPeticion.PaqueteCoberturasApi = {
			// 	  ...requestIdPeticion.PaqueteCoberturasApi,
			// 	  idPaquete: 2,
			// 	  idAseguradora: null,
			// 	  CoberturasApi: [
			// 		  ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
			// 	  ]
			//   }
		  // break;
      //     case 553:
      //         requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
      //             {
      //             idCobertura: 1877, //cobertura por producto
      //             idTipoCobertura: 1, //suma asegurada o deducible
      //             idFactor: e
      //         })
      //         requestIdPeticion.PaqueteCoberturasApi = {
      //             ...requestIdPeticion.PaqueteCoberturasApi,
      //             idPaquete: 2,
      //             idAseguradora: null,
      //             CoberturasApi: [
      //                 ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
      //             ]
      //         }
      //         break;
      //     default:
      //         requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
      //             {
      //             idCobertura: null, //cobertura por producto
      //             idTipoCobertura: null, //suma asegurada o deducible
      //             idFactor: null
      //         })
      //         requestIdPeticion.PaqueteCoberturasApi = {
      //             ...requestIdPeticion.PaqueteCoberturasApi,
      //             idPaquete: 2,
      //             idAseguradora: null,
      //             CoberturasApi: [
      //                 ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
      //             ]
      //         }
      //         break;
      //     }
      }
    }
    if (this.poliza == 'Limitada' || this.limitada) {
      for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
          let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora, 10);
          console.log(element)
          // switch (element) {
          //     // case 1  :
          //     // break;
          // case 2:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura:  33, //cobertura por producto
          //         idTipoCobertura: 1, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 3,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          //     // case 4  :
          //     // break;
          // case 5:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 297, //cobertura por producto
          //         idTipoCobertura: 1, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 3,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          //     // case 6  :
          //     // break;
          //     // case 26	:
          //     // break;
          // case 27	:
          //   requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //       idCobertura: 145, //cobertura por producto
          //       idTipoCobertura: 1, //suma asegurada o deducible
          //       idFactor: e
          //     })
          //   requestIdPeticion.PaqueteCoberturasApi = {
          //     ...requestIdPeticion.PaqueteCoberturasApi,
          //     idPaquete: 3,
          //     idAseguradora: null,
          //     CoberturasApi: [
          //       ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //     ]
          //   }
          // break;
          //     // case 450:
          //     // break;
          // case 494:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 1809, //cobertura por producto
          //         idTipoCobertura: 1, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 3,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // case 553:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 1905, //cobertura por producto
          //         idTipoCobertura: 1, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 3,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // default:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: null, //cobertura por producto
          //         idTipoCobertura: null, //suma asegurada o deducible
          //         idFactor: null
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 3,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // }
      }
    }
    console.log(requestIdPeticion)
  }

  handlerOptionsdriverAccident(e: number) {
    this.driverAccident  =e;
    requestIdPeticion.PaqueteCoberturasApi.splice(0,requestIdPeticion.PaqueteCoberturasApi.length);
    if (this.poliza == 'Amplia' || this.amplia) {
      for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
          let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora, 10);
          console.log(element)
        //   switch (element) {
        //         // case 1  :
        //         // break;
        //     case 2:
        //         requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
        //             idCobertura: 3091, //cobertura por producto
        //             idTipoCobertura: 1, //suma asegurada o deducible
        //             idFactor: e
        //         })
        //         requestIdPeticion.PaqueteCoberturasApi = {
        //             ...requestIdPeticion.PaqueteCoberturasApi,
        //             idPaquete: 1,
        //             idAseguradora: null,
        //             CoberturasApi: [
        //                 ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //             ]
        //         }
        //         break;
        //     case 4:
        //         requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
        //             idCobertura: 233, //cobertura por producto
        //             idTipoCobertura: 1, //suma asegurada o deducible
        //             idFactor: e
        //         })
        //         requestIdPeticion.PaqueteCoberturasApi = {
        //             ...requestIdPeticion.PaqueteCoberturasApi,
        //             idPaquete: 1,
        //             idAseguradora: null,
        //             CoberturasApi: [
        //                 ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //             ]
        //         }
        //         break;
        //     case 5:
        //         requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
        //             idCobertura: 271, //cobertura por producto
        //             idTipoCobertura: 1, //suma asegurada o deducible
        //             idFactor: e
        //         })
        //         requestIdPeticion.PaqueteCoberturasApi = {
        //             ...requestIdPeticion.PaqueteCoberturasApi,
        //             idPaquete: 1,
        //             idAseguradora: null,
        //             CoberturasApi: [
        //                 ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //             ]
        //         }
        //         break;
        //         // case 6  :
        //         // break;
        //         // case 26	:
        //         // break;
        //     case 27	:
        //         requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //             {
        //             idCobertura: 120, //cobertura por producto
        //             idTipoCobertura: 1, //suma asegurada o deducible
        //             idFactor: e
        //         })
        //         requestIdPeticion.PaqueteCoberturasApi = {
        //             ...requestIdPeticion.PaqueteCoberturasApi,
        //             idPaquete: 1,
        //             idAseguradora: null,
        //             CoberturasApi: [
        //                 ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //             ]
        //         }
        //         break;
        //         // case 450:
        //         // break;
        //     case 494  :
        // requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //             {
        //             idCobertura: 1799, //cobertura por producto
        //             idTipoCobertura: 1, //suma asegurada o deducible
        //             idFactor: e
        //         })
        //         requestIdPeticion.PaqueteCoberturasApi = {
        //             ...requestIdPeticion.PaqueteCoberturasApi,
        //             idPaquete: 1,
        //             idAseguradora: null,
        //             CoberturasApi: [
        //                 ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //             ]
        //         }
        //     break;
        //     case 553:
        //         requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //             {
        //             idCobertura: 1895, //cobertura por producto
        //             idTipoCobertura: 1, //suma asegurada o deducible
        //             idFactor: e
        //         })
        //         requestIdPeticion.PaqueteCoberturasApi = {
        //             ...requestIdPeticion.PaqueteCoberturasApi,
        //             idPaquete: 1,
        //             idAseguradora: null,
        //             CoberturasApi: [
        //                 ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //             ]
        //         }
        //         break;
        //     default:
        //       requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //           {
        //           idCobertura: null, //cobertura por producto
        //           idTipoCobertura: null, //suma asegurada o deducible
        //           idFactor: null
        //       })
        //       requestIdPeticion.PaqueteCoberturasApi = {
        //           ...requestIdPeticion.PaqueteCoberturasApi,
        //           idPaquete: 1,
        //           idAseguradora: null,
        //           CoberturasApi: [
        //               ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //           ]
        //       }
        //       break;
        //   }
      }
    }
    if (this.poliza=='Amplia Plus'|| this.ampliaplus) {
      for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
          let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora, 10);
          console.log(element)
        //   switch (element) {
        //       // case 1  :
        //       // break;
        //   case 2:
        //       requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
        //           idCobertura: 19, //cobertura por producto
        //           idTipoCobertura: 1, //suma asegurada o deducible
        //           idFactor: e
        //       })
        //       requestIdPeticion.PaqueteCoberturasApi = {
        //           ...requestIdPeticion.PaqueteCoberturasApi,
        //           idPaquete: 2,
        //           idAseguradora: null,
        //           CoberturasApi: [
        //               ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //           ]
        //       }
        //       break;
        //   case 4:
        //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
        //         idCobertura: 244, //cobertura por producto
        //         idTipoCobertura: 1, //suma asegurada o deducible
        //         idFactor: e
        //     })
        //     requestIdPeticion.PaqueteCoberturasApi = {
        //         ...requestIdPeticion.PaqueteCoberturasApi,
        //         idPaquete: 2,
        //         idAseguradora: null,
        //         CoberturasApi: [
        //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //         ]
        //     }
        //   break;
        //   case 5:
        //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
        //         idCobertura: 282, //cobertura por producto
        //         idTipoCobertura: 1, //suma asegurada o deducible
        //         idFactor: e
        //     })
        //     requestIdPeticion.PaqueteCoberturasApi = {
        //         ...requestIdPeticion.PaqueteCoberturasApi,
        //         idPaquete: 2,
        //         idAseguradora: null,
        //         CoberturasApi: [
        //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //         ]
        //     }
        //   break;
        //       // case 6  :
        //       // break;
        //       // case 26	:
        //       // break;
			  //   case 27	:
        //   requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //       {
        //       idCobertura: 131, //cobertura por producto
        //       idTipoCobertura: 1, //suma asegurada o deducible
        //       idFactor: e
        //   })
        //   requestIdPeticion.PaqueteCoberturasApi = {
        //       ...requestIdPeticion.PaqueteCoberturasApi,
        //       idPaquete: 2,
        //       idAseguradora: null,
        //       CoberturasApi: [
        //           ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //       ]
        //   }
        // break;
        //       // case 450:
        //       // break;
		    //   // case 494:
        //       // break;
        //   case 553:
        //       requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //           {
        //           idCobertura: 1879, //cobertura por producto
        //           idTipoCobertura: 1, //suma asegurada o deducible
        //           idFactor: e
        //       })
        //       requestIdPeticion.PaqueteCoberturasApi = {
        //           ...requestIdPeticion.PaqueteCoberturasApi,
        //           idPaquete: 2,
        //           idAseguradora: null,
        //           CoberturasApi: [
        //               ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //           ]
        //       }
        //       break;
        //   default:
        //       requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
        //           {
        //           idCobertura: null, //cobertura por producto
        //           idTipoCobertura: null, //suma asegurada o deducible
        //           idFactor: null
        //       })
        //       requestIdPeticion.PaqueteCoberturasApi = {
        //           ...requestIdPeticion.PaqueteCoberturasApi,
        //           idPaquete: 2,
        //           idAseguradora: null,
        //           CoberturasApi: [
        //               ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
        //           ]
        //       }
        //       break;
        //   }
      }
    }
    if (this.poliza == 'Limitada' || this.limitada) {
      for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
          let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora, 10);
          console.log(element)
          // switch (element) {
          //     // case 1  :
          //     // break;
          //     case 2:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 3092, //cobertura por producto
          //         idTipoCobertura: 1, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 3,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          //     // case 4  :
          //     // break;
          //     case 5:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 299, //cobertura por producto
          //         idTipoCobertura: 1, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 3,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          //     // case 6  :
          //     // break;
          //     // case 26	:
          //     // break;
          //     case 27	:
          //   requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //       idCobertura: 147, //cobertura por producto
          //       idTipoCobertura: 1, //suma asegurada o deducible
          //       idFactor: e
          //     })
          //   requestIdPeticion.PaqueteCoberturasApi = {
          //     ...requestIdPeticion.PaqueteCoberturasApi,
          //     idPaquete: 3,
          //     idAseguradora: null,
          //     CoberturasApi: [
          //       ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //     ]
          //   }
          // break;
          //     // case 450:
          //     // break;
			    //     // case 494:
          //     // break;
          //     case 553:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: 1907, //cobertura por producto
          //         idTipoCobertura: 1, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 3,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          //     default:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: null, //cobertura por producto
          //         idTipoCobertura: null, //suma asegurada o deducible
          //         idFactor: null
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 3,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // }
      }
    }
    console.log(requestIdPeticion)
  }

  handlerOptionsocuppantsLiability(e: number) {
    this.ocuppantsLiability=e;
    requestIdPeticion.PaqueteCoberturasApi.splice(0,requestIdPeticion.PaqueteCoberturasApi.length);
    if (this.poliza == 'Amplia' || this.amplia) {
      for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
          let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora, 10);
          console.log(element)
          // switch (element) {
          //       // case 1  :
          //       // break;
          //   case 2:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //       idCobertura: 3091, //cobertura por producto
          //       idTipoCobertura: 1, //suma asegurada o deducible
          //       idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //       ...requestIdPeticion.PaqueteCoberturasApi,
          //       idPaquete: 1,
          //       idAseguradora: null,
          //       CoberturasApi: [
          //         ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //       ]
          //     }
          //   break;
				  //       // case 4:
          //       // break;
				  //       // case 5:
          //       // break;
          //       // case 6  :
          //       // break;
          //       // case 26	:
          //       // break;
          //   case 27	:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
          //         {
          //         idCobertura: 120, //cobertura por producto
          //         idTipoCobertura: 1, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //   break;
          //       // case 450:
          //       // break;
          //       // case 494  :
          //       // break;
          //       // case 553:
          //       // break;
          //   default:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
          //         {
          //         idCobertura: null, //cobertura por producto
          //         idTipoCobertura: null, //suma asegurada o deducible
          //         idFactor: null
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 1,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // }
      }
    }
    if (this.poliza=='Amplia Plus'|| this.ampliaplus) {
      for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
          let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora, 10);
          console.log(element)
          // switch (element) {
          //     // case 1  :
          //     // break;
          //   case 2:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //       idCobertura: 4357, //cobertura por producto
          //       idTipoCobertura: 1, //suma asegurada o deducible
          //       idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //       ...requestIdPeticion.PaqueteCoberturasApi,
          //       idPaquete: 2,
          //       idAseguradora: null,
          //       CoberturasApi: [
          //         ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //       ]
          //     }
          //   break;
          //     // case 4:
          //     // break;
			    //   case 5:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //       idCobertura: 289, //cobertura por producto
          //       idTipoCobertura: 1, //suma asegurada o deducible
          //       idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //       ...requestIdPeticion.PaqueteCoberturasApi,
          //       idPaquete: 2,
          //       idAseguradora: null,
          //       CoberturasApi: [
          //         ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //       ]
          //     }
          //   break;
          //     // case 6  :
          //     // break;
          //     // case 26	:
          //     // break;
			    //   case 27	:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
          //       {
          //       idCobertura: 4320, //cobertura por producto
          //       idTipoCobertura: 1, //suma asegurada o deducible
          //       idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //       ...requestIdPeticion.PaqueteCoberturasApi,
          //       idPaquete: 2,
          //       idAseguradora: null,
          //       CoberturasApi: [
          //         ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //       ]
          //     }
          //   break;
          //     // case 450:
          //     // break;
		      //     // case 494:
          //     // break;
			    //     // case 553:
          //     // break;
          //   default:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push(
          //         {
          //         idCobertura: null, //cobertura por producto
          //         idTipoCobertura: null, //suma asegurada o deducible
          //         idFactor: null
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 2,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //   break;
          // }
      }
    }
    if (this.poliza == 'Limitada' || this.limitada) {
      for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
          let element = parseInt(this.responseCotizacionJSON[index].IdAseguradora, 10);
          console.log(element)
          // switch (element) {
          //     // case 1  :
          //     // break;
          //     case 2:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura:  4365, //cobertura por producto
          //         idTipoCobertura: 1, //suma asegurada o deducible
          //         idFactor: e
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 3,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          //     // case 4  :
          //     // break;
          //     // case 5:
          //     // break;
          //     // case 6  :
          //     // break;
          //     // case 26	:
          //     // break;
          //     case 27	:
          //       requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //           idCobertura: 4323, //cobertura por producto
          //           idTipoCobertura: 1, //suma asegurada o deducible
          //           idFactor: e
          //         })
          //       requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 3,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //           ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //       }
          //     break;
          //     // case 450:
          //     // break;
			    //     // case 494:
          //     // break;
          //     // case 553:
          //     // break;
          //     default:
          //     requestIdPeticion.PaqueteCoberturasApi.CoberturasApi.push({
          //         idCobertura: null, //cobertura por producto
          //         idTipoCobertura: null, //suma asegurada o deducible
          //         idFactor: null
          //     })
          //     requestIdPeticion.PaqueteCoberturasApi = {
          //         ...requestIdPeticion.PaqueteCoberturasApi,
          //         idPaquete: 3,
          //         idAseguradora: null,
          //         CoberturasApi: [
          //             ...requestIdPeticion.PaqueteCoberturasApi.CoberturasApi
          //         ]
          //     }
          //     break;
          // }
      }
    }
    console.log(requestIdPeticion)
  }

  consultanuevosprecios(){
    this.store.dispatch(new GetIdPeticion(requestIdPeticion))
    this.store.select(selectIdPeticionResponse).subscribe(id=>{
      console.log(id.iDPeticion);
      if(id.iDPeticion === null) return
    this.requestIdCotizacion.IdPeticion = id.iDPeticion;
    this.store.dispatch(new GetCotizacion(this.requestIdCotizacion));
    });
    this.store.select(selectCotizacionResponse).subscribe(res => {
      if(!res.jsonCotizacion.length&& res.idCotizacion!=1) 
      {
        return
      } else{
          this.responseCotizacionJSON=[];
        //   res.jsonCotizacion.forEach(element => {
        //   let json=JSON.parse(element)
        //   this.responseCotizacionJSON.push(json)
        // });
        for (let index = 0; index < res.jsonCotizacion.length; index++) {
          const element = JSON.parse(res.jsonCotizacion[index]);
          this.responseCotizacionJSON.push(element);
        }
        // OBTIENE EL IDPRODUCTO DE PRECIOCOTIZACION POR CADA this.Aseguradora Y DESHABILITAR BOTON BASICA
        console.log(this.responseCotizacionJSON);
        this.siBasica=0;
        this.noBasica=0;
        for (let index = 0; index < this.responseCotizacionJSON.length; index++) {
          const for1 = this.responseCotizacionJSON[index].PrecioCotizacion;
          for (let index = 0; index < for1.length; index++) {
            const for2 = for1[index].IdProducto;
            if (for2<=3) {
                  this.noBasica+=1;
                }else{
                  this.siBasica+=1;
                }
          }
        }
        console.log(this.noBasica,this.siBasica);
      }
    })
    console.log(requestIdPeticion)
  }
  
}
