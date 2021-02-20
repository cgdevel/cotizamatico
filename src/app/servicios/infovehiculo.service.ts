import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PeticionCatalogo } from '../interphaces/peticion';
import { PeticionCatalogoCps } from '../interphaces/peticioncps';
import { RequestCatalogo } from '../interphaces/request/RequestCatalogo.model';
import { ResponseCatalogo } from '../interphaces/response/ResponseCatalogo.model';
import { RequestCatalogoCotizamatico } from '../interphaces/request/RequestCatalogoCotizamatico.model';
import { ResponseCatalogoCotizamatico } from '../interphaces/response/ResponseCatalogoCotizamatico.model';

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
}
