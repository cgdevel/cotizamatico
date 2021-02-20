import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { RequestCatalogoCotizamatico } from 'src/app/interphaces/request/RequestCatalogoCotizamatico.model';
import { InfovehiculoService } from '../../../servicios/infovehiculo.service';

@Component({
  selector: 'app-infoasegurado',
  templateUrl: './infoasegurado.component.html',
  styleUrls: ['./infoasegurado.component.css'],
})
export class InfoaseguradoComponent implements OnInit {
  @Output() emitClienteNombre = new EventEmitter<string>();
  @Input() clienteNombre: string;
  valClienteNombre: boolean;

  @Output() emitClienteMail = new EventEmitter<string>();
  @Input() clienteMail: string;
  valClienteMailVacio: boolean;
  valClienteMailNoValido: boolean;

  @Output() emitClienteTelefono = new EventEmitter<string>();
  @Input() clienteTelefono: string;
  valClienteTelefonoVacio: boolean;
  valClienteTelefonoNoValido: boolean;

  @Output() emitClienteTipoPersona = new EventEmitter<string>();
  @Input() clienteEsFemenino: boolean;
  @Input() clienteEsMasculino: boolean;
  @Input() clienteEsMoral: boolean;

  @Output() emitClienteCodigoPostal = new EventEmitter<string>();
  @Input() clienteCodigoPostal: string;
  valCodigoPostalVacio: boolean;
  valCodigoPostalLongitud: boolean;
  valCodigoPostalValidando: boolean;
  valCodigoPostalValido: boolean;

  /* Varaibles Erika */
  @Output() pasad = new EventEmitter<string>();
  @Output() pasam = new EventEmitter<string>();
  @Output() pasay = new EventEmitter<string>();
  @Output() pastel = new EventEmitter<string>();
  @Output() pasnom = new EventEmitter<string>();
  @Output() pasemail = new EventEmitter<string>();
  @Output() pascp = new EventEmitter<string>();
  @Output() pasgenmu = new EventEmitter<boolean>();
  @Output() pasgenselmu = new EventEmitter<string>();
  @Output() pasgenho = new EventEmitter<boolean>();
  @Output() pasgenselho = new EventEmitter<string>();
  @Output() pasgenem = new EventEmitter<boolean>();
  @Output() pasgenselem = new EventEmitter<string>();

  /* Variables para corregir errores */
  annos: [];
  gema: string;

  // ESTAS VARIABLES SON PARA LA VALIDACION (NO VACIO)
  @Input() existe: boolean;
  existeT: boolean;
  vacemial: boolean;
  vacnom: boolean;
  // valores para código postal
  ubicacion: any;
  @Input() codigoPostal: string;
  @Input() validot: boolean;
  @Input() TELEFONO: string;
  @Input() valido: boolean;
  @Input() validonom: boolean;
  @Input() EMAIL: string;
  @Input() NOMBRE: string;
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
  mes: string; // Iniciamos mes
  vermes: string;
  fechaann: string; // Iniciamos fechaann
  verfechaann: string;
  dia: string; // Iniciamos dia
  // console.log(this.mesdiabis[0][1])//DIAS
  // console.log(this.mesdiabis[0][0])//MESES
  verdia: string;
  @Input() selectedmes;
  @Input() selectedyear;
  @Input() selecteddia;
  selected;
  // Valores botones soy
  @Input() disabled;
  statussoymujer = 'NoSelected';
  statussoyhombre = 'NoSelected';
  statussoyempresa = 'NoSelected';
  @Input() showchiquito;

  constructor(private infovehiculoService: InfovehiculoService) {}

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

    this.mesdiabis = [
      ['Enero', 31],
      ['Febrero', 29],
      ['Marzo', 31],
      ['Abril', 30],
      ['Mayo', 31],
      ['Junio', 30],
      ['Julio', 31],
      ['Agosto', 31],
      ['Septiembre', 30],
      ['Octubre', 31],
      ['Noviembre', 30],
      ['Diciembre', 31],
    ];

    this.mesdia = [
      ['Enero', 31],
      ['Febrero', 28],
      ['Marzo', 31],
      ['Abril', 30],
      ['Mayo', 31],
      ['Junio', 30],
      ['Julio', 31],
      ['Agosto', 31],
      ['Septiembre', 30],
      ['Octubre', 31],
      ['Noviembre', 30],
      ['Diciembre', 31],
    ];

