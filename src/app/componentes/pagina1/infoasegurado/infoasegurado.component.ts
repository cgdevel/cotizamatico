import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InfovehiculoService } from '../../../servicios/infovehiculo.service';
import { CatalogoModel } from '../../../interphaces/models/Catalogos.model';
import { FechasModel } from '../../../interphaces/models/Fechas.model';
import { RequestCatalogoCotizamatico } from '../../../interphaces/request/RequestCatalogoCotizamatico.model';
import {MesesConDiasService } from '../../../servicios/meses-con-dias.service';
import {CookieService} from 'ngx-cookie';
@Component({
  selector: 'app-infoasegurado',
  templateUrl: './infoasegurado.component.html',
  styleUrls: ['./infoasegurado.component.css'],
})
export class InfoaseguradoComponent implements OnInit {
  constructor(
    private infovehiculoService: InfovehiculoService,
    private MesesConDias: MesesConDiasService,
    private cookieService: CookieService
    ){}
    @Output() emitClienteNombre = new EventEmitter<string>();
    @Input() clienteNombre: string;
    @Input() clienteNombreCompleto: boolean;
    @Input() valClienteNombre: boolean;
    @Output() emitClienteApellidoPaterno = new EventEmitter<string>();
    @Input() clienteApellidoPaterno: string;
    @Input() valClienteApellidoPaterno: boolean;
    @Output() emitClienteApellidoMaterno = new EventEmitter<string>();
    @Input() clienteApellidoMaterno: string;
    @Input() valClienteApellidoMaterno: boolean;

    @Output() emitClienteMail = new EventEmitter<string>();
    @Input() clienteMail: string;
    @Input() valClienteMailVacio: boolean;
    @Input() valClienteMailNoValido: boolean;

    @Output() emitClienteTelefono = new EventEmitter<string>();
    @Input() clienteTelefono: string;
    valClienteTelefonoVacio: boolean;
    valClienteTelefonoNoValido: boolean;

    @Output() emitClienteTipoPersona = new EventEmitter<string>();
    clienteEsFemenino: boolean;
    clienteEsMasculino: boolean;
    clienteEsMoral: boolean;
    @Input() clienteEsFemeninop3: boolean;
    @Input() clienteEsMasculinop3: boolean;
    @Input() clienteEsMoralp3: boolean;
    @Output() emitClienteCodigoPostal = new EventEmitter<string>();
    @Input() clienteCodigoPostal: string;
    @Input() clienteCodigoPostalp3: string;
    valCodigoPostalVacio: boolean;
    valCodigoPostalLongitud: boolean;
    valCodigoPostalValidando: boolean;
    valCodigoPostalValido: boolean;

    @Output() emitClienteNacimiento = new EventEmitter<FechasModel>();
    @Input() itemNacimientoDiap3: CatalogoModel;
    @Input() itemNacimientoMesp3: CatalogoModel;
    @Input() itemNacimeintoAniop3: CatalogoModel;

