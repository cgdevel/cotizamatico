import { Component, OnInit, Input } from '@angular/core';
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
  @Input()  Nombre: string ='';
  @Input()  Mes: string ='';
  @Input()  Dia: number;
  Nacion = new Array<RequestNacionalidad>();
  year;
  month;
  // VARIABLES CP
  ubicacion: any;
  ubicacionId: number;
  estado: string;
  municipio: string;
  RFC: string;
  nacionalidadsel;
  item:string='';
  cols:{ 
    iIdUbicacion: number,
    sUbicacion:string }[];
  coloniasel;
  NomInterior : string;
  NomExterior: string;
  meses: string[];
  naciye: number;
  nummonth: number;
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
  getrfc(){
    this.RFC=''
    this.Nombre=this.Nombre.toUpperCase();
    console.log(this.nacionalidadsel.NacString+' '+ this.Nombre)
      if(this.nacionalidadsel.NacString!='MEXICANA'){
        var str = new String(this.naciye)
        if (this.nummonth<10) {
          if (this.Dia<10) {
            this.RFC="XXXX"+str.charAt(2)+str.charAt(3)+"0"+this.nummonth+"0"+this.Dia+"XXX"            
          }
          this.RFC="XXXX"+str.charAt(2)+str.charAt(3)+"0"+this.nummonth+this.Dia+"XXX"            
        }else {
          if (this.Dia<10) {
            this.RFC="XXXX"+str.charAt(2)+str.charAt(3)+this.nummonth+"0"+this.Dia+"XXX"
          } else {
            this.RFC="XXXX"+str.charAt(2)+str.charAt(3)+this.nummonth+this.Dia+"XXX"
          }
        }
      }else {
        var str = new String(this.naciye)
        var n = this.Nombre.indexOf(" ");
        var strnmate =this.Nombre.charAt(n+1)
        var t=this.Nombre.lastIndexOf(" ")+1
        var strnom = this.Nombre.charAt(t)
        var strnpate=this.Nombre.charAt(0)+this.Nombre.charAt(1)
        if (this.nummonth<10) {
          if (this.Dia<10) {
            this.RFC=strnpate+strnmate+strnom+str.charAt(2)+str.charAt(3)+"0"+this.nummonth+"0"+this.Dia+"XXX"            
          }
          this.RFC=strnpate+strnmate+strnom+str.charAt(2)+str.charAt(3)+"0"+this.nummonth+this.Dia+"XXX"            
        }else {
          if (this.Dia<10) {
            this.RFC=strnpate+strnmate+strnom+str.charAt(2)+str.charAt(3)+this.nummonth+"0"+this.Dia+"XXX"
          } else {
            this.RFC=strnpate+strnmate+strnom+str.charAt(2)+str.charAt(3)+this.nummonth+this.Dia+"XXX"
          }
        }
      } 
    }//rfc
    
    ngOnInit(): void {
      this.meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      var today = new Date();
      this.year = today.getFullYear();
      this.month=today.getMonth();
      // console.log(this.month)
      for (let index = 0; index < this.meses.length; index++) {
        const element = this.meses[index];
        if (element==this.Mes) {
          // console.log(index)
          if (this.month>=index) {
            this.nummonth=index+1
            this.naciye=this.edad
            !!this.edad ? this.edad=this.year-this.edad : this.edad=0;
            // console.log( "ya los cumpliste"+" "+this.edad)
          }else{
            this.nummonth=index+1
            this.naciye=this.edad
            this.year=this.year-1
            !!this.edad ?this.edad=this.year-this.edad : this.edad=0;
            // console.log(this.edad)
          }
        }
      }
    this.getUbicacion()
    this.InfovehiculoService.getNacionalidades()
    // console.log(this.InfovehiculoService.Nacionalidades)
    this.Nacion=this.InfovehiculoService.getNacionalidades()
    // console.log(this.Nacion)
    }//Init
  
  }
  

  
  