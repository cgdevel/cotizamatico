import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-coberturas',
  templateUrl: './coberturas.component.html',
  styleUrls: ['./coberturas.component.css']
})
export class CoberturasComponent implements OnInit {
  @Output() MaterialDamage = new EventEmitter<  number >();
  constructor() { }
  materialDamage = 0;
  @Input() totalTheft = 0;
  @Input () cobertura: number;
  ngOnInit(): void {
  }

//  (event){
//     this.rcocu = event.target.checked;
//     // console.log('R.C de ocupantes:'+' '+this.rcocu)
//    }

materialDamageEvent(event){
  this. materialDamage = event.target.valueAsNumber;
  this.MaterialDamage.emit(this.materialDamage);
 }
 totalTheftEvent(event){
   this.totalTheft= event.target.valueAsNumber;
 }
}
