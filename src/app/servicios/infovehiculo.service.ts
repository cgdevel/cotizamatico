import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PeticionCatalogo } from '../interphaces/peticion';
import { PeticionCatalogoCps } from '../interphaces/peticioncps';
import { RequestCatalogo } from '../interphaces/request/RequestCatalogo.model';
import {ResponseCatalogo} from '../interphaces/response/ResponseCatalogo.model';

@Injectable({
  providedIn: 'root'
})
export class InfovehiculoService {
  
  public getApiInfovehiculo(query: PeticionCatalogo){
    return this.http.post<any>(
      `${environment.url_api_autos}/catalogoCotizamaticoBr`,
      query
    );
  }
  getCatalogos(request: RequestCatalogo) {
    return this.http.post<ResponseCatalogo>(
      `${environment.url_api_autos}/catalogoCotizamaticoBr`,
      request
    );
  }
  public getApiCPs(query: PeticionCatalogoCps){
    return this.http.post("https://apitestcotizamatico.azurewebsites.net/api/catalogos",query);
  }

   constructor(private http:HttpClient){
 }

 
}
