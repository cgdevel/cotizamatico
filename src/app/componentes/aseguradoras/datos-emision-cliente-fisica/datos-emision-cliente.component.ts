import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {InfovehiculoService} from '../../../servicios/infovehiculo.service';
import {RequestNacionalidad } from '../../../interphaces/nacionali';
import { CatalogoModel } from '../../../interphaces/models/Catalogos.model';
import { FechasModel } from '../../../interphaces/models/Fechas.model';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { constants } from 'os';
@Component({
  selector: 'app-datos-emision-cliente-fisica',
  templateUrl: './datos-emision-cliente-fisica.component.html',
  styleUrls: ['./datos-emision-cliente-fisica.component.css']
})
export class DatosEmisionClienteFisicaComponent implements OnInit {
  fechanaciaseg: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;
  @Input() nombre = '';
  @Input() codigopostal = '';
  @Input() correo = '';
  @Input() telefono = '';
  @Input() genero = '';
  @Input() fecha: FechasModel;
  nombreNOCom: boolean;
  Nacion = new Array<RequestNacionalidad>();
  nacionalidadsel: RequestNacionalidad;
  item = '';
  apellidomaterno = '';
  apellidopaterno = '';
  RFC: string;
  edad: number;
  year;
  mon;
  Ocup = new Array<CatalogoModel>();
  EsCivs = new Array<CatalogoModel>();
  ocupacionsel: CatalogoModel;
  estadocivilsel: CatalogoModel;
  nombresepa = new Array<string>();
  estado: string;
  municipio: string;
  ubicacion: any;
  anionac: number;
  mesnac: number;
  dianac: number;
  cols: {
    iIdUbicacion: number,
    sUbicacion: string }[];
  coloniasel;
  constructor( private InfovehiculoService: InfovehiculoService) { }
  getUbicacion( cp ?: string ) {
    this.coloniasel = '';
    this.InfovehiculoService.getApiCPs({
      IdAplication: 2,
      NombreCatalogo: 'Sepomex',
      Filtro: !!this.codigopostal ? this.codigopostal : cp,
    }).subscribe((data: any) => {
      this.ubicacion = JSON.parse(data.CatalogoJsonString);
      // console.log(this.ubicacion);
      this.estado = this.ubicacion[0].Municipio.Estado.sEstado;
      this.municipio = this.ubicacion[0].Municipio.sMunicipio;
      this.cols = this.ubicacion[0].Ubicacion;
    }); // suscribecierra
  }
  dividirCadena(cadenaADividir, separador) {
    const arrayDeCadenas = cadenaADividir.split(separador);
    for (const object of arrayDeCadenas) {
      // console.log(object);
      this.nombresepa.push(object);
    }
    console.log(this.nombresepa);
    this.nombre = '';
    this.nombre = this.nombresepa[0].toLocaleUpperCase();
    this.apellidopaterno = this.nombresepa[1].toLocaleUpperCase();
    this.apellidomaterno = this.nombresepa[2].toLocaleUpperCase();
    this.generarfc(this.apellidopaterno, this.apellidomaterno, this.nombre, this.fechanaciaseg);
 }
  verificaCompletoNom(cnam: string){
    if (cnam === '') {
      return this.nombreNOCom = false ;
    } else {
      let ArrayEmparejamientos = {};
      const reg = /^(([A-Za-záéíóúÁÉÍÓÚ])\w+(\s))(([A-Za-záéíóúÁÉÍÓÚ]+\w\s))(([A-Za-záéíóúÁÉÍÓÚ]+\w)\s?)$/;
      ArrayEmparejamientos = cnam.match(reg);
      this.nombreNOCom = reg.test(cnam);
      if (this.nombreNOCom) {
        this.dividirCadena(cnam, ' ');
      }else{
        this.dividirCadena(cnam, ' ');
        // this.nombre = cnam.toLocaleUpperCase();
      }
    }
  }
  apepatMayu( appatstr: string ){
    if (appatstr === '') {
      this.nombreNOCom = false;
      this.generarfc(this.apellidopaterno, this.apellidomaterno, this.nombre, this.fechanaciaseg);
    }else{
      if (appatstr.length < 3){
        this.nombreNOCom = false;
      }
      // console.log(appatstr.toLocaleUpperCase());
      this.apellidopaterno  = this.apellidopaterno.replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u');
      this.apellidopaterno  = this.apellidopaterno.toLocaleUpperCase();
      this.generarfc(this.apellidopaterno, this.apellidomaterno, this.nombre, this.fechanaciaseg);
    }
  }
  apematMayu( apmatstr: string ){
    if (apmatstr === '') {
      this.nombreNOCom = false;
      this.generarfc(this.apellidopaterno, this.apellidomaterno, this.nombre, this.fechanaciaseg);
    }else{
      if (apmatstr.length < 3){
        this.nombreNOCom = false;
      }
      // console.log(apmatstr.toLocaleUpperCase());
      this.apellidomaterno  = this.apellidomaterno.replace(/á/g, 'a')
        .replace(/é/g, 'e')
        .replace(/í/g, 'i')
        .replace(/ó/g, 'o')
        .replace(/ú/g, 'u');
      this.apellidomaterno  = this.apellidomaterno.toLocaleUpperCase();
      this.generarfc(this.apellidopaterno, this.apellidomaterno, this.nombre, this.fechanaciaseg);
    }
  }
  nombreMayu( nomstr: string ){
    if (nomstr === '') {
      this.nombreNOCom = false;
      this.generarfc(this.apellidopaterno, this.apellidomaterno, this.nombre, this.fechanaciaseg);
    }else{
      if (nomstr.length < 3){
        this.nombreNOCom = false;
      }else{
        this.nombre = this.nombre.replace(/á/g, 'a')
        .replace(/é/g, 'e')
        .replace(/í/g, 'i')
        .replace(/ó/g, 'o')
        .replace(/ú/g, 'u');
        this.nombre = this.nombre.toLocaleUpperCase();
        this.generarfc(this.apellidopaterno, this.apellidomaterno, this.nombre, this.fechanaciaseg);
      }
    }
  }
  generarfc(appaterno: string, apmaterno: string, nom: string, fechnaciaseg: NgbDateStruct ){
    if (!!appaterno && !!apmaterno && !!nom && !!fechnaciaseg && appaterno.length > 2 && apmaterno.length > 2 && nom.length > 2 ) {
      const strnmate = apmaterno.charAt(0);
      const strnpate = appaterno.charAt(0) + appaterno.charAt(1);
      const strnom = nom.charAt(0);
      const year = fechnaciaseg.year.toString();
      const yearu = year.charAt(2) + year.charAt(3);
      const month = fechnaciaseg.month.toString();
      const monthu = month.charAt(0) + month.charAt(1);
      const day = fechnaciaseg.day.toString();
      const dayhu = day.charAt(0) + day.charAt(1);
      if (fechnaciaseg.month < 10 && fechnaciaseg.day < 10){
        return this.RFC = strnpate + strnmate + strnom + yearu + '0' + monthu + '0' + dayhu + 'XXX';
      }else {
        if (fechnaciaseg.month < 10 && fechnaciaseg.day >= 10) {
          return this.RFC = strnpate + strnmate + strnom + yearu + '0' + monthu + dayhu + 'XXX';
        } else {
          if (fechnaciaseg.month >= 10 && fechnaciaseg.day < 10) {
            return this.RFC = strnpate + strnmate + strnom + yearu + monthu + '0' + dayhu + 'XXX';
          }else {
            if (fechnaciaseg.month >= 10 && fechnaciaseg.day >= 10) {
              return this.RFC = strnpate + strnmate + strnom + yearu + monthu + dayhu + 'XXX';
            }
          }
        }
      }
    } else if (appaterno || !apmaterno || !nom || !fechnaciaseg) {
      return this.RFC = '';
    }
  }
  cambiafecha(e){
    // console.log(e.year);
    this.generarfc(this.apellidopaterno, this.apellidomaterno, this.nombre, e);
    this.edad = this.calculaedad(e);
  }
  rfcpornacio(){
    if (!!this.nacionalidadsel) {
      if (this.nacionalidadsel.NacString === 'MEXICANA') {
        this.generarfc(this.apellidopaterno, this.apellidomaterno, this.nombre, this.fechanaciaseg);
      } else {
        const year = this.fechanaciaseg.year.toString();
        const yearu = year.charAt(2) + year.charAt(3);
        const month = this.fechanaciaseg.month.toString();
        const monthu = month.charAt(0) + month.charAt(1);
        const day = this.fechanaciaseg.day.toString();
        const dayhu = day.charAt(0) + day.charAt(1);
        if (this.fechanaciaseg.month < 10 && this.fechanaciaseg.day < 10){
        return this.RFC = 'XXXX' + yearu + '0' + monthu + '0' + dayhu + 'XXX';
      }else {
        if (this.fechanaciaseg.month < 10 && this.fechanaciaseg.day >= 10) {
          return this.RFC = 'XXXX' + yearu + '0' + monthu + dayhu + 'XXX';
        } else {
          if (this.fechanaciaseg.month >= 10 && this.fechanaciaseg.day < 10) {
            return this.RFC = 'XXXX' + yearu + monthu + '0' + dayhu + 'XXX';
          }else {
            if (this.fechanaciaseg.month >= 10 && this.fechanaciaseg.day >= 10) {
              return this.RFC = 'XXXX' + yearu + monthu + dayhu + 'XXX';
            }
          }
        }
      }
      }
    }
  }
  calculaedad( num: NgbDateStruct){
      let age = 0;
      const today = new Date();
      this.year = today.getFullYear();
      this.mon = today.getMonth() + 1;
      // console.log(this.year + '  ' + this.mon + '  ' + num.year + '  ' + num.month);
      if (num.month >= this.mon) {
        return age = this.year - num.year - 1;
      }else{
        return age = this.year - num.year;
      }
  }
  
