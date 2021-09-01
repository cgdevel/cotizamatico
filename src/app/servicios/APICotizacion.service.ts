import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RequestIdPeticionCotizacion } from "../interphaces/request/RequestIdPeticionCotizacion";
import { ResponseIdPeticionCotizacion } from "../interphaces/response/ResponseIdPeticionCotizacion";
import { RequestIdCotizacion } from "../interphaces/request/RequestIdCotizacion";
import { ResponseIdCotizacion } from "../interphaces/response/ResponseIdCotizacion";
import {environment} from "../../environments/environment"
@Injectable({
    providedIn: 'root',
  })
  export class APICotizacionService {
     constructor(private http: HttpClient) { }
    
     getIdPeticion( payload : RequestIdPeticionCotizacion ){
        return this.http.post<ResponseIdPeticionCotizacion>( `${environment.url_APICotizacion}/cotizacion`, payload
      //   { 
      //      ...payload,
      //           User: "COTIZAMATICO",
      //           Device: "EMULATOR30X1X5X0",
      //           Token: "7C2C8D3B-C488-4D14-B360-6B94013A0C4E",
      //           Credencial: {
      //             IdCredential: 3418,
      //             IdProfile: 85
      //          },
      //          SubRamo: {
      //             iIdSubRamo: 1,
      //             Ramo: null,
      //             iLineaNegocio: 0,
      //             iEstatus: 0,
      //             iIdMostar: 0,
      //             iOrdenPresentacion: 0,
      //             sSubramo: "AUTOS",
      //             sAlias: null,
      //             sDescripcion: null,
      //             lineaNegocio: null
      //          }
      // }

         );
     }

     getIdCotizaicon( payload : RequestIdCotizacion ){
        return this.http.post<ResponseIdCotizacion>( `${environment.url_APICotizacion}/peticion`,payload);
     }

  }
  