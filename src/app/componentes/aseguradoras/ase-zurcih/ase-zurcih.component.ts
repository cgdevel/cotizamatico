import { Component, OnInit , Input} from '@angular/core';
import {InfovehiculoService} from '../../../servicios/infovehiculo.service';
@Component({
  selector: 'app-ase-zurcih',
  templateUrl: './ase-zurcih.component.html',
  styleUrls: ['./ase-zurcih.component.css']
})
export class AseZURCIHComponent implements OnInit{
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
  NombreBenefPrefFis = '';
  RFCBenefPrefFis = '';
  RFCBenefPrefFisBeneficiario  = '';
  NombreConductor = '';
  RFCConductor   = '';
  NombreBenefPrefMoral = '';
  RFCBenefPrefMoralBeneficiario = '';
  NombreConductorMoral = '';
  RFCConductorMoral = '';
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
  RFCBenefPrefFisBeneficiarioVacio: boolean;
  RFCBenefPrefFisBeneficiarioNoValido: boolean;
  RFCConductorVacio: boolean;
  RFCConductorNoValido: boolean;
  RFCBenefPrefMoralBeneficiarioVacio: boolean;
  RFCBenefPrefMoralBeneficiarioNoValido: boolean;
  RFCConductorMoralVacio: boolean;
  RFCConductorMoralNoValido: boolean;
  rfcbool: boolean;
  showFis: boolean;
  showMor: boolean;
  constructor(private InfovehiculoService: InfovehiculoService) { }
  ngOnInit(): void {
    this.mediopag = this.MediosDePago[0].name;
    this.valClienteNumSerieVacio = false;
    this.valClienteNumSerieNoValido = false;
    this.valClienteRFCNoValido = false;
    this.valClienteRFCVacio = false;
    this.valClienteNumExtNoValido = false;
    this.valClienteNumExtVacio = false;
    this.RFCBenefPrefFisBeneficiarioVacio  = false;
    this.RFCBenefPrefFisBeneficiarioNoValido  = false;
    this.RFCBenefPrefMoralBeneficiarioVacio = false;
    this.RFCBenefPrefMoralBeneficiarioNoValido = false;
    this.RFCConductorMoralVacio = false;
    this.RFCConductorMoralNoValido = false;
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
    // console.log(this.InfovehiculoService.Nacionalidades)
    // console.log(this.NacionalitiesService.getNacionalidades());
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
        this.valClienteRFCNoValido = true;
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
    muestraDaBePrefFis(){
      this. showFis = !this. showFis;
    }
    muestraDaBePrefMor(){
      this. showMor = !this. showMor;
    }
    RFCBenefPrefFisBeneficiarioChange(){
      if (this.RFCBenefPrefFisBeneficiario !== '') {
        this.RFCBenefPrefFisBeneficiarioVacio = false;
        const reg = /([A-Z a-z]{4})([0-9]{9})/;
        this.rfcbool = reg.test(this.RFCBenefPrefFisBeneficiario);
        this.RFCBenefPrefFisBeneficiario = this.RFCBenefPrefFisBeneficiario.toLocaleUpperCase();
        this.rfcbool ? this.RFCBenefPrefFisBeneficiarioNoValido = false : this.RFCBenefPrefFisBeneficiarioNoValido = true;
      }else{
        this.RFCBenefPrefFisBeneficiarioVacio = true;
        this.RFCBenefPrefFisBeneficiarioNoValido = false;
      }
    }
    RFCConductorChange(){
      if (this.RFCConductor !== ''){
        this.RFCConductorVacio = false;
        const reg = /([A-Z a-z ]{4})([0-9]{9})/;
        this.rfcbool = reg.test(this.RFCConductor);
        this.RFCConductor = this.RFCConductor.toLocaleUpperCase();
        this.rfcbool ? this.RFCConductorNoValido = false : this.RFCConductorNoValido = true;
      }else{
        this.RFCConductorVacio = true;
        this.RFCConductorNoValido = false;
      }
    }
    RFCBenefPrefMoralBeneficiarioChange(){
      if (this.RFCBenefPrefMoralBeneficiario !== ''){
        this.RFCBenefPrefMoralBeneficiarioVacio = false;
        const reg = /([A-Z a-z ]{3})([0-9]{9})/;
        this.rfcbool = reg.test(this.RFCBenefPrefMoralBeneficiario);
        this.RFCBenefPrefMoralBeneficiario = this.RFCBenefPrefMoralBeneficiario.toLocaleUpperCase();
        this.rfcbool ? this.RFCBenefPrefMoralBeneficiarioNoValido = false : this.RFCBenefPrefMoralBeneficiarioNoValido = true;
      }else{
        this.RFCBenefPrefMoralBeneficiarioVacio = true;
        this.RFCBenefPrefMoralBeneficiarioNoValido = false;
      }
    }
    RFCConductorMoralChange(){
      if (this.RFCConductorMoral !== ''){
        this.RFCConductorMoralVacio = false;
        const reg = /([A-Z a-z ]{4})([0-9]{9})/;
        this.rfcbool = reg.test(this.RFCConductorMoral);
        this.RFCConductorMoral = this.RFCConductorMoral.toLocaleUpperCase();
        this.rfcbool ? this.RFCConductorMoralNoValido = false : this.RFCConductorMoralNoValido = true;
      }else{
        this.RFCConductorMoralVacio = true;
        this.RFCConductorMoralNoValido = false;
      }
    }
}
