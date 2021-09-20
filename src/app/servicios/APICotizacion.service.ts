import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RequestIdPeticionCotizacion } from "../interphaces/request/RequestIdPeticionCotizacion";
import { ResponseIdPeticionCotizacion } from "../interphaces/response/ResponseIdPeticionCotizacion";
import { RequestIdCotizacion } from "../interphaces/request/RequestIdCotizacion";
import { ResponseIdCotizacion } from "../interphaces/response/ResponseIdCotizacion";
import {environment} from "../../environments/environment";
import {RequestCatalogoCoberturas}  from "../interphaces/request/RequesteCatalogoCoberturas";
import { ResponseCatalogoCoberturas } from "../interphaces/response/ReponseCatalogoCoberturas";

@Injectable({
    providedIn: 'root',
  })
  export class APICotizacionService {
     constructor(private http: HttpClient) { }
    
     getIdPeticion( payload : RequestIdPeticionCotizacion ){
        return this.http.post<ResponseIdPeticionCotizacion>( `${environment.url_APICotizacion}/cotizacion`, payload);
     }

     getIdCotizacion( payload : RequestIdCotizacion ){
        return this.http.post<ResponseIdCotizacion>( `${environment.url_APICotizacion}/peticion`,payload);
     }

     getCatalogosCoberturas(payload: RequestCatalogoCoberturas){
         return this.http.post<ResponseCatalogoCoberturas>( `${environment.url_APICotizacion}/Catalogo`,payload);
     }


  }
  