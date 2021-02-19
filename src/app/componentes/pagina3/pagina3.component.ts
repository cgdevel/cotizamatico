import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { CatalogoModel } from '../../interphaces/models/Catalogos.model';

@Component({
  selector: 'app-pagina3',
  templateUrl: './pagina3.component.html',
  styleUrls: ['./pagina3.component.css']
})
export class Pagina3Component implements OnInit {
  nombraseguradora: any;
  pasa3: boolean;
  constructor() {}
  colonias =[];
  
 noedites:boolean;
 //Variables a las que asigno datos de pagina1 
 vermodelo: CatalogoModel ;
 vermarca: CatalogoModel ;
 verdescripcion: CatalogoModel ;
 veranno: CatalogoModel ;
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

    
    
  ngOnInit(): void {
    this.noedites=false
    this.pasa3=true
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
    this.nombraseguradora=history.state.asesel
    console.log(this.nombraseguradora)
  }

}