  ngOnInit(): void {
    this.Nacion = this.InfovehiculoService.getNacionalidades();
    this.nacionalidadsel = { NacString: 'MEXICANA', NacClave: 'MEX' };
    this.Ocup = this.InfovehiculoService.getOcupaciones();
    this.EsCivs = this.InfovehiculoService.getEstadoCivil();
    this.getUbicacion();
    const meses = [{nom: 'Enero', id: 1}, {nom: 'Febrero', id: 2}, {nom: 'Marzo', id: 3},
    {nom: 'Abril', id: 4}, {nom: 'Mayo', id: 5}, {nom: 'Junio', id: 6},
    {nom: 'Julio', id: 7}, {nom: 'Agosto', id: 8}, {nom: 'Septiembre', id: 9},
    {nom: 'Octubre', id: 10}, {nom: 'Noviembre', id: 11}, {nom: 'Diciembre', id: 12}];
    meses.forEach(element => {
      if (this.fecha.mes === element.nom){
        this.mesnac = element.id;
      }
    });
    this.anionac = Number(this.fecha.anio);
    this.dianac = Number(this.fecha.dia);
    this.fechanaciaseg = {
      year: this.anionac,
      month: this.mesnac,
      day: this.dianac
    };
    this.edad = this.calculaedad(this.fechanaciaseg);
    this.verificaCompletoNom(this.nombre);
  }

}
