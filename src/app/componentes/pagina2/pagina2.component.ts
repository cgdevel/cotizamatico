import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogoModel } from '../../interphaces/models/Catalogos.model';
import { FechasModel } from 'src/app/interphaces/models/Fechas.model';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.component.html',
  styleUrls: ['./pagina2.component.css']
})
export class Pagina2Component implements OnInit {
  constructor(
    private route: ActivatedRoute
  ) {
   }
  aseguradora: string;
  // VARIABLE DE LA QUE DEPENDE EDITAR DATOS
  show = false;
  // Variables a las que asigno datos de pagina1
  vermodelo: CatalogoModel ;
  vermarca: CatalogoModel ;
  verdescripcion: CatalogoModel ;
  veranno: CatalogoModel ;
  nombre: any;
  email: any;
  telefono: any;
  genero: any;
  codigopostal: any;
  fechanac: FechasModel ;
   // Valores botón tipo de cobertura
   ampliaplus = false;
   amplia = false;
   limitada = false;
   basica = false;
   statusAP = 'NoSelected';
   statusA = 'NoSelected';
   statusL = 'NoSelected';
   statusB = 'NoSelected';
  width: any;
  una: any;
  // Valores botón descuento
  descALTO = false;
  descMEDIO = false;
  descBAJO = false;
  statusDA = 'NoSelected';
  statusDM = 'NoSelected';
  statusDB = 'NoSelected';
  // Valores del botones tipo de pago
  mensual = false;
  trimestral = false;
  semestral = false;
  anual = false;
  statusM = 'NoSelected';
  statusT = 'NoSelected';
  statusS = 'NoSelected';
  statusAn = 'NoSelected';
  roto = 0;
  recica = 0;
  recibipe = 0;
  gemeoc = 0;
  muacco = 0;
 // Valores del switch
 as: boolean;
 des: boolean;
 erc: boolean;
 rcext: boolean;
 rcocu: boolean;
 // VARIABLES PARA EVENT EMITTER
 modelo: CatalogoModel;
 marca: CatalogoModel;
 descripcion: CatalogoModel;
 anno: CatalogoModel;
  // Funciones cobertura
  Ampliaplus( ) {
    // tiene selected this.statusAP
    this. ampliaplus = !this. ampliaplus;
    this.amplia = false;
    this.limitada = false;
    this.basica = false;
    this.statusA = 'NoSelected';
    this.statusL = 'NoSelected';
    this.statusB = 'NoSelected';
    this.statusAP = this. ampliaplus ? 'Selected'  : 'NoSelected';
    // console.log("Amplia Plus:"+' '+this.ampliaplus+' '+this.statusAP)
    // console.log("Amplia :"+' '+this.amplia+' '+this.statusA)
    // console.log("Limitada :"+' '+this.limitada+' '+this.statusL)
    // console.log("Básica :"+' '+this.basica+' '+this.statusB)
  }
  Amplia( ) {
    // tiene selected this.statusA
    this. amplia = !this. amplia;
    this.ampliaplus = false;
    this.limitada = false;
    this.basica = false;
    this.statusAP = 'NoSelected';
    this.statusL = 'NoSelected';
    this.statusB = 'NoSelected';
    this.statusA = this. amplia ? 'Selected' : 'NoSelected';
    // console.log("Amplia :"+' '+this.amplia+' '+this.statusA)
    // console.log("Amplia Plus:"+' '+this.ampliaplus+' '+this.statusAP)
    // console.log("Limitada :"+' '+this.limitada+' '+this.statusL)
    // console.log("Básica :"+' '+this.basica+' '+this.statusB)
  }
  Limitada( ) {
    // tiene selected this.statusL
    this. limitada = !this. limitada;
    this.ampliaplus = false;
    this.amplia = false;
    this.basica = false;
    this.statusAP = 'NoSelected';
    this.statusA = 'NoSelected';
    this.statusB = 'NoSelected';
    this.statusL = this. limitada ? 'Selected' : 'NoSelected' ;
    // console.log("Limitada :"+' '+this.limitada+' '+this.statusL)
    // console.log("Amplia Plus:"+' '+this.ampliaplus+' '+this.statusAP)
    // console.log("Amplia :"+' '+this.amplia+' '+this.statusA)
    // console.log("Básica :"+' '+this.basica+' '+this.statusB)
  }
  Basica( ) {
    // tiene selected this.statusB
    this. basica = !this. basica;
    this.ampliaplus = false;
    this.amplia = false;
    this.limitada = false;
    this.statusAP = 'NoSelected';
    this.statusA = 'NoSelected';
    this.statusL = 'NoSelected';
    this.statusB = this. basica  ? 'Selected' : 'NoSelected' ;
    // console.log("Básica :"+' '+this.basica+' '+this.statusB)
    // console.log("Amplia Plus:"+' '+this.ampliaplus+' '+this.statusAP)
    // console.log("Amplia :"+' '+this.amplia+' '+this.statusA)
    // console.log("Limitada :"+' '+this.limitada+' '+this.statusL)
  }
  // Funciones descuento
  Descuentoalto( ) {
    // tiene selected this.statusDA
    this. descALTO = !this. descALTO;
    this. descMEDIO = false;
    this.statusDM = 'NoSelected';
    this. descBAJO = false;
    this.statusDB = 'NoSelected';
    this.statusDA = this. descALTO ? 'Selected'  : 'NoSelected';
    // console.log("Descuento Alto:"+' '+this.descALTO+' '+this.statusDA)
    // console.log("Descuento Medio :"+' '+this.descMEDIO+' '+this.statusDM)
    // console.log("Descuento Bajo :"+' '+this.descBAJO+' '+this.statusDB)
  }
 Descuentomedio( ) {
    // tiene selected this.statusDM
    this. descMEDIO = !this. descMEDIO;
    this.descALTO = false;
    this.statusDA = 'NoSelected';
    this. descBAJO = false;
    this.statusDB = 'NoSelected';
    this.statusDM = this. descMEDIO ? 'Selected' : 'NoSelected';
    // console.log("Descuento Medio :"+' '+this.descMEDIO+' '+this.statusDM)
  }
  Descuentobajo( ) {
    // tiene selected this.statusDB
    this. descBAJO = !this. descBAJO;
    this.descALTO = false;
    this.statusDA = 'NoSelected';
    this. descMEDIO = false;
    this.statusDM = 'NoSelected';
    this.statusDB = this. descBAJO ? 'Selected' : 'NoSelected' ;
    // console.log("Descuento Bajo :"+' '+this.descBAJO+' '+this.statusDB)
  }
  // Funciones pago
  Mensual( ) {
    // tiene selected this.statusM
    this. mensual = !this. mensual;
    this.trimestral = false;
    this.semestral = false;
    this.anual = false;
    this.statusT = 'NoSelected';
    this.statusS = 'NoSelected';
    this.statusAn = 'NoSelected';
    this.statusM = this. mensual ? 'Selected'  : 'NoSelected';
    // console.log("Mensual:"+' '+this.mensual+' '+this.statusM)
    // console.log("Trimestral :"+' '+this.trimestral+' '+this.statusT)
    // console.log("Semestral :"+' '+this.semestral+' '+this.statusS)
    // console.log("Anual :"+' '+this.anual+' '+this.statusAn)
  }
  Trimestral( ) {
    // tiene selected this.statusT
    this. trimestral = !this. trimestral;
    this. mensual = false;
    this.semestral = false;
    this.anual = false;
    this.statusM = 'NoSelected';
    this.statusS = 'NoSelected';
    this.statusAn = 'NoSelected';
    this.statusT = this. trimestral ? 'Selected' : 'NoSelected';
    // console.log("Trimestral :"+' '+this.trimestral+' '+this.statusT)
    // console.log("Mensual:"+' '+this.mensual+' '+this.statusM)
    // console.log("Semestral :"+' '+this.semestral+' '+this.statusS)
    // console.log("Anual :"+' '+this.anual+' '+this.statusAn)

  }
  Semestral( ) {
    // tiene selected this.statusS
    this. semestral = !this. semestral;
    this.mensual = false;
    this.trimestral = false;
    this.anual = false;
    this.statusM = 'NoSelected';
    this.statusT = 'NoSelected';
    this.statusAn = 'NoSelected';
    this.statusS = this. semestral ? 'Selected' : 'NoSelected' ;
    // console.log("Semestral :"+' '+this.semestral+' '+this.statusS)
    // console.log("Trimestral :"+' '+this.trimestral+' '+this.statusT)
    // console.log("Mensual:"+' '+this.mensual+' '+this.statusM)
    // console.log("Anual :"+' '+this.anual+' '+this.statusAn)
  }
  Anual( ) {
    // tiene selected this.statusAn
    this. anual = !this. anual;
    this.mensual = false;
    this.trimestral = false;
    this.semestral = false;
    this.statusM = 'NoSelected';
    this.statusT = 'NoSelected';
    this.statusS = 'NoSelected';
    this.statusAn = this. anual  ? 'Selected' : 'NoSelected' ;
    // console.log("Anual :"+' '+this.anual+' '+this.statusAn)
    // console.log("Trimestral :"+' '+this.trimestral+' '+this.statusT)
    // console.log("Mensual:"+' '+this.mensual+' '+this.statusM)
    // console.log("Semestral :"+' '+this.semestral+' '+this.statusS)
  }
  RT(event){
    this.roto = event.target.valueAsNumber;
    // console.log( 'Robo total:'+' '+this.roto)
  }
  RCC(event){
    this.recica = event.target.valueAsNumber;
    // console.log('Responsabilidad civil catastrófica:'+' '+this.recica)
  }
 RCBP(event){
  this.recibipe = event.target.valueAsNumber;
  // console.log( 'Responsabilidad civil bienes y personas:' +' '+this.recibipe)
 }
 GMO(event){
  this.gemeoc = event.target.valueAsNumber;
  // console.log( 'Gastos médicos ocupantes:' +' '+this.gemeoc)
 }
 MAC(event){
  this.muacco = event.target.valueAsNumber;
  // console.log( 'Muerte accidental conductor:' +' '+this.muacco)
 }
 AuSus(event){
  this.as = event.target.checked;
  // console.log('Auto Sustituto:'+' '+this.as)
 }
 Desb(event){
  this.des = event.target.checked;
  // console.log('Desbielamiento:'+' '+this.des)
 }
 ExRC(event){
  this.erc = event.target.checked;
  // console.log('Extensión del R.C:'+' '+this.erc)
 }
 RCExt(event){
  this.rcext = event.target.checked;
  // console.log('R.C de extranjeros:'+' '+this.rcext)
 }
 RCOcu(event){
  this.rcocu = event.target.checked;
  // console.log('R.C de ocupantes:'+' '+this.rcocu)
 }
 toggle(){
  this. show = !this. show;

 }
 guarda(){
   this.show = false;
  // console.log("Informacion asegurado")
  // console.log(this.nombre)
  // console.log(this.email)
  // console.log(this.telefono)
  // console.log(this.codigopostal)
  // console.log(this.mesnaci)
  // console.log(this.yearnaci)
  // console.log(this.dianaci)
  // console.log(this.strstatemu)
  // console.log(this.boostatemu)
  // console.log(this.strstatehom)
  // console.log(this.boostatehom)
  // console.log(this.strstateemp)
  // console.log(this.boostateemp)
  // console.log("Informacion vehículo página 1")
  // console.log(this.vermodelo+' '+this.vermarca+' '+this.verdescripcion+' '+this.veranno)
  // console.log("Informacion vehículo editada en página dos")
  // console.log(this.modelo+' '+this.anno+' '+this.marca+' '+this.descripcion)
  // console.log("Informacion vehículo actualizada")
   this.vermodelo.sDato = this.modelo.sDato;
   this.vermarca.sDato = this.marca.sDato;
   this.verdescripcion.sDato = this.descripcion.sDato;
   this.veranno.sDato = this.anno.sDato;
  // console.log(this.vermodelo+' '+this.vermarca+' '+this.verdescripcion+' '+this.veranno)
 }
 // FUNCIONES EVENT EMITTER DE INFOVEHICULO
 emitTipoVehiculo(e) {
  // console.log(e);
  this.modelo = e;
}
emitAnioVehiculo(e) {
  // console.log(e);
  this.anno = e;
}
emitMarcaVehiculo(e) {
  // console.log(e);
  this.marca = e;
}
emitDescripcion(e) {
  // console.log(e);
  this.descripcion = e;
}
afirme(){
  this.aseguradora = 'AFIRME';
  console.log(this.aseguradora);
  return this.aseguradora;
}
axxa(){
  this.aseguradora = 'AXXA';
  console.log(this.aseguradora);
  return this.aseguradora;
}
qualitas(){
  this.aseguradora = 'QUALITAS';
  console.log(this.aseguradora);
  return this.aseguradora;

}

  ngOnInit(): void {
    this.vermodelo = history.state.tipove;
    console.log(this.vermodelo);
    this.veranno = history.state.anniove;
    this.vermarca = history.state.marcave;
    this.verdescripcion = history.state.descve;
    this.nombre = history.state.namease;
    this.email = history.state.emailase;
    this.telefono = history.state.phonease;
    this.genero = history.state.tipoperase;
    this.codigopostal = history.state.cpase;
    console.log(this.codigopostal);
    this.fechanac = history.state.fechanacase;
    this.amplia = true;
    this.descMEDIO = true;
    this.anual = true;
    this.una = history.state.sizeta;
  }



}
