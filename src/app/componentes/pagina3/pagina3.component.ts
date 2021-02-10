import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina3',
  templateUrl: './pagina3.component.html',
  styleUrls: ['./pagina3.component.css']
})
export class Pagina3Component implements OnInit {
 noedites:boolean;
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
  constructor() { }

  ngOnInit(): void {
    this.noedites=false
    this.vermodelo=history.state.modsel
    this.vermarca=history.state.marsel 
    this.verdescripcion=history.state.descsel 
    this.veranno=history.state.annosel
    this.nombre=history.state.nomsel
    this.email=history.state.emsel
    this.telefono=history.state.telsel
    this.genero=history.state.gensel
    this.codigopostal=history.state.cpsel
    this.mesnaci=history.state.smsel
    this.yearnaci=history.state.sysel
    this.dianaci=history.state.sdsel
    this.strstatemu=history.state.must1
    this.boostatemu=history.state.muboo1
    this.strstatehom=history.state.host1
    this.boostatehom=history.state.hoboo1
    this.strstateemp=history.state.emst1
    this.boostateemp=history.state.emboo1
  }

}
