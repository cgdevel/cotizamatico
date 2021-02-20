import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PeticionCatalogo } from '../interphaces/peticion';
import { PeticionCatalogoCps } from '../interphaces/peticioncps';
import { RequestCatalogo } from '../interphaces/request/RequestCatalogo.model';
import { ResponseCatalogo } from '../interphaces/response/ResponseCatalogo.model';
import { RequestCatalogoCotizamatico } from '../interphaces/request/RequestCatalogoCotizamatico.model';
import { ResponseCatalogoCotizamatico } from '../interphaces/response/ResponseCatalogoCotizamatico.model';
import { CatalogoModel } from '../interphaces/models/Catalogos.model';

@Injectable({
  providedIn: 'root',
})
export class InfovehiculoService {
  constructor(private http: HttpClient) {}

  getApiInfovehiculo(query: PeticionCatalogo) {
    return this.http.post<any>(
      `${environment.url_api_autos}/catalogoCotizamaticoBr`,
      query
    );
  }

  getApiCPs(query: PeticionCatalogoCps) {
    return this.http.post<any>(`${environment.url_api_autos}/catalogos`, query);
  }

  getCatalogos(request: RequestCatalogo) {
    return this.http.post<ResponseCatalogo>(
      `${environment.url_api_autos}/catalogoCotizamaticoBr`,
      request
    );
  }

  getCatalogosCotizamatico(request: RequestCatalogoCotizamatico) {
    return this.http.post<ResponseCatalogoCotizamatico>(
      `${environment.url_api_autos}/catalogos`,
      request
    );
  }

  getCatalogoFechaDias() {
    const dias: CatalogoModel[] = [];

    for (let i = 0; i < 31; i++) {
      dias.push({ sLlave: (i + 1).toString(), sDato: (i + 1).toString() });
    }

    const resp: ResponseCatalogo = {
      bSuccess: true,
      sMensaje: '',
      catalogos: dias,
    };

    return resp;
  }

  getCatalogoFechaMeses(dia: string) {
    const diaSelect = Number(dia);
    const meses: CatalogoModel[] = [];

    switch (diaSelect) {
      case 31:
        meses.push({ sDato: 'ENERO', sLlave: '01' });
        meses.push({ sDato: 'MARZO', sLlave: '03' });
        meses.push({ sDato: 'MAYO', sLlave: '05' });
        meses.push({ sDato: 'JULIO', sLlave: '07' });
        meses.push({ sDato: 'AGOSTO', sLlave: '08' });
        meses.push({ sDato: 'OCTUBRE', sLlave: '10' });
        meses.push({ sDato: 'DICIEMBRE', sLlave: '12' });
        break;

      case 30:
        meses.push({ sDato: 'ENERO', sLlave: '01' });
        meses.push({ sDato: 'MARZO', sLlave: '03' });
        meses.push({ sDato: 'ABRIL', sLlave: '04' });
        meses.push({ sDato: 'MAYO', sLlave: '05' });
        meses.push({ sDato: 'JUNIO', sLlave: '06' });
        meses.push({ sDato: 'JULIO', sLlave: '07' });
        meses.push({ sDato: 'AGOSTO', sLlave: '08' });
        meses.push({ sDato: 'SEPTIEMBRE', sLlave: '09' });
        meses.push({ sDato: 'OCTUBRE', sLlave: '10' });
        meses.push({ sDato: 'NOVIEMBRE', sLlave: '11' });
        meses.push({ sDato: 'DICIEMBRE', sLlave: '12' });
        break;

      default:
        meses.push({ sDato: 'ENERO', sLlave: '01' });
        meses.push({ sDato: 'FEBRERO', sLlave: '02' });
        meses.push({ sDato: 'MARZO', sLlave: '03' });
        meses.push({ sDato: 'ABRIL', sLlave: '04' });
        meses.push({ sDato: 'MAYO', sLlave: '05' });
        meses.push({ sDato: 'JUNIO', sLlave: '06' });
        meses.push({ sDato: 'JULIO', sLlave: '07' });
        meses.push({ sDato: 'AGOSTO', sLlave: '08' });
        meses.push({ sDato: 'SEPTIEMBRE', sLlave: '09' });
        meses.push({ sDato: 'OCTUBRE', sLlave: '10' });
        meses.push({ sDato: 'NOVIEMBRE', sLlave: '11' });
        meses.push({ sDato: 'DICIEMBRE', sLlave: '12' });
        break;
    }

    const resp: ResponseCatalogo = {
      bSuccess: true,
      sMensaje: '',
      catalogos: meses,
    };

    return resp;
  }

  getCatalogoFechaAnios(dia: string, mes: string) {
    const anios: CatalogoModel[] = [];
    const diaSelect = Number(dia);
    const mesSelect = Number(mes);
    const bAnioBisiesto = diaSelect === 29 && mesSelect === 2;

    const anioInicio = new Date().getFullYear() - 18;
    const anioFin = new Date().getFullYear() - 75;

    for (let i = anioInicio; i >= anioFin; i--) {
      if (bAnioBisiesto) {
        if (i % 4 === 0) {
          anios.push({ sLlave: i.toString(), sDato: i.toString() });
        }
      } else {
        anios.push({ sLlave: i.toString(), sDato: i.toString() });
      }
    }

    const resp: ResponseCatalogo = {
      bSuccess: true,
      sMensaje: '',
      catalogos: anios,
    };

    return resp;
  }
}
