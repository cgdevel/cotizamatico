import { Component, OnInit, Input } from '@angular/core';
import {RequestNacionalidad } from '../../../../app/interphaces/nacionali';
import {NacionalitiesService} from '../../../servicios/nacionalities.service';
import {InfovehiculoService} from '../../../servicios/infovehiculo.service';

@Component({
  selector: 'app-ase-axxa',
  templateUrl: './ase-axxa.component.html',
  styleUrls: ['./ase-axxa.component.css']
})
export class AseAXXAComponent implements OnInit {
  @Input() mujer: boolean;
  @Input() hombre: boolean;
  @Input() empresa: boolean;
  @Input()  CP = '';
  @Input()  edad: number;
  @Input()  Nombre = '';
  @Input()  ApellidoP = '';
  @Input()  ApellidoM = '';
  @Input()  Mes = '';
  @Input()  Dia: number;
  @Input() generarfcaccu;
  Nacion = new Array<RequestNacionalidad>();
  year;
  month;
  // VARIABLES CP
  ubicacion: any;
  ubicacionId: number;
  estado: string;
  municipio: string;
  RFC: string;
  nacionalidadsel;
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
  constructor(private InfovehiculoService: InfovehiculoService, private NacionalitiesService: NacionalitiesService) { }

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
    if (si === true) {
      this.RFC = '';
      this.Nombre = this.Nombre.toUpperCase();
      console.log(this.nacionalidadsel.NacString + ' ' + this.Nombre);
      if (this.nacionalidadsel.NacString !== 'MEXICANA'){
          let str = new String(this.naciye);
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
          let str = new String(this.naciye);
          let n = this.Nombre.indexOf(' ');
          let strnmate = this.Nombre.charAt(n + 1);
          let t = this.Nombre.lastIndexOf(' ') + 1;
          let strnom = this.Nombre.charAt(t);
          let strnpate = this.Nombre.charAt(0) + this.Nombre.charAt(1);
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
      if (this.ApellidoM !== '' && this.ApellidoP !== '' && this.Nombre !== ''){
        if (this.nacionalidadsel.NacString !== 'MEXICANA'){
          let str = new String(this.naciye);
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
          let str = new String(this.naciye);
          let strnpate = apep.charAt(0) + apep.charAt(1);
          let strnmate = apem.charAt(0);
          let strnom = nom.charAt(0);
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

    ngOnInit(): void {
      this.meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      let today = new Date();
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
      this.getrfc(this.generarfcaccu);
    // this.NacionalitiesService.getNacionalidades()
    // console.log(this.InfovehiculoService.Nacionalidades)
      this.Nacion = this.NacionalitiesService.getNacionalidades();
    // console.log(this.Nacion)
    }// Init


}
