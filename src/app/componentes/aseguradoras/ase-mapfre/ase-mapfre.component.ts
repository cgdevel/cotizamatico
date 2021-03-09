import { Component, Input, OnInit } from '@angular/core';
import {InfovehiculoService} from '../../../servicios/infovehiculo.service';
import { CatalogoModel } from '../../../interphaces/models/Catalogos.model';
import { FechasModel } from '../../../interphaces/models/Fechas.model';
import { MesesConDiasService } from '../../../servicios/meses-con-dias.service';
import { Console } from 'console';
@Component({
  selector: 'app-ase-mapfre',
  templateUrl: './ase-mapfre.component.html',
  styleUrls: ['./ase-mapfre.component.css']
})
export class AseMAPFREComponent implements OnInit {
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
  mediopag = '';
  BenefPrefFis = '';
  BenefPrefMor = '';
  MediosDePago = [
    { id: 1, name: 'Efectivo', avatar: '../../../assets/iconos/iconmonstr-banknote-15.svg' },
    { id: 2, name: 'Tarjeta de crédito', avatar: '../../../assets/iconos/iconmonstr-credit-card-6.svg' },
    { id: 3, name: 'Tarjeta de débito' , avatar: '../../../assets/iconos/iconmonstr-credit-card-6.svg'}
];
  year;
  month;
  // VARIABLES CP
  ubicacion: any;
  ubicacionId: number;
  estado: string;
  municipio: string;
  RFC: string;
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
  catNacimientoDias: CatalogoModel[];
  catNacimientoMeses: CatalogoModel[];
  catNacimientoAnios: CatalogoModel[];
  itemNacimientoDiaBenefPrefFis: CatalogoModel;
  itemNacimientoMesBenefPrefFis: CatalogoModel;
  itemNacimeintoAnioBenefPrefFis: CatalogoModel;
  itemNacimientoDiaBenefPrefMor: CatalogoModel;
  itemNacimientoMesBenefPrefMor: CatalogoModel;
  itemNacimeintoAnioBenefPrefMor: CatalogoModel;
  constructor(
    private InfovehiculoService: InfovehiculoService,
    private MesesConDias: MesesConDiasService) { }
    ngOnInit(): void {
      this.mediopag = this.MediosDePago[0].name;
      this.valClienteNumSerieVacio = false;
      this.valClienteNumSerieNoValido = false;
      this.valClienteRFCNoValido = false;
      this.valClienteRFCVacio = false;
      this.valClienteNumExtNoValido = false;
      this.valClienteNumExtVacio = false;
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
      this.catNacimientoAnios = this.MesesConDias.getAnnioSinMesesniDia();
      this.catNacimientoMeses = this.MesesConDias.getMesesconDuracion();
      this.catNacimientoDias = this.MesesConDias.getdiassinnada();
    }// Init

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
      if (this.ApellidoM !== '' && this.ApellidoP !== '' && this.Nombre !== '' && !si){
          apep = this.ApellidoP;
          apem = this.ApellidoM;
          nom = this.Nombre;
          apep = apep.toUpperCase();
          apem = apem.toUpperCase();
          nom = nom.toUpperCase();
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
    } else if (si && this.Nombre !== '') {
      const str = String(this.naciye);
      const n = this.Nombre.indexOf(' ');
      const strnmate = this.Nombre.charAt(n + 1);
      const t = this.Nombre.lastIndexOf(' ') + 1;
      const strnom = this.Nombre.charAt(t);
      const strnpate = this.Nombre.charAt(0) + this.Nombre.charAt(1);
      if (this.nummonth < 10 && this.Dia < 10){
        this.RFC = strnpate + strnmate + strnom + str.charAt(2) + str.charAt(3) + '0' + this.nummonth + '0' + this.Dia + 'XXX';
        this.RFC = this.RFC.toLocaleUpperCase();
      }else {
        if (this.nummonth < 10 && this.Dia >= 10) {
          this.RFC = strnpate + strnmate + strnom + str.charAt(2) + str.charAt(3) + '0' + this.nummonth + this.Dia + 'XXX';
          this.RFC = this.RFC.toLocaleUpperCase();
        } else {
          if (this.nummonth >= 10 && this.Dia < 10) {
            this.RFC = strnpate + strnmate + strnom + str.charAt(2) + str.charAt(3) + this.nummonth + '0' + this.Dia + 'XXX';
            this.RFC = this.RFC.toLocaleUpperCase();
          }else {
            if (this.nummonth >= 10 && this.Dia >= 10) {
              this.RFC = strnpate + strnmate + strnom + str.charAt(2) + str.charAt(3) + this.nummonth + this.Dia + 'XXX';
              this.RFC = this.RFC.toLocaleUpperCase();
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
      if (this.RFC === '') {
        this.valClienteRFCNoValido = false;
        this.valClienteRFCVacio = true;
      }else{
        if (this.RFC !== '') {
          this.valClienteRFCVacio = false;
          const reg = /([A-Z]{4})([0-9]{9})/;
          this.rfcbool = reg.test(this.RFC);
          console.log(this.rfcbool);
          this.rfcbool ? this.valClienteRFCNoValido = false : this.valClienteRFCNoValido = true;
        }
      }
    }
    onNumExtChange(){
      if (!this.NomExterior) {
        this.valClienteNumExtVacio = true;
      } else {
        if (this.NomExterior.length < 5){
          this.valClienteNumExtVacio = false;
          this.valClienteNumExtNoValido = true;
        }else{
          this.valClienteNumExtNoValido = false;
          this.valClienteNumExtVacio = false;
        }
      }
    }

    selectNacimientoDiaBenefPrefFis(){
    }
    selectNacimientoMesBenefPrefFis(){
      console.log(this.itemNacimientoMesBenefPrefFis);
      if (this.itemNacimientoMesBenefPrefFis.sDato !== '') {
        if (this.itemNacimientoDiaBenefPrefFis !== undefined && this.itemNacimeintoAnioBenefPrefFis === undefined){
          const no = Number(this.itemNacimientoMesBenefPrefFis.sLlave);
          this.catNacimientoDias = [];
          const noo = Number(this.itemNacimientoDiaBenefPrefFis.sDato);
          if ( noo > no) {
            this.itemNacimientoDiaBenefPrefFis = {sDato: '', sLlave: ''};
            this.catNacimientoDias = this.dameduracion(this.itemNacimientoMesBenefPrefFis.sLlave);
          }else{
            this.catNacimientoDias = this.dameduracion(this.itemNacimientoMesBenefPrefFis.sLlave);
            this.itemNacimientoDiaBenefPrefFis = this.itemNacimientoDiaBenefPrefFis;
          }
          
        }else if(this.itemNacimientoDiaBenefPrefFis === undefined && this.itemNacimeintoAnioBenefPrefFis !== undefined){
          this.catNacimientoMeses = [];
          this.catNacimientoDias = [];
          this.catNacimientoMeses = this.MesesConDias.getMesesconDuracion(this.itemNacimeintoAnioBenefPrefFis.sDato);
          this.catNacimientoDias = this.dameduracion(this.itemNacimientoMesBenefPrefFis.sLlave);
        }
      }
    }
    selectNacimientoAnioBenefPrefFis(){
      if (this.itemNacimeintoAnioBenefPrefFis.sDato !== ''){
        if (this.itemNacimientoMesBenefPrefFis !== undefined && this.itemNacimientoDiaBenefPrefFis === undefined){
          this.catNacimientoMeses = [];
          this.catNacimientoDias = [];
          this.catNacimientoMeses = this.MesesConDias.getMesesconDuracion(this.itemNacimeintoAnioBenefPrefFis.sDato);
          this.catNacimientoDias = this.dameduracion(this.itemNacimientoMesBenefPrefFis.sLlave);
        }else if (this.itemNacimientoMesBenefPrefFis !== undefined && this.itemNacimientoDiaBenefPrefFis !== undefined) {
          this.catNacimientoMeses = this.MesesConDias.getMesesconDuracion(this.itemNacimeintoAnioBenefPrefFis.sDato);
          this.catNacimientoDias = this.dameduracion(this.itemNacimientoMesBenefPrefFis.sLlave);
        }else if(this.itemNacimientoMesBenefPrefFis == undefined && this.itemNacimientoDiaBenefPrefFis === undefined){
          this.catNacimientoMeses = [];
          this.catNacimientoMeses = this.MesesConDias.getMesesconDuracion(this.itemNacimeintoAnioBenefPrefFis.sDato);
        }
      }
    }
    selectNacimientoDiaBenefPrefMor(){

    }
    selectNacimientoMesBenefPrefMor(){

    }
    selectNacimientoAnioBenefPrefMor(){

    }
    dameduracion( mes: string){
      const numeromes = Number(mes);
      const mesdura: CatalogoModel[] = [];
      // console.log(numeromes);
      for (let index = 1; index <= numeromes ; index++) {
        mesdura.push({sLlave: index.toString(), sDato : index.toString()});
      }
      // console.log(mesdura);
      return mesdura;
    }
}
