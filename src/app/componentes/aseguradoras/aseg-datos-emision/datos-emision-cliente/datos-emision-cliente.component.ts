import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {InfovehiculoService} from '../../../../servicios/infovehiculo.service';
import {RequestNacionalidad } from '../../../../interphaces/nacionali';
import { CatalogoModel } from '../../../../interphaces/models/Catalogos.model';
import { FechasModel } from '../../../../interphaces/models/Fechas.model';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
@Component({
  selector: 'app-datos-emision-cliente',
  templateUrl: './datos-emision-cliente.component.html',
  styleUrls: ['./datos-emision-cliente.component.css']
})
export class DatosEmisionClienteComponent implements OnInit {
  model: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;
  @Input() aseguradoraSelect: string ;
  @Input() codigopostal = '';
  @Input() correo ='';
  @Input() telefono ='';
  @Input() genero='';
  @Input() fecha: FechasModel;
  Nacion = new Array<RequestNacionalidad>();
  nacionalidadsel: RequestNacionalidad;
  item = '';
  Ocup = new Array<CatalogoModel>();
  EsCivs = new Array<CatalogoModel>();
  ocupacionsel: CatalogoModel;
  estadocivilsel: CatalogoModel;
  estado: string;
  municipio: string;
  ubicacion: any;
  anionac: number;
  mesnac: number;
  dianac: number;
  cols: {
    iIdUbicacion: number,
    sUbicacion: string }[];
  coloniasel;
  constructor( private InfovehiculoService: InfovehiculoService) { }
  getUbicacion( cp ? :string ) {
    this.coloniasel='';
    this.InfovehiculoService.getApiCPs({
      IdAplication: 2,
      NombreCatalogo: 'Sepomex',
      Filtro: !!this.codigopostal ? this.codigopostal : cp,
    }).subscribe((data: any) => {
      this.ubicacion = JSON.parse(data.CatalogoJsonString);
      console.log(this.ubicacion);
      this.estado = this.ubicacion[0].Municipio.Estado.sEstado;
      this.municipio = this.ubicacion[0].Municipio.sMunicipio;
      this.cols = this.ubicacion[0].Ubicacion;
    }); // suscribecierra
  }
 
  ngOnInit(): void {
    this.Nacion = this.InfovehiculoService.getNacionalidades();
    this.Ocup=this.InfovehiculoService.getOcupaciones();
    this.EsCivs=this.InfovehiculoService.getEstadoCivil();
    this.getUbicacion();
    console.log(this.fecha.mes);
    var meses=[{nom:'Enero', id:1},{nom:'Febrero', id:2},{nom:'Marzo', id:3},
    {nom:'Abril', id:4},{nom:'Mayo', id:5},{nom:'Junio', id:6},
    {nom:'Julio', id:7},{nom:'Agosto', id:8},{nom:'Septiembre', id:9},
    {nom:'Octubre', id:10},{nom:'Noviembre', id:11},{nom:'Diciembre', id:12}];
    meses.forEach(element => {
      if(this.fecha.mes==element.nom){
        this.mesnac = element.id;
      }
    });
    this.anionac= Number(this.fecha.anio);
    // this.mesnac= Number(this.fecha.mes);

    this.dianac=Number(this.fecha.dia);
    this.model={
      "year": this.anionac,
      "month": this.mesnac,
      "day": this.dianac
    };
    
  }

}