    catNacimientoDias: CatalogoModel[];
    catNacimientoMeses: CatalogoModel[];
    catNacimientoAnios: CatalogoModel[];
    @Input() itemNacimientoDia: CatalogoModel;
    @Input() itemNacimientoMes: CatalogoModel;
    @Input() itemNacimeintoAnio: CatalogoModel;
    itemVacio: CatalogoModel;
    itemd: string;
    itemm: string;
    itemy: string;
    year: any;
    // ESTAS VARIABLES SON PARA LA VALIDACION (NO VACIO)
    @Input() existe: boolean;
    existeT: boolean;
    vacemial: boolean;
    vacnom: boolean;
    @Input() codigoPostal: string;
    @Input() validot: boolean;
    @Input() valido: boolean;
    @Input() validonom: boolean;
    // Valores botones soy
    @Input() disabledase;
    @Input() disable;
    bisiesto: boolean;
    cookieNombre: string;
    cookieEmail: string;
    cookieTelefono: string;
    cookieTipoDePersona: string;
    cookieCP: string;
    cookieDiaNaci: any ;
    cookieMesNaci: any ;
    cookieAnioNaci: any ;
    ngOnInit(): void {
      this.valClienteNombre = true;
      this.valClienteMailVacio = true;
      this.valClienteMailNoValido = true;
      this.valClienteTelefonoNoValido = true;
      this.valClienteTelefonoVacio = true;
      this.clienteEsFemenino = false;
      this.clienteEsMasculino = false;
      this.clienteEsMoral = false;
      this.valCodigoPostalLongitud = true;
      this.valCodigoPostalVacio = true;
      this.valCodigoPostalValidando = true;
      this.valCodigoPostalValido = true;
      this.valClienteApellidoMaterno = true;
      this.valClienteApellidoPaterno = true;
      this.catNacimientoAnios = this.MesesConDias.getAnnioSinMesesniDia();
      this.catNacimientoMeses = this.MesesConDias.getMesesconDuracion();
      // console.log(this.MesesConDias.getdiassinnada());
      this.catNacimientoDias = this.MesesConDias.getdiassinnada();
      this.cookieNombre = this.cookieService.get('Nombre');
      this.cookieNombre !== null ? this.clienteNombre = this.cookieNombre : this.clienteNombre = this.clienteNombre;
      this.cookieEmail = this.cookieService.get('Email');
      this.cookieEmail !== null ? this.clienteMail = this.cookieEmail : this.clienteMail = this.clienteMail;
      this.cookieTelefono = this.cookieService.get('Telefono');
      this.cookieTelefono !== null ? this.clienteTelefono = this.cookieTelefono : this.clienteTelefono = this.clienteTelefono;
      this.cookieTipoDePersona = this.cookieService.get('TipoDePersona');
      this.cookieTipoDePersona !== null ? this.cookieTipoDePersona === 'Femenino' ? this.clienteEsFemenino = true :
      this.cookieTipoDePersona === 'Masculino' ? this.clienteEsMasculino = true :
      this.clienteEsMoral = true
      : this.clienteEsFemenino = this.clienteEsFemenino;
      this.clienteEsMasculino = this.clienteEsMasculino;
      this.clienteEsMoral = this.clienteEsMoral;
      this.cookieCP = this.cookieService.get('Codigo Postal');
      this.cookieCP !== null ? this.clienteCodigoPostal = this.cookieCP : this.clienteCodigoPostal = this.clienteCodigoPostal;
      this.cookieDiaNaci = this.cookieService.getObject('DiaDeNacimiento');
      console.log(this.cookieDiaNaci);
      this.cookieDiaNaci !== null ? this.itemNacimientoDia = this.cookieDiaNaci :
      this.itemNacimientoDia = this.itemNacimientoDia;
      this.cookieMesNaci = this.cookieService.getObject('MesDeNacimiento');
      console.log(this.cookieMesNaci);
      this.cookieMesNaci !== null ?  this.itemNacimientoMes = this.cookieMesNaci :
      this.itemNacimientoMes =  this.itemNacimientoMes;
      this.cookieAnioNaci = this.cookieService.getObject('AnioDeNacimiento');
      console.log(this.cookieAnioNaci);
      this.cookieAnioNaci !== null ?  this.itemNacimeintoAnio = this.cookieAnioNaci :
      this.itemNacimeintoAnio =  this.itemNacimeintoAnio;
  }
  onNombreChanged() {
    if (this.clienteNombre === '') {
      this.valClienteNombre = false;
      this.emitClienteNombre.emit('');
    } else {
      this.valClienteNombre = true;
      this.emitClienteNombre.emit(this.clienteNombre);
      let guardacookieNombre = this.clienteNombre ;
      this.cookieService.put('Nombre', guardacookieNombre);
    }
  }
  onApPatChanged() {
    if (this.clienteApellidoPaterno === '') {
      this.valClienteApellidoPaterno = false;
      this.emitClienteApellidoPaterno.emit('');
    } else {
      this.valClienteApellidoPaterno = true;
      this.emitClienteApellidoPaterno.emit(this.clienteApellidoPaterno);
    }
  }
  onApMatChanged() {
    if (this.clienteApellidoMaterno === '') {
      this.valClienteApellidoMaterno = false;
      this.emitClienteApellidoMaterno.emit('');
    } else {
      this.valClienteApellidoMaterno = true;
      this.emitClienteApellidoMaterno.emit(this.clienteApellidoMaterno);
    }
  }
  onMailChanged() {
    if (this.clienteMail === '') {
      this.emitClienteMail.emit('');
      this.valClienteMailNoValido = true;
      this.valClienteMailVacio = false;
      return;
    }
    this.valClienteMailVacio = true;
    const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    this.valClienteMailNoValido = reg.test(this.clienteMail);

    if (this.valClienteMailNoValido) {
      this.emitClienteMail.emit(this.clienteMail);
      let guardacookieEmail = this.clienteMail ;
      this.cookieService.put('Email', guardacookieEmail);
    } else {
      this.emitClienteMail.emit('');
    }
  }

