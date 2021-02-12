import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import {InfovehiculoService} from '../../../app/servicios/infovehiculo.service'
@Component({
  selector: 'app-pagina3',
  templateUrl: './pagina3.component.html',
  styleUrls: ['./pagina3.component.css']
})
export class Pagina3Component implements OnInit {
  constructor( private Infovehiculo: InfovehiculoService ) {}
  colonias =[];
  cols:{ Numero: number; Nomcolonia: string; }[];
 noedites:boolean;
 item:string='';
 //Variables a las que asigno datos de pagina1 
 vermodelo: any;
 vermarca: any;
 verdescripcion: any;
 veranno: any;
 nombre: any;
 email: any;
 telefono: any;
 genero: any;
 codigopostal: any;
 mesnaci: any;
 yearnaci: any;
 dianaci: any;
 strstatemu:string;
 boostatemu:boolean;
 strstatehom:string;
 boostatehom:boolean;
 strstateemp:string;
 boostateemp:boolean;
// VARIABLES CP
 ubicacion: any;
ubicacionId: number;
    estado: string;
    municipio: string;
    colonia: string;
    coloniasel;
    


  getUbicacion(){
    this.Infovehiculo.getApiCPs({ 
      IdAplication: 2, 
      NombreCatalogo: "Sepomex", 
      Filtro: this.codigopostal
    }).subscribe((data: any)=> {
      //  console.log(data)
        this.ubicacion = JSON.parse(data.CatalogoJsonString);
        this.estado = this.ubicacion[0].Municipio.Estado.sEstado;
        this.municipio = this.ubicacion[0].Municipio.sMunicipio;
        this.colonia = this.ubicacion[0].Ubicacion[0].sUbicacion;
        this.ubicacionId = this.ubicacion[0].Ubicacion[0].iIdUbicacion;
        console.log(this.ubicacion[0].Ubicacion.length)
        this.ubicacion[0].Ubicacion.forEach(element => {
        console.log(element.iIdUbicacion+" "+element.sUbicacion)
        var objeto ={ numero: element.iIdUbicacion, Ubicacion: element.sUbicacion }
        this.colonias.push(objeto)
        })// foreach ubicacion
      })// suscribecierra
      console.log(this.colonias)

      
  }
  ngOnInit(): void {
    this.noedites=false
    this.vermodelo=history.state.modsel
    this.vermarca=history.state.marsel 
    this.verdescripcion=history.state.descsel 
    this.veranno=history.state.annosel
    this.nombre=history.state.nomsel
    this.email=history.state.emsel
    this.telefono=history.state.telsel
    this.codigopostal=history.state.cpsel
    console.log("CP"+" "+this.codigopostal)
    this.mesnaci=history.state.smsel
    this.yearnaci=history.state.sysel
    this.dianaci=history.state.sdsel
    this.strstatemu=history.state.must1
    this.boostatemu=history.state.muboo1
    this.strstatehom=history.state.host1
    this.boostatehom=history.state.hoboo1
    this.strstateemp=history.state.emst1
    this.boostateemp=history.state.emboo1
    this.getUbicacion()
    
    
  }

}