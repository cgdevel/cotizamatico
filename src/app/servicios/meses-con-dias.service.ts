import { Injectable } from '@angular/core';
import { element } from 'protractor';
import {Mesesbisiynobisi} from '../interphaces/mesesbisiynobisi';
import { CatalogoModel } from '../interphaces/models/Catalogos.model';
@Injectable({
  providedIn: 'root'
})
export class MesesConDiasService {
Months: CatalogoModel[] = [];
Meses: Mesesbisiynobisi[] = [];

  year: number;
  bisiesto: boolean;
  constructor() { }
getMesesconDuracion(annio?: string){
  this.Months = [];

  this.Meses.push(
    {IdMes: 1,
    NombreMes: 'Enero',
    DuracionBisi: 31,
    DuracionNoBisi: 31},
    {IdMes: 2,
    NombreMes: 'Febrero',
    DuracionBisi: 29,
    DuracionNoBisi: 28},
    {IdMes: 3,
    NombreMes: 'Marzo',
    DuracionBisi: 31,
    DuracionNoBisi: 31},
    {IdMes: 4,
    NombreMes: 'Abril',
    DuracionBisi: 30,
    DuracionNoBisi: 30},
    {IdMes: 5,
    NombreMes: 'Mayo',
    DuracionBisi: 31,
    DuracionNoBisi: 31},
    {IdMes: 6,
    NombreMes: 'Junio',
    DuracionBisi: 30,
    DuracionNoBisi: 30},
    {IdMes: 7,
    NombreMes: 'Julio',
    DuracionBisi: 31,
    DuracionNoBisi: 31},
    {IdMes: 8,
    NombreMes: 'Agosto',
    DuracionBisi: 31,
    DuracionNoBisi: 31},
    {IdMes: 9,
    NombreMes: 'Septiembre',
    DuracionBisi: 30,
    DuracionNoBisi: 30},
    {IdMes: 10,
    NombreMes: 'Octubre',
    DuracionBisi: 31,
    DuracionNoBisi: 31},
    {IdMes: 11,
    NombreMes: 'Noviembre',
    DuracionBisi: 30,
    DuracionNoBisi: 30},
    {IdMes: 12,
    NombreMes: 'Diciembre',
    DuracionBisi: 31,
    DuracionNoBisi: 31}
    );
    // console.log(this.Months.length)
  if (annio === '') {
    const today = new Date();
    this.year = today.getFullYear();
    this.year % 4 === 0  ? (this.year % 100 === 0 ? (this.year % 400 === 0 ? (this.bisiesto = true) :
    (this.bisiesto = false)) : (this.bisiesto = true)) : (this.bisiesto = false);
    if (this.bisiesto) {
      for (let index = 0; index < 12; index++) {
        const element = this.Meses[index].NombreMes.toString();
        const indexS = this.Meses[index].DuracionBisi.toString();
        this.Months.push({sLlave: indexS, sDato: element});
      }
      return this.Months;
    } else {
      for (let index = 0; index < 12; index++) {
        const element = this.Meses[index].NombreMes.toString();
        const indexS = this.Meses[index].DuracionNoBisi.toString();
        this.Months.push({sLlave: indexS, sDato: element});
      }
      return this.Months;
      }
  } else {
    if (annio!=='') {
      
      // console.log(annio);
    this.year = parseInt(annio,10);
    // console.log(this.year);
    this.year % 4 === 0  ? (this.year % 100 === 0 ? (this.year % 400 === 0 ? (this.bisiesto = true) :
  (this.bisiesto = false)) : (this.bisiesto = true)) : (this.bisiesto = false);
    if (this.bisiesto== true) {
      this.Months = [];
      for (let index = 0; index < 12; index++) {
        const element = this.Meses[index].NombreMes.toString();
        const indexS = this.Meses[index].DuracionBisi.toString();
        this.Months.push({sLlave: indexS, sDato: element});
      }
      return this.Months;
    } else {
      this.Months = [];
      for (let index = 0; index < 12; index++) {
        const element = this.Meses[index].NombreMes.toString();
        const indexS = this.Meses[index].DuracionNoBisi.toString();
        this.Months.push({sLlave: indexS, sDato: element});
      }
      return this.Months;
      }
    }
  }
}

getAnnioSinMesesniDia(){
const anios: CatalogoModel[] = [];
const anioInicio = new Date().getFullYear() - 18;
const anioFin = new Date().getFullYear() - 75;
for (let i = anioInicio; i >= anioFin; i--) {
  anios.push({ sLlave: i.toString(), sDato: i.toString() });
}
return anios;
}

getdiassinnada(){
  const days: CatalogoModel[] = [];
  for (let index = 1; index <= 31; index++) {
    days.push({sDato: index.toString(), sLlave: index.toString()});
  }
  return days;
}

}
