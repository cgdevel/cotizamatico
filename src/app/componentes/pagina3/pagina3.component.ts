import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { element } from 'protractor';
import {InfovehiculoService} from '../../../app/servicios/infovehiculo.service';
import { CatalogoModel } from '../../interphaces/models/Catalogos.model';
import { FechasModel } from 'src/app/interphaces/models/Fechas.model';
@Component({
  selector: 'app-pagina3',
  templateUrl: './pagina3.component.html',
  styleUrls: ['./pagina3.component.css']
})
export class Pagina3Component implements OnInit {
  mujer: boolean;
  hombre: boolean;
  empresa: boolean;
  validonompag3: boolean;
  ApePateCliente: string;
  ApeMateCliente: string;
  ClienteNomb: string;
  persona: string;
  @Output() emitBoolMujer = new EventEmitter<boolean>();
  @Output() emitBoolHombre = new EventEmitter<boolean>();
  @Output() emitBoolEmpreesa = new EventEmitter<boolean>();
  // aseguradora: string;

    constructor( private Infovehiculo: InfovehiculoService ) {}
  colonias = [];
  cols: {
    iIdUbicacion: number,
    sUbicacion: string }[];
 noedites: boolean;
 sisirve: boolean;
 item = '';
 nombraseguradora: any;
 // Variables a las que asigno datos de pagina1
 vermodelo: CatalogoModel;
 vermarca: CatalogoModel;
 verdescripcion: CatalogoModel;
 veranno: CatalogoModel;
 nombre: any;
 email: any;
 telefono: any;
 genero: any;
 codigopostal: any;
 fechanacimiento: FechasModel;
// VARIABLES CP
 ubicacion: any;
ubicacionId: number;
    estado: string;
    municipio: string;
    colonia: string;
    coloniasel;

    ApellidoPAterno(e){
      this.ApePateCliente = e;
    }
    ApellidoMAterno(e){
      this.ApeMateCliente = e;
    }
    ClienteNombre(e){
      this.ClienteNomb = e;
    }
    TipoP(e){
      this.persona = e;
      this.persona === 'Femenino' ? this.mujer = true : this.mujer = false;
      this.persona === 'Masculino' ? this.hombre = true : this.hombre = false;
      this.persona === 'Moral'  ? this.empresa = true : this.empresa = false;
    }
  getUbicacion(){
    this.Infovehiculo.getApiCPs({
      IdAplication: 2,
      NombreCatalogo: 'Sepomex',
      Filtro: this.codigopostal
    }).subscribe((data: any) => {
      this.ubicacion = JSON.parse(data.CatalogoJsonString);
      console.log(this.ubicacion);
      this.estado = this.ubicacion[0].Municipio.Estado.sEstado;
      this.municipio = this.ubicacion[0].Municipio.sMunicipio;
      this.cols = this.ubicacion[0].Ubicacion;
      }); // suscribecierra
  }
 
  verificanombre(cnam: string){
  let ArrayEmparejamientos = {};
  const reg = /^(([A-Z a-z])\w+(\s))(([A-Z a-z]+\w\s))(([A-Z a-z]+\w)\s?)$/;
  ArrayEmparejamientos = cnam.match(reg);
  this.validonompag3 = reg.test(cnam);
  // console.log(event);
  console.log(cnam);
  if (this.validonompag3) {
   return this.sisirve = true;
  } else {
    return this.sisirve = false;
  }
  }
  ngOnInit(): void {
    console.log(history.state);
    this.noedites = false;
    this.vermodelo = history.state.modsel;
    this.vermarca = history.state.marsel;
    this.verdescripcion = history.state.descsel;
    this.veranno = history.state.annosel;
    this.nombre = history.state.nomsel;
    this.verificanombre(this.nombre);
    this.email = history.state.emsel;
    this.telefono = history.state.telsel;
    this.codigopostal = history.state.codigosel;
    console.log(this.codigopostal);
    this.nombraseguradora = history.state.asesel;
    this.genero = history.state.generosel;
    this.genero === 'Femenino' ? this.mujer = true : this.mujer = false;
    this.genero === 'Masculino' ? this.hombre = true : this.hombre = false;
    this.genero === 'Moral'  ? this.empresa = true : this.empresa = false;
    this.fechanacimiento = history.state.fechasel;
    this.getUbicacion();

  }

}
