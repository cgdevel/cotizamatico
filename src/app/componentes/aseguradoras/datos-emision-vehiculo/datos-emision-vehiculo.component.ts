import { Component, Input, OnInit } from '@angular/core';
import { InfovehiculoService } from '../../../servicios/infovehiculo.service';
import { CatalogoModel } from '../../../interphaces/models/Catalogos.model';

@Component({
  selector: 'app-datos-emision-vehiculo',
  templateUrl: './datos-emision-vehiculo.component.html',
  styleUrls: ['./datos-emision-vehiculo.component.css'],
})
export class DatosEmisionVehiculoComponent implements OnInit {
  @Input() modeloSelect: CatalogoModel = { sLlave: '', sDato: '' };
  @Input() anioSelect: CatalogoModel;
  @Input() marcaSelect: CatalogoModel;
  @Input() descripSelect: CatalogoModel;

  numeroSerieValido: boolean;
  numeroSerieTramite = '';
  numeroSerieValidando: boolean;

  numeroPlaca = '';
  numeroMotor = '';
  numeroSerie = '';
  constructor(private infovehiculoService: InfovehiculoService) {}

  ngOnInit(): void {
    this.numeroSerieValido = false;
    this.numeroSerieValidando = false;
    this.numeroMotor = 'SIN NUMERO';
    this.numeroPlaca = 'PERMISO';
  }

  onValidarNumdeSerie(): void {
    this.numeroSerieValidando = true;

    this.infovehiculoService
      .getValidarSerie(this.numeroSerie)
      .subscribe((resp) => {
        if (!resp.Success) {
          this.numeroSerieValidando = false;
          this.numeroSerieValido = true;
          this.numeroSerieTramite =
            resp.sNumeroPoliza === '' ? 'Solicitando' : resp.sNumeroPoliza;
          return;
        }

        this.numeroSerieValidando = false;
        this.numeroSerieValido = false;
        this.numeroSerieTramite = '';
      });
  }
}
