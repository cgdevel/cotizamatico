import { Component, Input, OnInit } from '@angular/core';
import { CatalogoModel } from '../../../interphaces/models/Catalogos.model';

@Component({
  selector: 'app-datos-emision-vehiculo',
  templateUrl: './datos-emision-vehiculo.component.html',
  styleUrls: ['./datos-emision-vehiculo.component.css']
})
export class DatosEmisionVehiculoComponent implements OnInit {
  @Input() modeloSelect: CatalogoModel = { sLlave: '', sDato: ''} ;
  @Input() anioSelect: CatalogoModel ;
  @Input() marcaSelect: CatalogoModel ;
  @Input() descripSelect: CatalogoModel ;

  constructor() { }

  ngOnInit(): void {
  }

}
