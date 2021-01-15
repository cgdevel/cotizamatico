import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-infoasegurado',
  templateUrl: './infoasegurado.component.html',
  styleUrls: ['./infoasegurado.component.css']
})
export class InfoaseguradoComponent implements OnInit {
  @Output() pasad = new EventEmitter<string>();
  @Output() pasam = new EventEmitter<string>();
  @Output() pasay = new EventEmitter<string>();
  @Output() pastel = new EventEmitter<string>();
  @Output() pasnom = new EventEmitter<string>();
  @Output() pasemail = new EventEmitter<string>();
  @Output() pascp = new EventEmitter<string>();
  @Output() pasgen = new EventEmitter<string>();
  
  
 modsel:string='';
 marsel:string='';
descsel:string='';
annosel:string='';

  existe:boolean; 
  existeT: boolean;
  tam:number
  vacemial: boolean;
  vacnom: boolean;
  ngOnInit( ): void {
    this.mesdiabis=[
      ['Enero',31],
      ['Febrero',29],
      ['Marzo',31],
      ['Abril',30],
      ['Mayo',31],
      ['Junio',30],
      ['Julio',31],
      ['Agosto',31],
      ['Septiembre',30],
      ['Octubre',31],
      ['Noviembre',30],
      ['Diciembre',31],
    ]
    this.mesdia=[
      ['Enero',31],
      ['Febrero',28],
      ['Marzo',31],
      ['Abril',30],
      ['Mayo',31],
      ['Junio',30],
      ['Julio',31],
      ['Agosto',31],
      ['Septiembre',30],
      ['Octubre',31],
      ['Noviembre',30],
      ['Diciembre',31],
    ]
    this.meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    this.dias=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31]
    this.fechaannos=[]
    var today = new Date();
    this.year = today.getFullYear();
    this.date=today.getDate();
    this.month=today.getMonth();
    console.log(today)
    console.log(this.date) //numero del dia
    this.selecteddia=this.date
    this.verdia=this.selecteddia
    console.log(this.month)
    this.selectedmes=this.meses[this.month]
    this.vermes=this.selectedmes
    console.log(this.year)
    this.selectedyear=this.year
    this.verfechaann=this.selectedyear
   for (let index = 1900; index <= this.year-18; index++) {// VALIDACION PARA QUE SEA MAYOR DE EDAD
     this.fechaannos.push(index)
   }
  }
  // valores para código postal
  readonly api: string ="https://apitestcotizamatico.azurewebsites.net/api/catalogos";
  ubicacion: any;
  codigoPostal: string ='';
  TELEFONO: string ='';
  EMAIL: string ='';
  NOMBRE: string ='';
  ubicacionId: number;
  estado: string;
  municipio: string;
  colonia: string;
  bisiesto: boolean;
  // Valores selección fecha
  year;
  month;
  date;
  dias;
  meses;
  fechaannos;
  mesdiabis: (string | number)[][];
  mesdia: (string | number)[][];
  mes: string  = ''; // Iniciamos mes 
  vermes: string        = '';
  fechaann: string  = ''; // Iniciamos fechaann 
  verfechaann: string        = '';
  dia: string  = ''; // Iniciamos dia
  // console.log(this.mesdiabis[0][1])//DIAS
  // console.log(this.mesdiabis[0][0])//MESES
  verdia: string        = '';
  selectedmes;
  selectedyear;
  selecteddia;
  selected;
  //Valores botones soy
  soymujer=false;
  soyhombre=false;
  soyempresa=false;
  statussoymujer = "NoSelected";
  statussoyhombre= "NoSelected";
  statussoyempresa= "NoSelected";
  constructor(private http:HttpClient){
  }
 
