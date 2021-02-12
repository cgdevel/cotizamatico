import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeticionCatalogo } from '../interphaces/peticion';
import { PeticionCatalogoCps } from '../interphaces/peticioncps';

@Injectable({
  providedIn: 'root'
})
export class InfovehiculoService {
  public getApiInfovehiculo(query: PeticionCatalogo){
    return this.http.post("https://apitestcotizamatico.azurewebsites.net/api/catalogoCotizamaticoBr",query);
  }
  public getApiCPs(query: PeticionCatalogoCps){
    return this.http.post("https://apitestcotizamatico.azurewebsites.net/api/catalogos",query);
  }
   constructor(private http:HttpClient){
 }
}
