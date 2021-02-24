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
Dias: CatalogoModel[] = [];
  year: number;
  bisiesto: boolean;
  constructor() { }
getMesesconDuracion(){
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
  const today = new Date();
  this.year = today.getFullYear();
  this.year % 4 === 0  ? (this.year % 100 === 0 ? (this.year % 400 === 0 ? (this.bisiesto = true) :
  (this.bisiesto = false)) : (this.bisiesto = true)) : (this.bisiesto = false);
  if (this.bisiesto) {
    for (let index = 0; index < this.Meses.length; index++) {
      const element = this.Meses[index].NombreMes.toString();
      const indexS = this.Meses[index].DuracionBisi.toString();
      this.Months.push({sLlave: indexS, sDato: element});
    }
    return this.Months;
  } else {
    for (let index = 0; index < this.Meses.length; index++) {
      const element = this.Meses[index].NombreMes.toString();
      const indexS = this.Meses[index].DuracionNoBisi.toString();
      this.Months.push({sLlave: indexS, sDato: element});
    }
    return this.Months;
    }
}
getDiasSinMesSinAnnio(){
  for (let i = 1; i <= 31; i--) {
    this.Dias.push({ sLlave: i.toString(), sDato: i.toString() });
  }
  console.log(this.Dias);
  return this.Dias;
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

}
