import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PeticionCatalogo } from '../interphaces/peticion';
import { PeticionCatalogoCps } from '../interphaces/peticioncps';
import { RequestCatalogo } from '../interphaces/request/RequestCatalogo.model';
import { ResponseCatalogo } from '../interphaces/response/ResponseCatalogo.model';

@Injectable({
  providedIn: 'root',
})
export class InfovehiculoService {
  constructor(private http: HttpClient) {}

  public getApiInfovehiculo(query: PeticionCatalogo) {
    return this.http.post<any>(
      `${environment.url_api_autos}/catalogoCotizamaticoBr`,
      query
    );
  }
  public getApiCPs(query: PeticionCatalogoCps) {
    return this.http.post<any>(`${environment.url_api_autos}/catalogos`, query);
  }

  getCatalogos(request: RequestCatalogo) {
    return this.http.post<ResponseCatalogo>(
      `${environment.url_api_autos}/catalogoCotizamaticoBr`,
      request
    );
  }
}
