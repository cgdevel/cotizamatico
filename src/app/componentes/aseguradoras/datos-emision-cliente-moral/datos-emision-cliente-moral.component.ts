import { Component, OnInit,Input, ViewChild  } from '@angular/core';
import {InfovehiculoService} from '../../../servicios/infovehiculo.service';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';

@Component({
  selector: 'app-datos-emision-cliente-moral',
  templateUrl: './datos-emision-cliente-moral.component.html',
  styleUrls: ['./datos-emision-cliente-moral.component.css']
})
export class DatosEmisionClienteMoralComponent implements OnInit {
  @Input() codigopostal = '';
  @Input() aseguradoraSelect: string ;
  @Input() nombre = '';
  RFC: string;
  fechacontiaseg: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;
  cols: {
    iIdUbicacion: number,
    sUbicacion: string }[];
  coloniasel;
  estado: string;
  municipio: string;
  ubicacion: any;
  item = '';
  constructor(  private locate: Location, private InfovehiculoService: InfovehiculoService) { }
  getUbicacion( cp ?: string ) {
    this.coloniasel = '';
    this.InfovehiculoService.getApiCPs({
      IdAplication: 2,
      NombreCatalogo: 'Sepomex',
      Filtro: !!this.codigopostal ? this.codigopostal : cp,
    }).subscribe((data: any) => {
      this.ubicacion = JSON.parse(data.CatalogoJsonString);
      // console.log(this.ubicacion);
      this.estado = this.ubicacion[0].Municipio.Estado.sEstado;
      this.municipio = this.ubicacion[0].Municipio.sMunicipio;
      this.cols = this.ubicacion[0].Ubicacion;
    }); // suscribecierra
  }
  verificater( nomemp ?: string ){
  }
  onback(){
    this.locate.back();
  }
  ngOnInit(): void {
    this.getUbicacion();
  }

}