  onTelefonoChange() {
    if (this.clienteTelefono !== '' && this.clienteTelefono.length === 10) {
      const regt1 = /[1]{4}/;
      const regt2 = /[2]{4}/;
      const regt3 = /[3]{4}/;
      const regt4 = /[4]{4}/;
      const regt5 = /[5]{4}/;
      const regt6 = /[6]{4}/;
      const  regt7 = /[7]{4}/;
      const regt8 = /[8]{4}/;
      const  regt9 = /[9]{4}/;
      const regt0 = /[0]{4}/;
      this.validot = regt1.test(this.clienteTelefono);
      if (this.validot) {
        this.valClienteTelefonoNoValido = false;
        this.emitClienteTelefono.emit('');
      } else {
        this.validot = regt2.test(this.clienteTelefono);
        if (this.validot) {
          this.valClienteTelefonoNoValido = false;
          this.emitClienteTelefono.emit('');
        } else {
          this.validot = regt3.test(this.clienteTelefono);
          if (this.validot) {
            this.valClienteTelefonoNoValido = false;
            this.emitClienteTelefono.emit('');
          } else {
            this.validot = regt4.test(this.clienteTelefono);
            if (this.validot) {
              this.valClienteTelefonoNoValido = false;
              this.emitClienteTelefono.emit('');
            } else {
              this.validot = regt5.test(this.clienteTelefono);
              if (this.validot) {
                this.valClienteTelefonoNoValido = false;
                this.emitClienteTelefono.emit('');
              } else {
                this.validot = regt6.test(this.clienteTelefono);
                if (this.validot) {
                  this.valClienteTelefonoNoValido = false;
                  this.emitClienteTelefono.emit('');
                } else {
                  this.validot = regt7.test(this.clienteTelefono);
                  if (this.validot) {
                    this.valClienteTelefonoNoValido = false;
                    this.emitClienteTelefono.emit('');
                  } else {
                    this.validot = regt8.test(this.clienteTelefono);
                    if (this.validot) {
                      this.valClienteTelefonoNoValido = false;
                      this.emitClienteTelefono.emit('');
                    } else {
                      this.validot = regt9.test(this.clienteTelefono);
                      if (this.validot) {
                        this.valClienteTelefonoNoValido = false;
                        this.emitClienteTelefono.emit('');
                      } else {
                        this.validot = regt0.test(this.clienteTelefono);
                        if (this.validot) {
                          this.valClienteTelefonoNoValido = false;
                          this.emitClienteTelefono.emit('');
                        } else {
                          this.valClienteTelefonoNoValido = true;
                          this.valClienteTelefonoVacio = true;
                          this.emitClienteTelefono.emit(this.clienteTelefono);
                          let guardacookieTelefono = this.clienteTelefono ;
                          this.cookieService.put('Telefono', guardacookieTelefono);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      if (this.clienteTelefono === '') {
        this.valClienteTelefonoVacio = false;
        this.valClienteTelefonoNoValido = false;
        this.emitClienteTelefono.emit('');
        return;
      }
      if (this.clienteTelefono.length !== 10) {
        this.valClienteTelefonoNoValido = false;
        this.valClienteTelefonoNoValido = false;
        this.emitClienteTelefono.emit('');
        return;
      }
    }
  }
  onTipoPersonaFemeninoChange() {
    this.clienteEsFemenino = true;
    this.clienteEsMasculino = false;
    this.clienteEsMoral = false;
    this.clienteEsFemeninop3 = true;
    this.clienteEsMasculinop3 = false;
    this.clienteEsMoralp3 = false;
    this.emitClienteTipoPersona.emit('Femenino');
    let guardacookieTipoDePersona = 'Femenino' ;
    this.cookieService.put('TipoDePersona', guardacookieTipoDePersona);
  }

  onTipoPersonaMasculinoChange() {
    this.clienteEsFemenino = false;
    this.clienteEsMasculino = true;
    this.clienteEsMoral = false;
    this.clienteEsFemeninop3 = false;
    this.clienteEsMasculinop3 = true;
    this.clienteEsMoralp3 = false;
    this.emitClienteTipoPersona.emit('Masculino');
    let guardacookieTipoDePersona = 'Masculino' ;
    this.cookieService.put('TipoDePersona', guardacookieTipoDePersona);
  }

  onTipoPersonaMoralChange() {
    this.clienteEsFemenino = false;
    this.clienteEsMasculino = false;
    this.clienteEsMoral = true;
    this.clienteEsFemeninop3 = false;
    this.clienteEsMasculinop3 = false;
    this.clienteEsMoralp3 = true;
    this.emitClienteTipoPersona.emit('Moral');
    let guardacookieTipoDePersona = 'Moral' ;
    this.cookieService.put('TipoDePersona', guardacookieTipoDePersona);
  }

  onCodigoPostalChanged() {
    this.valCodigoPostalLongitud = true;
    this.valCodigoPostalVacio = true;
    this.valCodigoPostalValidando = true;
    this.valCodigoPostalValido = true;
    if (this.clienteCodigoPostal === '') {
      this.valCodigoPostalVacio = false;
      this.emitClienteCodigoPostal.emit('');
      return;
    }

    if (this.clienteCodigoPostal.length < 5) {
      this.valCodigoPostalLongitud = false;
      this.emitClienteCodigoPostal.emit('');
      return;
    }

    this.valCodigoPostalValidando = false;

    const req: RequestCatalogoCotizamatico = {
      Filtro: this.clienteCodigoPostal,
      IdAplication: 2,
      NombreCatalogo: 'Sepomex',
    };

    this.infovehiculoService.getCatalogosCotizamatico(req).subscribe((data) => {
      this.valCodigoPostalValidando = true;

      if (data.Error !== null) {
        this.valCodigoPostalValido = false;
        this.emitClienteCodigoPostal.emit('');
        return;
      }

      this.emitClienteCodigoPostal.emit(this.clienteCodigoPostal);
      let guardacookieCodigoPostal = this.clienteCodigoPostal ;
      this.cookieService.put('Codigo Postal', guardacookieCodigoPostal);
    });
  }

  selectNacimientoDia() {
    if ( this.itemNacimientoDia.sDato !== '' && this.itemNacimientoMes.sDato !== '' && this.itemNacimeintoAnio.sDato !== '' ) {
      this.emitClienteNacimiento.emit({
        dia: this.itemNacimientoDia.sDato,
        mes: this.itemNacimientoMes.sDato,
        anio: this.itemNacimeintoAnio.sDato
      });
    }
    let guardacookieDiaNacimiento = this.itemNacimientoDia;
    this.cookieService.putObject('DiaDeNacimiento', guardacookieDiaNacimiento);
  }

  selectNacimientoMes() {
    if (this.itemNacimientoDia !== undefined ) {
      const no = Number(this.itemNacimientoMes.sLlave);
      this.catNacimientoDias = [];
      const noo = Number(this.itemNacimientoDia.sDato);
      if ( noo > no) {
        this.itemNacimientoDia = {sDato: '', sLlave: ''};
        this.catNacimientoDias = this.dameduracion(this.itemNacimientoMes.sLlave);
      }else{
        this.catNacimientoDias = this.dameduracion(this.itemNacimientoMes.sLlave);
        this.itemNacimientoDia = this.itemNacimientoDia;
    }
    }
    const no = Number(this.itemNacimientoMes.sLlave);
    this.catNacimientoDias = this.dameduracion(this.itemNacimientoMes.sLlave);
    if ( this.itemNacimientoDia.sDato !== '' && this.itemNacimientoMes.sDato !== '' && this.itemNacimeintoAnio.sDato !== '' ) {
      this.emitClienteNacimiento.emit({
        dia: this.itemNacimientoDia.sDato,
        mes: this.itemNacimientoMes.sDato,
        anio: this.itemNacimeintoAnio.sDato
      });
    }
    let guardacookieMesNacimiento = this.itemNacimientoMes;
    this.cookieService.putObject('MesDeNacimiento', guardacookieMesNacimiento);
  }

  selectNacimientoAnio() {
    this.catNacimientoMeses = [];
    this.catNacimientoMeses = this.MesesConDias.getMesesconDuracion(this.itemNacimeintoAnio.sDato);
    // console.log(this.catNacimientoMeses);
    this.catNacimientoDias = [];
    this.catNacimientoDias = this.dameduracion(this.itemNacimientoMes.sLlave);
    if ( this.itemNacimientoDia.sDato !== '' && this.itemNacimientoMes.sDato !== '' && this.itemNacimeintoAnio.sDato !== '' ) {
      this.emitClienteNacimiento.emit({
        dia: this.itemNacimientoDia.sDato,
        mes: this.itemNacimientoMes.sDato,
        anio: this.itemNacimeintoAnio.sDato
      });
    }
    let guardacookieAnioNacimiento = this.itemNacimeintoAnio ;
    this.cookieService.putObject('AnioDeNacimiento', guardacookieAnioNacimiento);
  }

  dameduracion( mes: string){
    const numeromes = Number(mes);
    const mesdura: CatalogoModel[] = [];
    // console.log(numeromes);
    for (let index = 1; index <= numeromes ; index++) {
      mesdura.push({sLlave: index.toString(), sDato : index.toString()});
    }
    // console.log(mesdura);
    return mesdura;
  }
}
