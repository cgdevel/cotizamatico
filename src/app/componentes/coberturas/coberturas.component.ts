import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coberturas',
  templateUrl: './coberturas.component.html',
  styleUrls: ['./coberturas.component.css'],
})
export class CoberturasComponent implements OnInit {
  @Input() cobertura: number;
  materialDamage: number = 0;
  totalTheft: number = 0;
  medicalExpenses : number = 0;
  civilLiability :number = 0;
  legalAssitance: boolean;
  driverAccident : number = 0;
  assitanceServicio: boolean;
  carSubstitute: boolean;
  EliminacionDeducible: boolean;
  constructor() {}
  ngOnInit(): void {
    this.materialDamage=5;
    this.totalTheft=10;
    this.medicalExpenses= 50000;
    this.civilLiability= 1500000;
    this.driverAccident= 100000;
  }

  setMaterialDamage(event) {
    this.materialDamage = event.target.valueAsNumber;
    console.log(this.materialDamage);
  }
  settotalTheft(event){
    this.totalTheft = event.target.valueAsNumber;
    console.log(this.totalTheft);
  }

  setmedicalExpenses(event){
    this.medicalExpenses = event.target.valueAsNumber;
    console.log(this.medicalExpenses);
  }

  setlegalAssitance(event){
    this.legalAssitance=event.target.checked
    console.log(this.legalAssitance);
   }

  setcivilLiability(event){
    this.civilLiability = event.target.valueAsNumber;
    console.log(this.civilLiability)
  }
  setdriverAccident(event){
    this.driverAccident = event.target.valueAsNumber;
    console.log(this.driverAccident)
  }
  setassitanceServicio(event){
    this.assitanceServicio = event.target.checked
    console.log(this.assitanceServicio);
  }
  setcarSubstitute(event){
    this.carSubstitute = event.target.checked
    console.log(this.carSubstitute);
  }
  setEliminacionDeducible(event){
    this.EliminacionDeducible = event.target.checked
    console.log(this.EliminacionDeducible);
  }
}
