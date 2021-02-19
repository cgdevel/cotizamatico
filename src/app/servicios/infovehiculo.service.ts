import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PeticionCatalogo } from '../interphaces/peticion';
import { PeticionCatalogoCps } from '../interphaces/peticioncps';
import { RequestCatalogo } from '../interphaces/request/RequestCatalogo.model';
import {ResponseCatalogo} from '../interphaces/response/ResponseCatalogo.model';
import {RequestNacionalidad } from '../../app/interphaces/nacionali';

@Injectable({
  providedIn: 'root'
})
export class InfovehiculoService {
  Nacionalidades = new Array<RequestNacionalidad>();
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
  getNacionalidades(){
    // this.Nacionalidades.length=173
    this.Nacionalidades.push(
     {NacString:'NAMIBIANA',NacClave:  'NAM'},
     {NacString:'ANGOLESA',NacClave:  'AGO'},
     {NacString:'ARGELIANA',NacClave:  'DZA'},
     {NacString:'DE BENNIN',NacClave:  'BEN'},
     {NacString:'BOTSWANESA',NacClave:  'BWA'},
     {NacString:'BURUNDESA',NacClave:  'BDI'},
     {NacString:'DE CABO VERDE',NacClave:  'CPV'},
     {NacString:'COMORENSE',NacClave:  'COM'},
     {NacString:'CONGOLESA',NacClave:  'COD'},
     {NacString:'MARFILEÑA',NacClave:  'COG'},
     {NacString:'CHADIANA',NacClave:  '	TCD'},
     {NacString:'DE DJIBOUTI',NacClave:  'DJI'},	
     {NacString:'EGIPCIA',NacClave:  'EGY'},
     {NacString:'ETIOPE',NacClave:  'ETH'},
     {NacString:'GABONESA',NacClave:  'GAB'},
     {NacString:'GAMBIANA',NacClave:  'GMB'},
     {NacString:' GHANATA',NacClave:  'GHA'},
     {NacString:'GUINEA',NacClave:  'GNB'},
     {NacString:'GUINEA',NacClave:  'GIN'},
     {NacString:' GUINEA ECUATORIANA',NacClave:  'GNQ'},
     {NacString:'LIBIA',NacClave:  'LBY'},
     {NacString:'KENIANA',NacClave:  'KEN'},
     {NacString:'LESOTHENSE',NacClave:  'LSO'},
     {NacString:'LIBERIANA',NacClave:  'LBR'},
     {NacString:'MALAWIANA',NacClave:  'MWI'},
     {NacString:'MALIENSE',NacClave:  'MLI'},
     {NacString:'MARROQUI',NacClave:  'MAR'},
     {NacString:'MAURICIANA',NacClave:  'MUS'},
     {NacString:'MAURITANA',NacClave:  'MRT'},
     {NacString:'MOZAMBIQUEÑA',NacClave:  'MOZ'},
     {NacString:'NIGERINA',NacClave:  'NER'},
     {NacString:'CENTRO AFRICANA',NacClave:  'CAF'},
     {NacString:'CAMERUNESA',NacClave:  'CMR'},
     {NacString:'TANZANIANA',NacClave:  'TZA'},
     {NacString:'RWANDESA',NacClave:  'RWA'},
     {NacString:'DEL SAHARA',NacClave:  'ESH'},
     {NacString:'DE SANTO TOME',NacClave:  'STP'},
     {NacString:'SENEGALESA',NacClave:  'SEN'},
     {NacString:'DE SEYCHELLES',NacClave:  'SYC'},
     {NacString:'SIERRA LEONESA',NacClave:  'SLE'},
     {NacString:'SOMALI',NacClave:  'SOM'},
     {NacString:'SUDAFRICANA',NacClave:  'ZAF'},
     {NacString:'SUDANESA',NacClave:  'SDN'},
     {NacString:'SWAZI',NacClave:  'SWZM'},
     {NacString:'TOGOLESA',NacClave:  'TGO'},
     {NacString:'TUNECINA',NacClave:  'TUN'},
     {NacString:'UGANDESA',NacClave:  'UGA'},
     {NacString:'ZAIRANA',NacClave:  'ZAR'},
     {NacString:'ZAMBIANA',NacClave:  'ZMB'},
     {NacString:'DE ZIMBAWI',NacClave:  'ZWE'},
     {NacString:'ARGENTINA',NacClave:  'ARG'},
     {NacString:'BAHAMEÑA',NacClave:  'BHS'},
     {NacString:'DE BARBADOS',NacClave:  'BRB'},
     {NacString:'BELICEÑA',NacClave:  'BLZ'},
     {NacString:'BOLIVIANA',NacClave:  'BOL'},
     {NacString:'BRASILEÑA',NacClave:  'BRA'},
     {NacString:'CANADIENSE',NacClave:  'CAN'},
     {NacString:'COLOMBIANA',NacClave:  'COL'},
     {NacString:'COSTARRICENSE',NacClave:  'CRI'},
     {NacString:'CUBANA',NacClave:  'CUB'},
     {NacString:'CHILENA',NacClave:  'CHL'}
      )
      return this.Nacionalidades
      console.log(this.Nacionalidades)
   }
   constructor(private http:HttpClient){
 }

 
}