//Funciones botones SOY
  Soymujer() { 
    // tiene selected this.statussoymujer
    this.soymujer = !this. soymujer;
    this. soyhombre=false
    this.statussoyhombre="NoSelected"
    this.soyempresa=false
    this.statussoyempresa="NoSelected"
    this.statussoymujer = this. soymujer ? "Selected"  :"NoSelected";
    this.pasgen.emit('Mujer')
    console.log("Mujer"+' '+this.soymujer+' '+this.statussoymujer)
    console.log("Hombre"+' '+this.soyhombre+' '+this.statussoyhombre)
    console.log("Empresa"+' '+this.soyempresa+' '+this.statussoyempresa)
    //SINO HAY GENERO SELECCIONADO
    if (!this.soyhombre&& !this.soymujer && !this.soyempresa) {
      this.pasgen.emit('')  
    }
  }
  Soyhombre() {
    // tiene selected this.statusDM
    this. soyhombre = !this. soyhombre;
    this. soymujer=false
    this.statussoymujer="NoSelected"
    this.soyempresa=false
    this.statussoyempresa="NoSelected"
    this.statussoyhombre= this. soyhombre ? "Selected" : "NoSelected";
    this.pasgen.emit('Hombre')
    console.log("Hombre"+' '+this.soyhombre+' '+this.statussoyhombre)
    console.log("Mujer"+' '+this.soymujer+' '+this.statussoymujer)
    console.log("Empresa"+' '+this.soyempresa+' '+this.statussoyempresa)
    //SINO HAY GENERO SELECCIONADO
    if (!this.soyhombre&& !this.soymujer && !this.soyempresa) {
      this.pasgen.emit('')  
    }
  }
  Soyempresa() {
    // tiene selected this.statusDB
    this. soyempresa = !this. soyempresa;
    this. soymujer=false
    this.statussoymujer="NoSelected"
    this.soyhombre=false
    this.statussoyhombre="NoSelected"
    this.statussoyempresa= this. soyempresa ? "Selected" : "NoSelected" ;
    this.pasgen.emit('Empresa')
    console.log("Empresa"+' '+this.soyempresa+' '+this.statussoyempresa)
    console.log("Hombre"+' '+this.soyhombre+' '+this.statussoyhombre)
    console.log("Mujer"+' '+this.soymujer+' '+this.statussoymujer)
    //SINO HAY GENERO SELECCIONADO
    if (!this.soyhombre&& !this.soymujer && !this.soyempresa) {
      this.pasgen.emit('')  
    }
  }
  //Funciones selección fecha de nacimiento
  getmes(){
    console.log(this.selectedmes)
    this.vermes=this.selectedmes
    this.pasam.emit(this.vermes)
    this.calculabis()
  }
  getanno(){
    // Limpia
    // this.selecteddia=""
    // this.verdia=""
    console.log(this.selectedyear)
    this.verfechaann=this.selectedyear
    this.pasay.emit(this.verfechaann)
    this.calculabis() 
  }
  getdia(){
    console.log(this.selecteddia)
    this.verdia=this.selecteddia
    this.pasad.emit(this.verdia)
    var num= parseInt(this.selecteddia, 10)     
    if (num==28) {
      console.log(" 1 if 28")
      this.meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre',' Noviembre','Diciembre']
      if (this.selecteddia!='' && this.verdia!='' && this.verfechaann!='' && this.selectedyear!='') {
        this.calculabis()
      } else {
        console.log('Algo falló')
      }
    } else {
      if (num==29) {
        console.log("2 if 29")
        this.meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
        if (this.selecteddia!='' && this.verdia!='' && this.verfechaann!='' && this.selectedyear!='') {
          this.calculabis()
        } else {
          console.log('Algo falló')
        }
        } else {
            if (num==30 ) {
              console.log("3 if 30")
              this.meses=['Enero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
              this.calculabis()
            }else {
              if (num==31) {
                console.log("4 if 31")
                this.meses=['Enero','Marzo','Mayo','Julio','Agosto','Octubre','Diciembre']
              this.calculabis()
                 
              }  else {
                  console.log("5 if < 28")
                  this.meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']  
              this.calculabis()

              }
            }
          }
    }
  }
//Función para determinar tipo de año (bisiesto/ no bisiesto)
  calculabis() {
    this.dias=[]
    if (this.verfechaann!='' && this.vermes!='') {
      var numerican = Number(this.verfechaann);
      console.log(this.verfechaann+' ' + this.vermes)
    numerican%4==0 ?(numerican%100==0 ?(numerican%400==0 ?(this.bisiesto=true) : (this.bisiesto=false)) : (this.bisiesto=true)) : (this.bisiesto=false)
    //this.bisiesto ? (console.log(this.mesdiabis)) :(console.log(this.mesdia))
    if (this.bisiesto) {
      console.log(numerican  +' '+"BISIESTO")
      this.dias=[];
      for (let index = 0;  index<this.mesdiabis.length; index++) {
        if (this.mesdiabis[index][0]==this.vermes) {
          var hastaaquibi = Number(this.mesdiabis[index][1]);
          console.log( hastaaquibi +' '+ this.vermes)
            for (let index = 1 ; index <= hastaaquibi; index++) {
              this.dias.push(index)
            }
        }
      }
    } else {
      if (!this.bisiesto) {
        console.log(numerican +' '+"NO BISIESTO")
      for (let index = 0; index<this.mesdia.length; index++) {
        if (this.mesdia[index][0]==this.vermes) {
          var hastaaqui = Number(this.mesdia[index][1]);
          console.log(this.mesdia[index][1])
          console.log( hastaaqui+' '+ this.vermes)
          for (let index = 1 ; index <= hastaaqui; index++) {
            this.dias.push(index)
          }
          if (!this.bisiesto && this.selecteddia==29 && this.selectedmes=='Febrero') {
            // Limpia día
           this.selecteddia=""
           this.verdia=""
            this.pasad.emit('')

         }
        }
      }
      }
      }
    }else{
      console.log("Te falta")
    }
  }
  //Función teléfono
  onTelefono(event){
    console.log(event);
    if (this.TELEFONO.length < 10 || this.TELEFONO=='') {
      if (this.TELEFONO.length>=1 && this.TELEFONO.length <10) {
        this.existeT=false
        console.log('No se puede validar un teléfono menor a 10 caracteres');
        this.pastel.emit('')
        return;
      } else {
        if (this.TELEFONO=='') {
          this.existeT=false
          console.log('No se puede validar un teléfono vacío');
          this.pastel.emit('')
          return;
        }  
      }
    }else{
      if (this.TELEFONO.length==10 && this.TELEFONO!='') {
        this.pastel.emit(this.TELEFONO)
        this.existeT=true;
      }
    }
  }
//Función codigo postal
  onCodigoPostalKeyUp(event) {
    this.tam=this.codigoPostal.length
    console.log(event);
    if (this.codigoPostal.length < 5 && this.codigoPostal!='') {
      this.existe=false
      this.pascp.emit('')
      console.log('No se puede validar un CP menor a 5 caracteres');
      return;
    }
    if(this.codigoPostal=='') {
      this.existe=false
      this.pascp.emit('')
      console.log('No se puede validar un CP vacío');
      return;
    }
    this.http.post(this.api, {
      "IdAplication": "2", 
      "NombreCatalogo": "Sepomex", 
      "Filtro": this.codigoPostal
    }).subscribe((data: any)=> {
      // console.log(data.CatalogoJsonString)
      if (data.Error != null) {
        this.existe=false
        this.pascp.emit('')
        console.log("No existe")
        return;
      } else {
        this.existe=true
        this.pascp.emit(this.codigoPostal)
        this.ubicacion = JSON.parse(data.CatalogoJsonString);
        this.estado = this.ubicacion[0].Municipio.Estado.sEstado;
        this.municipio = this.ubicacion[0].Municipio.sMunicipio;
        this.colonia = this.ubicacion[0].Ubicacion[0].sUbicacion;
        this.ubicacionId = this.ubicacion[0].Ubicacion[0].iIdUbicacion;
        console.log(this.estado+'  '+ this.municipio +'  '+ this.colonia+'  '+ this.ubicacionId)
      }
      
      })
  }
//Función codigo email
  onEmail(event) {
    console.log(event);
    console.log(this.EMAIL)
    if (this.EMAIL=='') {
      this.vacemial=false
      this.pasemail.emit('')
    } else {
      if (this.EMAIL!='') {
        this.vacemial=true
        this.pasemail.emit(this.EMAIL)
      }
    }
  }
 //Función nombre
 onNombre(event) {
  console.log(event);
  console.log(this.NOMBRE)
  if (this.NOMBRE=='') {
    this.vacnom=false
    this.pasnom.emit('')
  } else {
    if (this.NOMBRE!='') {
      this.vacnom=true
      this.pasnom.emit(this.NOMBRE)
    }
  }
}


  }

  
  

  


