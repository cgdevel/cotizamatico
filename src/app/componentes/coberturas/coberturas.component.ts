import { Component, OnInit, Input } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-coberturas',
  templateUrl: './coberturas.component.html',
  styleUrls: ['./coberturas.component.css'],
})
export class CoberturasComponent implements OnInit {
  @Input() cobertura: number ;
  @Input() polizaSelect: string ;
  @Input() valueDamage: number;
  @Input() valuetotalTheft: number;
  carSubstitute: boolean;
  EliminacionDeducible: boolean;
  premiumReturn: boolean;
  foreignLiability: boolean;
  liabilityExtension: boolean;
  deductible: boolean;
  partialTheft : boolean;
  tireInsurance: boolean;
  transportationExpenses : boolean;
  agencyRepair : boolean;
  constructor() {}
  ngOnInit(): void {
  }
 
  optionsDamage: Options = {
    stepsArray: [
      { value: 3 },
      { value: 5 },
      { value: 10}
    ],
    translate: (value: number): string => {
      return value + '%';
    }
  };
  optionstotalTheft: Options = {
    floor: 5,
    ceil: 20,
    step: 5,
    translate: (value: number): string => {
      return value + '%';
    }
  };
  valuecivilLiability: number =  1500000;
  optionscivilLiability: Options = {
    floor: 1000000,
    ceil: 5000000,
    step: 500000
  };
  valuemedicalExpenses: number =  50000;
  optionsmedicalExpenses: Options = {
    stepsArray: [
      { value: 50000 },
      { value: 80000 },
      { value: 100000}
    ]
  };
  
valuedriverAccident: number =  100000;
optionsdriverAccident: Options = {
  floor: 100000,
  ceil: 250000,
  step: 50000
};
  setcarSubstitute(event){
    this.carSubstitute = event.target.checked;
    console.log(this.carSubstitute);
  }
  setEliminacionDeducible(event){
    this.EliminacionDeducible = event.target.checked;
    console.log(this.EliminacionDeducible);
  }
  setpremiumReturn(event){
    this.premiumReturn= event.target.checked;
    console.log(this.premiumReturn);
  }
  setforeignLiability(event){
    this.foreignLiability = event.target.checked;
    console.log(this.foreignLiability);
  }
setliabilityExtension(event){
    this.liabilityExtension = event.target.checked;
    console.log(this.liabilityExtension);
  }
  setdeductible(event){
    this.deductible = event.target.checked;
    console.log(this.deductible);
  }
  setpartialTheft(event){
    this.partialTheft = event.target.checked;
    console.log(this.partialTheft);
  }
  
settireInsurance(event){
  this.tireInsurance = event.target.checked;
  console.log(this.tireInsurance);
}
valueocuppantsLiability: number=1000000 ;
optionsocuppantsLiability: Options = {
  stepsArray: [
    { value: 1000000 },
    { value: 1500000 },
    { value: 2000000}
  ]
};
settransportationExpenses(event){
  this.transportationExpenses = event.target.checked;
  console.log(this.transportationExpenses);
}


setagencyRepair(event){
  this.agencyRepair = event.target.checked;
  console.log(this.agencyRepair);
}
}
