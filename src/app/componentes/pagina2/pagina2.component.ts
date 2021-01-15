import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import {Pagina1Component } from  'src/app/componentes/pagina1/pagina1.component'

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.component.html',
  styleUrls: ['./pagina2.component.css']
})
export class Pagina2Component implements OnInit {
  //Valores botón tipo de cobertura
  ampliaplus=false;
  amplia=false;
  limitada=false;
  basica=false;
  statusAP = "NoSelected";
  statusA= "NoSelected";
  statusL= "NoSelected";
  statusB= "NoSelected";
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
  //Funciones cobertura
  Ampliaplus( ) {
    // tiene selected this.statusAP
    this. ampliaplus = !this. ampliaplus;
    this.amplia=false;
    this.limitada=false;
    this.basica=false;
    this.statusA= "NoSelected";
    this.statusL= "NoSelected";
    this.statusB= "NoSelected";
    this.statusAP = this. ampliaplus ? "Selected"  :"NoSelected";
    console.log("Amplia Plus:"+' '+this.ampliaplus+' '+this.statusAP)
    console.log("Amplia :"+' '+this.amplia+' '+this.statusA)
    console.log("Limitada :"+' '+this.limitada+' '+this.statusL)
    console.log("Básica :"+' '+this.basica+' '+this.statusB)
  }
  Amplia( ) {
    // tiene selected this.statusA
    this. amplia = !this. amplia;
    this.ampliaplus=false;
    this.limitada=false;
    this.basica=false;
    this.statusAP = "NoSelected";
    this.statusL= "NoSelected";
    this.statusB= "NoSelected";
    this.statusA= this. amplia ? "Selected" : "NoSelected";
    console.log("Amplia :"+' '+this.amplia+' '+this.statusA)
    console.log("Amplia Plus:"+' '+this.ampliaplus+' '+this.statusAP)
    console.log("Limitada :"+' '+this.limitada+' '+this.statusL)
    console.log("Básica :"+' '+this.basica+' '+this.statusB)
  }
  Limitada( ) {
    // tiene selected this.statusL
    this. limitada = !this. limitada;
    this.ampliaplus=false;
    this.amplia=false;
    this.basica=false;
    this.statusAP = "NoSelected";
    this.statusA= "NoSelected";
    this.statusB= "NoSelected";
    this.statusL= this. limitada ? "Selected" : "NoSelected" ;
    console.log("Limitada :"+' '+this.limitada+' '+this.statusL)
    console.log("Amplia Plus:"+' '+this.ampliaplus+' '+this.statusAP)
    console.log("Amplia :"+' '+this.amplia+' '+this.statusA)
    console.log("Básica :"+' '+this.basica+' '+this.statusB)
  }
  Basica( ) {
    // tiene selected this.statusB
    this. basica = !this. basica;
    this.ampliaplus=false;
    this.amplia=false;
    this.limitada=false;
    this.statusAP = "NoSelected";
    this.statusA= "NoSelected";
    this.statusL= "NoSelected";
    this.statusB= this. basica  ? "Selected" : "NoSelected" ;
    console.log("Básica :"+' '+this.basica+' '+this.statusB)
    console.log("Amplia Plus:"+' '+this.ampliaplus+' '+this.statusAP)
    console.log("Amplia :"+' '+this.amplia+' '+this.statusA)
    console.log("Limitada :"+' '+this.limitada+' '+this.statusL)
  }
  //Valores botón descuento
  descALTO=false;
  descMEDIO=false;
  descBAJO=false;
  statusDA = "NoSelected";
  statusDM= "NoSelected";
  statusDB= "NoSelected";
  //Funciones descuento
  Descuentoalto( ) {
    // tiene selected this.statusDA
    this. descALTO = !this. descALTO;
    this. descMEDIO=false
    this.statusDM="NoSelected"
    this. descBAJO=false
    this.statusDB="NoSelected"
    this.statusDA = this. descALTO ? "Selected"  :"NoSelected";
    console.log("Descuento Alto:"+' '+this.descALTO+' '+this.statusDA)
    console.log("Descuento Medio :"+' '+this.descMEDIO+' '+this.statusDM)
    console.log("Descuento Bajo :"+' '+this.descBAJO+' '+this.statusDB)
  }
 Descuentomedio( ) {
    // tiene selected this.statusDM
    this. descMEDIO = !this. descMEDIO;
    this.descALTO=false
    this.statusDA="NoSelected"
    this. descBAJO=false
    this.statusDB="NoSelected"
    this.statusDM= this. descMEDIO ? "Selected" : "NoSelected";
    console.log("Descuento Medio :"+' '+this.descMEDIO+' '+this.statusDM)
  }
  Descuentobajo( ) {
    // tiene selected this.statusDB
    this. descBAJO = !this. descBAJO;
    this.descALTO=false
    this.statusDA="NoSelected"
     this. descMEDIO=false
     this.statusDM="NoSelected"
    this.statusDB= this. descBAJO ? "Selected" : "NoSelected" ;
    console.log("Descuento Bajo :"+' '+this.descBAJO+' '+this.statusDB)
  }
  //Valores del botones tipo de pago
  mensual=false;
  trimestral=false;
  semestral=false;
  anual=false;
  statusM = "NoSelected";
  statusT= "NoSelected";
  statusS= "NoSelected";
  statusAn= "NoSelected";
  //Funciones pago
  Mensual( ) {
    // tiene selected this.statusM
    this. mensual = !this. mensual;
    this.trimestral=false;
    this.semestral=false;
    this.anual=false;
    this.statusT= "NoSelected";
    this.statusS= "NoSelected";
    this.statusAn= "NoSelected";
    this.statusM = this. mensual ? "Selected"  :"NoSelected";
    console.log("Mensual:"+' '+this.mensual+' '+this.statusM)
    console.log("Trimestral :"+' '+this.trimestral+' '+this.statusT)
    console.log("Semestral :"+' '+this.semestral+' '+this.statusS)
    console.log("Anual :"+' '+this.anual+' '+this.statusAn)
  }
  Trimestral( ) {
    // tiene selected this.statusT
    this. trimestral = !this. trimestral;
    this. mensual=false;
    this.semestral=false;
    this.anual=false;
    this.statusM= "NoSelected";
    this.statusS= "NoSelected";
    this.statusAn= "NoSelected";
    this.statusT= this. trimestral ? "Selected" : "NoSelected";
    console.log("Trimestral :"+' '+this.trimestral+' '+this.statusT)
    console.log("Mensual:"+' '+this.mensual+' '+this.statusM)
    console.log("Semestral :"+' '+this.semestral+' '+this.statusS)
    console.log("Anual :"+' '+this.anual+' '+this.statusAn)
    
  }
  Semestral( ) {
    // tiene selected this.statusS
    this. semestral = !this. semestral;
    this.mensual=false;
    this.trimestral=false;
    this.anual=false;
    this.statusM = "NoSelected";
    this.statusT= "NoSelected";
    this.statusAn= "NoSelected";
    this.statusS= this. semestral ? "Selected" : "NoSelected" ;
    console.log("Semestral :"+' '+this.semestral+' '+this.statusS)
    console.log("Trimestral :"+' '+this.trimestral+' '+this.statusT)
    console.log("Mensual:"+' '+this.mensual+' '+this.statusM)
    console.log("Anual :"+' '+this.anual+' '+this.statusAn)
  }
  Anual( ) {
    // tiene selected this.statusAn
    this. anual = !this. anual;
    this.mensual=false;
    this.trimestral=false;
    this.semestral=false;
    this.statusM = "NoSelected";
    this.statusT= "NoSelected";
    this.statusS= "NoSelected";
    this.statusAn= this. anual  ? "Selected" : "NoSelected" ;
    console.log("Anual :"+' '+this.anual+' '+this.statusAn)
    console.log("Trimestral :"+' '+this.trimestral+' '+this.statusT)
    console.log("Mensual:"+' '+this.mensual+' '+this.statusM)
    console.log("Semestral :"+' '+this.semestral+' '+this.statusS)
  }
  roto:number=0
  RT(event){
    this.roto=event.target.valueAsNumber
    console.log( 'Robo total:'+' '+this.roto)
  }
  recica:number=0
  RCC(event){
    this.recica=event.target.valueAsNumber
    console.log('Responsabilidad civil catastrófica:'+' '+this.recica)
  }
 recibipe:number=0
 RCBP(event){
  this.recibipe=event.target.valueAsNumber
  console.log( 'Responsabilidad civil bienes y personas:' +' '+this.recibipe)
 }
 gemeoc:number=0
 GMO(event){
  this.gemeoc=event.target.valueAsNumber
  console.log( 'Gastos médicos ocupantes:' +' '+this.gemeoc)
 }
muacco:number=0
 MAC(event){
  this.muacco=event.target.valueAsNumber
  console.log( 'Muerte accidental conductor:' +' '+this.muacco)
 }
 //Valores del switch
 as:boolean
 des:boolean
 erc:boolean
 rcext:boolean
 rcocu:boolean
 AuSus(event){
  this.as=event.target.checked
  console.log('Auto Sustituto:'+' '+this.as)
 }
 Desb(event){
  this.des=event.target.checked
  console.log('Desbielamiento:'+' '+this.des)
 }
 ExRC(event){
  this.erc=event.target.checked
  console.log('Extensión del R.C:'+' '+this.erc)
 }
 RCExt(event){
  this.rcext=event.target.checked
  console.log('R.C de extranjeros:'+' '+this.rcext)
 }
 RCOcu(event){
  this.rcocu=event.target.checked
  console.log('R.C de ocupantes:'+' '+this.rcocu)
 }
  constructor(
    private route: ActivatedRoute 
  ) { 
   }

  ngOnInit(): void {
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
  }



}
