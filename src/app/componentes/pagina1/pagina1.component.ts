import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.css']
})
export class Pagina1Component implements OnInit {

  //variabbles datos asegurado
    nombre:string='';
    email:string='';
    telefono:string='';
    genero:string='';
    cp:string='';
  //Variables fecha de nacimiento
    sm:string='';
    sy:string='';
    sd:string='';
  //Variables carro
    modelo:string='';
    marca:string='';
    descripcion:string='';
    anno:string='';

  a(e) {
    console.log(e);
    this.modelo=e
  }
  b(e) {
    console.log(e);
    this.anno=e
  }
  c(e) {
    console.log(e);
    this.marca=e
  }
  d(e) {
    console.log(e);
    this.descripcion=e
  }
  f(e) {
    console.log(e);
    this.sd=e
  }
  g(e) {
    console.log(e);
    this.sm=e
  }
  h(e) {
    console.log(e);
    this.sy=e
  }
   i(e){
      console.log(e)
      this.telefono=e
   }
   
   j(e){
    console.log(e)
    this.nombre=e
 }
 
 k(e){
  console.log(e)
  this.cp=e
}
l(e){
  console.log(e)
  this.email=e
}

m(e){
  console.log(e)
  this.genero=e
}
  constructor() { }

  ngOnInit(): void {
  }

}
