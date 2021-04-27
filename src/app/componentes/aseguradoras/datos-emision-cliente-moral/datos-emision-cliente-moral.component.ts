import { Component, OnInit,Input, ViewChild, EventEmitter, Output  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CatalogoModel } from '../../../interphaces/models/Catalogos.model';
import {InfovehiculoService} from '../../../servicios/infovehiculo.service';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';

@Component({
  selector: 'app-datos-emision-cliente-moral',
  templateUrl: './datos-emision-cliente-moral.component.html',
  styleUrls: ['./datos-emision-cliente-moral.component.css']
})
export class DatosEmisionClienteMoralComponent implements OnInit {
  constructor(  private locate: Location, private InfovehiculoService: InfovehiculoService) {
    this.formRFCMo = new FormGroup({
      'RFMoCIn': new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([A-Za-z]{3})([0-9]{6})([0-9A-Za-z]{3}))$/)
      ])
    });
  }
  @Output() emitTipoPersona = new EventEmitter<CatalogoModel>(); 
  @Input() codigopostal = '';
  @Input() aseguradoraSelect: string ;
  @Input() razonsocial = '';
  @ViewChild('dp') dp: NgbDatepicker;
  catTipoPersona: CatalogoModel[];
  itemTipoPersona: CatalogoModel;
  RFCMoral: string = '';
  Calle: string = '';
  NumeExterior: string = '';
  NumInterior: string = '';
  year;
  mon;
  day;
  yearulti:number;
  yearpri:number;
  fechacontiaseg: NgbDateStruct;
  date: { year: number, month: number };
  cols: {
    iIdUbicacion: number,
    sUbicacion: string }[];
  coloniasel;
  estado: string;
  municipio: string;
  ubicacion: any;
  item = '';
  formRFCMo: FormGroup;
  habilitarcampos = false;
  ngOnInit(): void {
    this.itemTipoPersona={ sDato:'Moral',sLlave:'M' }
    this.getUbicacion();
    this.calculaminymax();
    this.CargarTipoFiscal();
  }
  getUbicacion( cp ?: string ) {
    this.coloniasel = '';
    this.InfovehiculoService.getApiCPs({
      IdAplication: 2,
      NombreCatalogo: 'Sepomex',
      Filtro: !!this.codigopostal ? this.codigopostal : cp,
    }).subscribe((data: any) => {
      this.ubicacion = JSON.parse(data.CatalogoJsonString);
      // console.log(this.ubicacion);
      this.estado = this.ubicacion[0].Municipio.Estado.sEstado;
      this.municipio = this.ubicacion[0].Municipio.sMunicipio;
      this.cols = this.ubicacion[0].Ubicacion;
      if (this.cols.length == 1) {
        this.coloniasel=this.cols[0].sUbicacion;
      } 
    }); // suscribecierra
  }
  verificater( nomemp ?: string ){
  }
  onback(){
    this.locate.back();
  }
  calculaminymax(){
    const today = new Date();
      this.year = today.getFullYear();
      this.mon = today.getMonth() + 1;
      this.day = today.getDay();
  
  this.yearulti=Number( today.getFullYear()-75);
  this.yearpri=Number( today.getFullYear()-18);
  console.log(this.yearulti+'   '+this.yearpri)

  }
  mayusRFC(rfcmor: string){
    this.RFCMoral=rfcmor.toLocaleUpperCase()
  }
  
 habilitarcam(){
    this.habilitarcampos= !this.habilitarcampos
  }
  onSelectTipoPersona(){
    if(this.itemTipoPersona.sDato=='Física'){
      this.emitTipoPersona.emit(this.itemTipoPersona);
    }
  }
  CargarTipoFiscal(): void {
    const tipos: CatalogoModel[] = [];
    tipos.push({ sDato: 'Física', sLlave: 'F' });
      tipos.push({ sDato: 'Moral', sLlave: 'M' });
    this.catTipoPersona = tipos;
  }
}
