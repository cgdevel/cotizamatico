import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coberturas',
  templateUrl: './coberturas.component.html',
  styleUrls: ['./coberturas.component.css'],
})
export class CoberturasComponent implements OnInit {
  @Input() cobertura: number;
  materialDamage: number = 0;

  constructor() {}
  ngOnInit(): void {}

  setMaterialDamage(event) {
    console.log(this.materialDamage);
    this.materialDamage = event.target.valueAsNumber;
  }
}