    this.meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    // console.log(this.meses)
    this.dias = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
    ];

    // this.fechaannos = [];
    // const today = new Date();
    // this.year = today.getFullYear();
    // this.date = today.getDate();
    // this.month = today.getMonth();
    // this.gema = this.year - 75;

    // for (let index = this.gema; index <= this.year - 18; index++) {
    //   this.fechaannos.push(index);
    // }
  }

  onNombreChanged() {
    if (this.clienteNombre === '') {
      this.valClienteNombre = false;
      this.emitClienteNombre.emit('');
    } else {
      this.valClienteNombre = true;
      this.emitClienteNombre.emit(this.clienteNombre);
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
    } else {
      this.emitClienteMail.emit('');
    }
  }

  onTelefonoChange() {
    if (this.clienteTelefono === '') {
      this.valClienteTelefonoVacio = false;
      this.valClienteTelefonoNoValido = true;
      return;
    }

    this.valClienteTelefonoVacio = true;

    if (this.clienteTelefono !== '' && this.clienteTelefono.length === 10) {
      const regt1 = /[1]{4}/;
      const regt2 = /[2]{4}/;
      const regt3 = /[3]{4}/;
      const regt4 = /[4]{4}/;
      const regt5 = /[5]{4}/;
      const regt6 = /[6]{4}/;
      const regt7 = /[7]{4}/;
      const regt8 = /[8]{4}/;
      const regt9 = /[9]{4}/;
      const regt0 = /[0]{4}/;

      this.valClienteTelefonoNoValido = regt1.test(this.clienteTelefono);
      if (this.valClienteTelefonoNoValido) {
        this.emitClienteTelefono.emit('');
      } else {
        this.valClienteTelefonoNoValido = regt2.test(this.clienteTelefono);
        if (this.valClienteTelefonoNoValido) {
          this.emitClienteTelefono.emit('');
        } else {
          this.valClienteTelefonoNoValido = regt3.test(this.clienteTelefono);
          if (this.valClienteTelefonoNoValido) {
            this.emitClienteTelefono.emit('');
          } else {
            this.valClienteTelefonoNoValido = regt4.test(this.clienteTelefono);
            if (this.valClienteTelefonoNoValido) {
              this.emitClienteTelefono.emit('');
            } else {
              this.valClienteTelefonoNoValido = regt5.test(
                this.clienteTelefono
              );
              if (this.valClienteTelefonoNoValido) {
                this.emitClienteTelefono.emit('');
              } else {
                this.valClienteTelefonoNoValido = regt6.test(
                  this.clienteTelefono
                );
                if (this.valClienteTelefonoNoValido) {
                  this.emitClienteTelefono.emit('');
                } else {
                  this.valClienteTelefonoNoValido = regt7.test(
                    this.clienteTelefono
                  );
                  if (this.valClienteTelefonoNoValido) {
                    this.emitClienteTelefono.emit('');
                  } else {
                    this.valClienteTelefonoNoValido = regt8.test(
                      this.clienteTelefono
                    );
                    if (this.valClienteTelefonoNoValido) {
                      this.emitClienteTelefono.emit('');
                    } else {
                      this.valClienteTelefonoNoValido = regt9.test(
                        this.clienteTelefono
                      );
                      if (this.valClienteTelefonoNoValido) {
                        this.emitClienteTelefono.emit('');
                      } else {
                        this.valClienteTelefonoNoValido = regt0.test(
                          this.clienteTelefono
                        );
                        if (this.valClienteTelefonoNoValido) {
                          this.emitClienteTelefono.emit('');
                        } else {
                          this.emitClienteTelefono.emit(this.clienteTelefono);
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
      this.valClienteTelefonoNoValido = false;
      this.emitClienteTelefono.emit('');
    }
  }

  onTipoPersonaFemeninoChange() {
    this.clienteEsFemenino = true;
    this.clienteEsMasculino = false;
    this.clienteEsMoral = false;
    this.emitClienteTipoPersona.emit('Femenino');
  }

  onTipoPersonaMasculinoChange() {
    this.clienteEsFemenino = false;
    this.clienteEsMasculino = true;
    this.clienteEsMoral = false;
    this.emitClienteTipoPersona.emit('Masculino');
  }

  onTipoPersonaMoralChange() {
    this.clienteEsFemenino = false;
    this.clienteEsMasculino = false;
    this.clienteEsMoral = true;
    this.emitClienteTipoPersona.emit('Moral');
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

      this.emitClienteCodigoPostal.emit(this.codigoPostal);
    });
  }

  // Funciones selección fecha de nacimiento
  getmes() {
    // console.log(this.selectedmes)
    this.vermes = this.selectedmes;
    this.pasam.emit(this.vermes);
    this.calculabis();
  }
  getanno() {
    // Limpia
    // this.selecteddia=""
    // this.verdia=""
    // console.log(this.selectedyear)
    this.verfechaann = this.selectedyear;
    this.pasay.emit(this.verfechaann);
    this.calculabis();
  }
  getdia() {
    // console.log(this.selecteddia)
    this.verdia = this.selecteddia;
    this.pasad.emit(this.verdia);
    var num = parseInt(this.selecteddia, 10);
    if (num == 28) {
      // console.log(" 1 if 28")
      this.meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];
      if (
        this.selecteddia != '' &&
        this.verdia != '' &&
        this.verfechaann != '' &&
        this.selectedyear != ''
      ) {
        this.calculabis();
      } else {
        // console.log('Algo falló')
      }
    } else {
      if (num == 29) {
        // console.log("2 if 29")
        this.meses = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ];
        if (
          this.selecteddia != '' &&
          this.verdia != '' &&
          this.verfechaann != '' &&
          this.selectedyear != ''
        ) {
          this.calculabis();
        } else {
          // console.log('Algo falló')
        }
      } else {
        if (num == 30) {
          // console.log("3 if 30")
          this.meses = [
            'Enero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
          ];
          this.calculabis();
        } else {
          if (num == 31) {
            // console.log("4 if 31")
            this.meses = [
              'Enero',
              'Marzo',
              'Mayo',
              'Julio',
              'Agosto',
              'Octubre',
              'Diciembre',
            ];
            this.calculabis();
          } else {
            // console.log("5 if < 28")
            this.dias = [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31,
            ];
            this.meses = [
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre',
            ];
            this.calculabis();
          }
        }
      }
    }
  }
  // Función para determinar tipo de año (bisiesto/ no bisiesto)
  calculabis() {
    this.dias = [];
    if (this.verfechaann != '' && this.vermes != '') {
      var numerican = Number(this.verfechaann);
      // console.log(this.verfechaann+' ' + this.vermes)
      numerican % 4 == 0
        ? numerican % 100 == 0
          ? numerican % 400 == 0
            ? (this.bisiesto = true)
            : (this.bisiesto = false)
          : (this.bisiesto = true)
        : (this.bisiesto = false);
      //this.bisiesto ? (console.log(this.mesdiabis)) :(console.log(this.mesdia))
      if (this.bisiesto) {
        // console.log(numerican  +' '+"BISIESTO")
        this.dias = [];
        for (let index = 0; index < this.mesdiabis.length; index++) {
          if (this.mesdiabis[index][0] == this.vermes) {
            var hastaaquibi = Number(this.mesdiabis[index][1]);
            // console.log( hastaaquibi +' '+ this.vermes)
            for (let index = 1; index <= hastaaquibi; index++) {
              this.dias.push(index);
            }
          }
        }
      } else {
        if (!this.bisiesto) {
          // console.log(numerican +' '+"NO BISIESTO")
          for (let index = 0; index < this.mesdia.length; index++) {
            if (this.mesdia[index][0] == this.vermes) {
              var hastaaqui = Number(this.mesdia[index][1]);
              // console.log(this.mesdia[index][1])
              // console.log( hastaaqui+' '+ this.vermes)
              for (let index = 1; index <= hastaaqui; index++) {
                this.dias.push(index);
              }
              if (
                !this.bisiesto &&
                this.selecteddia == 29 &&
                this.selectedmes == 'Febrero'
              ) {
                // Limpia día
                this.selecteddia = '';
                this.verdia = '';
                this.pasad.emit('');
              }
            }
          }
        }
      }
    } else {
      this.dias = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
      ];
      // console.log("Te falta")
    }
  }
}
