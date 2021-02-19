import { Component, OnInit, Input } from '@angular/core';
import { isThisTypeNode } from 'typescript';
import { threadId } from 'worker_threads';
import {InfovehiculoService} from '../../../servicios/infovehiculo.service'
import {RequestNacionalidad } from '../../../../app/interphaces/nacionali';

@Component({
  selector: 'app-ase-axxa',
  templateUrl: './ase-axxa.component.html',
  styleUrls: ['./ase-axxa.component.css']
})
export class AseAXXAComponent implements OnInit {
  @Input() mujer :boolean;
  @Input() hombre :boolean;
  @Input() empresa :boolean;
  @Input()  CP: string ='';
  @Input()  edad:number;
  @Input()  nomase:string ='';
  Nacion = new Array<RequestNacionalidad>();
  year;
  // VARIABLES CP
  ubicacion: any;
  ubicacionId: number;
  estado: string;
  municipio: string;
  nacionalidadsel;
  item:string='';
  cols:{ 
    iIdUbicacion: number,
    sUbicacion:string }[];
  coloniasel;
  NomInterior : string;
  NomExterior: string;
  constructor(private InfovehiculoService: InfovehiculoService) { }

  getUbicacion(){
    this.InfovehiculoService.getApiCPs({ 
      IdAplication: 2, 
      NombreCatalogo: "Sepomex", 
      Filtro: this.CP
    }).subscribe((data: any)=> {
      this.ubicacion = JSON.parse(data.CatalogoJsonString);
      console.log(this.ubicacion)
        this.estado = this.ubicacion[0].Municipio.Estado.sEstado;
        this.municipio = this.ubicacion[0].Municipio.sMunicipio;
        this.cols=this.ubicacion[0].Ubicacion
      })// suscribecierra
  }


  
  ngOnInit(): void {
    var today = new Date();
    this.year = today.getFullYear();
    !!this.edad ?this.edad=this.year-this.edad : this.edad=0;
  this.getUbicacion()
  this.InfovehiculoService.getNacionalidades()
  // console.log(this.InfovehiculoService.Nacionalidades)
  this.Nacion=this.InfovehiculoService.getNacionalidades()
  // console.log(this.Nacion)
  }

}
