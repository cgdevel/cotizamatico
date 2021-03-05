import { Component, Input, OnInit } from '@angular/core';
import {RequestNacionalidad } from '../../../../app/interphaces/nacionali';
import {InfovehiculoService} from '../../../servicios/infovehiculo.service';

@Component({
  selector: 'app-ase-chubb',
  templateUrl: './ase-chubb.component.html',
  styleUrls: ['./ase-chubb.component.css']
})
export class AseCHUBBComponent implements OnInit { 
  @Input() mujercontrata: boolean;
  @Input() hombrecontrata: boolean;
  @Input() empresacontrata: boolean;
  @Input()  CP = '';
  @Input()  edad: number;
  @Input()  Nombre = '';
  @Input()  ApellidoP = '';
  @Input()  ApellidoM = '';
  @Input()  Mes = '';
  @Input()  Dia: number;
  @Input() generarfcaccu: boolean;
  @Input() Pago = '';
  mediopag='';
  BenefPrefFis='';
  BenefPrefMor='';
  MediosDePago= [
    { id: 1, name: 'Efectivo',avatar:'../../../assets/iconos/iconmonstr-banknote-15.svg' },
    { id: 2, name: 'Tarjeta de crédito',avatar:'../../../assets/iconos/iconmonstr-credit-card-6.svg' },
    { id: 3, name: 'Tarjeta de débito' ,avatar:'../../../assets/iconos/iconmonstr-credit-card-6.svg'}
];
  Nacion = new Array<RequestNacionalidad>();
  year;
  month;
  // VARIABLES CP
  ubicacion: any;
  ubicacionId: number;
  estado: string;
  municipio: string;
  RFC: string;
  nacionalidadsel: RequestNacionalidad;
  item = '';
  cols: {
    iIdUbicacion: number,
    sUbicacion: string }[];
  coloniasel;
  NomInterior: string;
  NomExterior: string;
  meses: string[];
  naciye: number;
  nummonth: number;
  genero: string;
  mujer: boolean;
  hombre: boolean;
  empresa: boolean;
  numdeserie: string;
  valClienteNumSerieVacio: boolean;
  valClienteNumSerieNoValido: boolean;
  numdeplacas: string;
  valClienteNumPlacasNoValido: boolean;
  valClienteNumPlacasVacio: boolean;
  numdeMotor: string;
  valClienteNumMotorNoValido: boolean;
  valClienteNumMotorVacio: boolean;
  valClienteRFCNoValido: boolean;
  valClienteRFCVacio: boolean;
  valClienteNumExtNoValido: boolean;
  valClienteNumExtVacio: boolean;
  rfcbool: boolean;
  constructor(private InfovehiculoService: InfovehiculoService) { }
    getUbicacion(){
      this.InfovehiculoService.getApiCPs({
        IdAplication: 2,
        NombreCatalogo: 'Sepomex',
        Filtro: this.CP
      }).subscribe((data: any) => {
        this.ubicacion = JSON.parse(data.CatalogoJsonString);
        console.log(this.ubicacion);
        this.estado = this.ubicacion[0].Municipio.Estado.sEstado;
        this.municipio = this.ubicacion[0].Municipio.sMunicipio;
        this.cols = this.ubicacion[0].Ubicacion;
        }); // suscribecierra
    }
    getrfc(si?: boolean, apep ?: string, apem ?: string, nom?: string){
      this.valClienteRFCNoValido= false;
      this.valClienteRFCVacio= false;
    // console.log(si);
    if (si === true) {
      this.RFC = '';
      this.Nombre = this.Nombre.toUpperCase();
      console.log(this.nacionalidadsel.NacString + ' ' + this.Nombre);
      if (this.nacionalidadsel.NacString !== 'MEXICANA'){
          const str = String(this.naciye);
          if (this.nummonth < 10 && this.Dia < 10) {
            this.RFC = 'XXXX' + str.charAt(2) + str.charAt(3) + '0' + this.nummonth + '0' + this.Dia + 'XXX';
          }else {  if (this.nummonth >= 10 &&  this.Dia >= 10) {
              this.RFC = 'XXXX' + str.charAt(2) + str.charAt(3) + this.nummonth + this.Dia + 'XXX';
            }else {if (this.nummonth < 10 &&  this.Dia >= 10) {
                this.RFC = 'XXXX' + str.charAt(2) + str.charAt(3) + '0' + this.nummonth + this.Dia + 'XXX';
              }else { if (this.nummonth >= 10 &&  this.Dia < 10) {
                  this.RFC = 'XXXX' + str.charAt(2) + str.charAt(3) + this.nummonth + '0' + this.Dia + 'XXX';
                }
              }
            }
          }
        }else {
          const str = String(this.naciye);
          const n = this.Nombre.indexOf(' ');
          const strnmate = this.Nombre.charAt(n + 1);
          const t = this.Nombre.lastIndexOf(' ') + 1;
          const strnom = this.Nombre.charAt(t);
          const strnpate = this.Nombre.charAt(0) + this.Nombre.charAt(1);
          if (this.nummonth < 10 && this.Dia < 10){
            this.RFC = strnpate + strnmate + strnom + str.charAt(2) + str.charAt(3) + '0' + this.nummonth + '0' + this.Dia + 'XXX';
          }else {
            if (this.nummonth < 10 && this.Dia >= 10) {
              this.RFC = strnpate + strnmate + strnom + str.charAt(2) + str.charAt(3) + '0' + this.nummonth + this.Dia + 'XXX';
            } else {
              if (this.nummonth >= 10 && this.Dia < 10) {
                this.RFC = strnpate + strnmate + strnom + str.charAt(2) + str.charAt(3) + this.nummonth + '0' + this.Dia + 'XXX';
              }else {
                if (this.nummonth >= 10 && this.Dia >= 10) {
                  this.RFC = strnpate + strnmate + strnom + str.charAt(2) + str.charAt(3) + this.nummonth + this.Dia + 'XXX';
                }
              }
            }
          }
        }
    } else {
      if (this.ApellidoM !== '' && this.ApellidoP !== '' && this.Nombre !== '' &&  this.nacionalidadsel.NacString !== ''){
        if (this.nacionalidadsel.NacString !== 'MEXICANA'){
          const str = String(this.naciye);
          if (this.nummonth < 10 && this.Dia < 10) {
            this.RFC = 'XXXX' + str.charAt(2) + str.charAt(3) + '0' + this.nummonth + '0' + this.Dia + 'XXX';
          }else {  if (this.nummonth >= 10 &&  this.Dia >= 10) {
              this.RFC = 'XXXX' + str.charAt(2) + str.charAt(3) + this.nummonth + this.Dia + 'XXX';
            }else {if (this.nummonth < 10 &&  this.Dia >= 10) {
                this.RFC = 'XXXX' + str.charAt(2) + str.charAt(3) + '0' + this.nummonth + this.Dia + 'XXX';
              }else { if (this.nummonth >= 10 &&  this.Dia < 10) {
                  this.RFC = 'XXXX' + str.charAt(2) + str.charAt(3) + this.nummonth + '0' + this.Dia + 'XXX';
                }
              }
            }
          }
        }else{
          nom = nom.toUpperCase();
          apep = apep.toUpperCase();
          apem = apem.toUpperCase();
          const str = String(this.naciye);
          const strnpate = apep.charAt(0) + apep.charAt(1);
          const strnmate = apem.charAt(0);
          const strnom = nom.charAt(0);
          if (this.nummonth < 10 && this.Dia < 10){
            this.RFC = strnpate + strnmate + strnom + str.charAt(2) + str.charAt(3) + '0' + this.nummonth + '0' + this.Dia + 'XXX';
          }else {
            if (this.nummonth < 10 && this.Dia >= 10) {
              this.RFC = strnpate + strnmate + strnom + str.charAt(2) + str.charAt(3) + '0' + this.nummonth + this.Dia + 'XXX';
            } else {
              if (this.nummonth >= 10 && this.Dia < 10) {
                this.RFC = strnpate + strnmate + strnom + str.charAt(2) + str.charAt(3) + this.nummonth + '0' + this.Dia + 'XXX';
              }else {
                if (this.nummonth >= 10 && this.Dia >= 10) {
                  this.RFC = strnpate + strnmate + strnom + str.charAt(2) + str.charAt(3) + this.nummonth + this.Dia + 'XXX';
                }
              }
            }
          }
        }
      }
    }
    }// rfc
    onNumSeChange(){
      if (this.numdeserie === '') {
        this.valClienteNumSerieVacio = true;
      }else{
        if ( this.numdeserie.length < 17 ) {
          this.valClienteNumSerieNoValido = true;
        } else {
          this.valClienteNumSerieVacio = false;
          this.valClienteNumSerieNoValido = false;
        }
      }
    }
    onNumPlaChange(){
      if (this.numdeplacas === '') {
        this.valClienteNumPlacasVacio = true;
      }else{
        if ( this.numdeplacas.length < 17 ) {
          this.valClienteNumPlacasNoValido = true;
        } else {
          this.valClienteNumPlacasVacio = false;
          this.valClienteNumPlacasNoValido = false;
        }
      }
    }
    onNumMotorChange(){
      if (this.numdeMotor === '') {
        this.valClienteNumMotorVacio = true;
      }else{
        if ( this.numdeMotor.length < 17 ) {
          this.valClienteNumMotorNoValido = true;
        } else {
          this.valClienteNumMotorVacio = false;
          this.valClienteNumMotorNoValido = false;
        }
      }
    }
    onRFCChange(){
      if (!this.RFC && this.nacionalidadsel.NacString=='MEXICANA') {
        this.valClienteRFCNoValido= true;
        this.valClienteRFCVacio= true;
      }else{
        if (!!this.RFC && this.nacionalidadsel.NacString=='MEXICANA') {
          this.valClienteRFCVacio=false;
          const reg =/([A-Z]{4})([0-9]{9})/;
          this.rfcbool = reg.test(this.RFC);
          console.log(this.rfcbool)
          this.rfcbool ? this.valClienteRFCNoValido=false : this.valClienteRFCNoValido=true;
        }
      }
    }
    onNumExtChange(){
      if (!this.NomExterior) {
        this.valClienteNumExtVacio=true;
      } else {
        if(this.NomExterior.length<5){
          this.valClienteNumExtVacio=false;
          this.valClienteNumExtNoValido=true;
        }else{
          this.valClienteNumExtNoValido=false;
          this.valClienteNumExtVacio=false;
        }
      }
    }
    ngOnInit(): void {
      this.mediopag=this.MediosDePago[0].name;
      this.valClienteNumSerieVacio = false;
      this.valClienteNumSerieNoValido = false;
      this.valClienteRFCNoValido= false;
      this.valClienteRFCVacio= false;
      this.valClienteNumExtNoValido= false;
      this.valClienteNumExtVacio= false;
      this.meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const today = new Date();
      this.year = today.getFullYear();
      this.month = today.getMonth();
      // console.log(this.month)
      for (let index = 0; index < this.meses.length; index++) {
        const element = this.meses[index];
        if (element === this.Mes) {
          // console.log(index)
          if (this.month >= index) {
            this.nummonth = index + 1;
            this.naciye = this.edad;
            !!this.edad ? this.edad = this.year - this.edad : this.edad = 0;
            // console.log( "ya los cumpliste"+" "+this.edad)
          }else{
            this.nummonth = index + 1;
            this.naciye = this.edad;
            this.year = this.year - 1;
            !!this.edad ? this.edad = this.year - this.edad : this.edad = 0;
            // console.log(this.edad)
          }
        }
      }
      this.getUbicacion();
      this.Nacion = this.InfovehiculoService.getNacionalidades();
      this.getrfc(this.generarfcaccu);
      console.log(this.mujer);
      // console.log(this.InfovehiculoService.Nacionalidades)
      // console.log(this.NacionalitiesService.getNacionalidades());
    }// Init

}


