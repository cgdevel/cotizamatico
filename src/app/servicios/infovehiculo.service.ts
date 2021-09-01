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
import { PeticionAutoAse } from '../interphaces/PeticionAutoAse';
import { RequestNacionalidad } from '../../app/interphaces/nacionali';
import { RequestCatalogoCommon } from '../interphaces/request/RequestCatalogoCommon.Model';
import { ResponseCatalogoCommon } from '../interphaces/response/ResponseCatalogoCommon.Model';
import { ResponseAplicacionesId } from '../interphaces/response/ResponseAplicacionesId.mode';
import { RequestInicioSesion } from '../interphaces/request/RequestInicioSesion.model';

@Injectable({
  providedIn: 'root',
})
export class InfovehiculoService {
  constructor(private http: HttpClient) {}
  Nacionalidades = new Array<RequestNacionalidad>();
  Ocupaciones = new Array<CatalogoModel>();
  EstadoCivs = new Array<CatalogoModel>();
  terminaciones = new Array<CatalogoModel>();
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

  getApiAseguradoras(query: PeticionAutoAse) {
    return this.http.post<any>(
      `${environment.url_api_autos}/homologacionbr`,
      query
    );
  }

  getApiCatalogoBancos(query: RequestCatalogoCommon) {
    return this.http.post<ResponseCatalogoCommon>(
      `${environment.url_api_autos}/catalogos`,
      query
    );
  }

  getApiAplicacionesId() {
    const req: RequestCatalogoCommon = {
      NombreCatalogo: '',
      IdAplication: 0,
      Filtro: 0,
    };
    return this.http.post<ResponseAplicacionesId>(
      `${environment.url_api_autos}/cotizamatico/recuperarAplicacionIdBr`,
      req
    );
  }

  // getOneCotizacion() {
  //   const req: any = {
  //     idAseguradora: 155392,
  //     datosVehiculo: {
  //       claveVehiculo: '9159',
  //       tipoVehiculo: 1,
  //     },
  //     datosPersona: {
  //       fechaNacimientoConductor: '1995-01-01',
  //       sexo: 11,
  //       cp: '03330',
  //       colonia: 'XOCO',
  //       poblacion: 'BENITO JUAREZ',
  //     },
  //     formaPago: 0,
  //     coberturas: [],
  //   };

  //   return this.http.post<any>(
  //     `${environment.url_api_one}/mapfre/cotizar`,
  //     req
  //   );
  // }

  getInicioSesion(req: RequestInicioSesion) {
    return this.http.post<ResponseAplicacionesId>(
      `${environment.url_api_autos}/cotizamatico/inicioMinisitioBr`,
      req
    );
  }

  getOcupaciones(req: RequestCatalogoCommon) {
    return this.http.post<ResponseCatalogoCommon>(
      `${environment.url_api_autos}/catalogos`,
      req
    );
  }

  getEstadoCivil() {
    this.EstadoCivs = [];
    this.EstadoCivs.push(
      { sLlave: '1', sDato: 'CASADO(A)' },
      { sLlave: '2', sDato: 'DIVORCIADO(A)' },
      { sLlave: '3', sDato: 'NO ESPECIFICADO' },
      { sLlave: '4', sDato: 'SOLTERO(A)' },
      { sLlave: '5', sDato: 'UNION LIBRE' },
      { sLlave: '6', sDato: 'VIUDO(A)' }
    );
    return this.EstadoCivs;
  }

  getNacionalidades() {
    this.Nacionalidades = [];
    this.Nacionalidades.push(
      { NacString: 'NAMIBIANA', NacClave: 'NAM' },
      { NacString: 'ANGOLESA', NacClave: 'AGO' },
      { NacString: 'ARGELIANA', NacClave: 'DZA' },
      { NacString: 'DE BENNIN', NacClave: 'BEN' },
      { NacString: 'BOTSWANESA', NacClave: 'BWA' },
      { NacString: 'BURUNDESA', NacClave: 'BDI' },
      { NacString: 'DE CABO VERDE', NacClave: 'CPV' },
      { NacString: 'COMORENSE', NacClave: 'COM' },
      { NacString: 'CONGOLESA', NacClave: 'COD' },
      { NacString: 'MARFILEÑA', NacClave: 'COG' },
      { NacString: 'CHADIANA', NacClave: '	TCD' },
      { NacString: 'DE DJIBOUTI', NacClave: 'DJI' },
      { NacString: 'EGIPCIA', NacClave: 'EGY' },
      { NacString: 'ETIOPE', NacClave: 'ETH' },
      { NacString: 'GABONESA', NacClave: 'GAB' },
      { NacString: 'GAMBIANA', NacClave: 'GMB' },
      { NacString: 'GHANATA', NacClave: 'GHA' },
      { NacString: 'GUINEA', NacClave: 'GIN' },
      { NacString: 'GUINEA ECUATORIANA', NacClave: 'GNQ' },
      { NacString: 'LIBIA', NacClave: 'LBY' },
      { NacString: 'KENIANA', NacClave: 'KEN' },
      { NacString: 'LESOTHENSE', NacClave: 'LSO' },
      { NacString: 'LIBERIANA', NacClave: 'LBR' },
      { NacString: 'MALAWIANA', NacClave: 'MWI' },
      { NacString: 'MALIENSE', NacClave: 'MLI' },
      { NacString: 'MARROQUI', NacClave: 'MAR' },
      { NacString: 'MAURICIANA', NacClave: 'MUS' },
      { NacString: 'MAURITANA', NacClave: 'MRT' },
      { NacString: 'MOZAMBIQUEÑA', NacClave: 'MOZ' },
      { NacString: 'NIGERINA', NacClave: 'NER' },
      { NacString: 'CENTRO AFRICANA', NacClave: 'CAF' },
      { NacString: 'CAMERUNESA', NacClave: 'CMR' },
      { NacString: 'TANZANIANA', NacClave: 'TZA' },
      { NacString: 'RWANDESA', NacClave: 'RWA' },
      { NacString: 'DEL SAHARA', NacClave: 'ESH' },
      { NacString: 'DE SANTO TOME', NacClave: 'STP' },
      { NacString: 'SENEGALESA', NacClave: 'SEN' },
      { NacString: 'DE SEYCHELLES', NacClave: 'SYC' },
      { NacString: 'SIERRA LEONESA', NacClave: 'SLE' },
      { NacString: 'SOMALI', NacClave: 'SOM' },
      { NacString: 'SUDAFRICANA', NacClave: 'ZAF' },
      { NacString: 'SUDANESA', NacClave: 'SDN' },
      { NacString: 'SWAZI', NacClave: 'SWZM' },
      { NacString: 'TOGOLESA', NacClave: 'TGO' },
      { NacString: 'TUNECINA', NacClave: 'TUN' },
      { NacString: 'UGANDESA', NacClave: 'UGA' },
      { NacString: 'ZAIRANA', NacClave: 'ZAR' },
      { NacString: 'ZAMBIANA', NacClave: 'ZMB' },
      { NacString: 'DE ZIMBAWI', NacClave: 'ZWE' },
      { NacString: 'ARGENTINA', NacClave: 'ARG' },
      { NacString: 'BAHAMEÑA', NacClave: 'BHS' },
      { NacString: 'DE BARBADOS', NacClave: 'BRB' },
      { NacString: 'BELICEÑA', NacClave: 'BLZ' },
      { NacString: 'BOLIVIANA', NacClave: 'BOL' },
      { NacString: 'BRASILEÑA', NacClave: 'BRA' },
      { NacString: 'CANADIENSE', NacClave: 'CAN' },
      { NacString: 'COLOMBIANA', NacClave: 'COL' },
      { NacString: 'COSTARRICENSE', NacClave: 'CRI' },
      { NacString: 'CUBANA', NacClave: 'CUB' },
      { NacString: 'CHILENA', NacClave: 'CHL' },
      { NacString: 'DOMINICA', NacClave: 'DMA' },
      { NacString: 'SALVADOREÑA', NacClave: 'SLV' },
      { NacString: 'ESTADOUNIDENSE', NacClave: 'USA' },
      { NacString: 'GRANADINA', NacClave: 'VCT' },
      { NacString: 'GUATEMALTECA', NacClave: 'GTM' },
      { NacString: 'BBRITANICA', NacClave: 'VGB' },
      { NacString: 'GUYANESA', NacClave: 'GUY' },
      { NacString: 'HAITIANA', NacClave: 'HTI' },
      { NacString: 'HONDUREÑA', NacClave: 'HND' },
      { NacString: 'JAMAIQUINA', NacClave: 'JAM' },
      { NacString: 'MEXICANA', NacClave: 'MEX' },
      { NacString: 'NICARAGUENSE', NacClave: 'NIC' },
      { NacString: 'PANAMEÑA', NacClave: 'PAN' },
      { NacString: 'PARAGUAYA', NacClave: 'PRY' },
      { NacString: 'PERUANA', NacClave: 'PER' },
      { NacString: 'PUERTORRIQUEÑA', NacClave: 'PRI' },
      { NacString: 'DOMINICANA', NacClave: 'DOM' },
      { NacString: 'SANTA LUCIENSE', NacClave: 'LCA' },
      { NacString: 'SURINAMENSE', NacClave: 'SU' },
      { NacString: 'TRINITARIA', NacClave: 'TTOR' },
      { NacString: 'URUGUAYA', NacClave: 'URY' },
      { NacString: 'VENEZOLANA', NacClave: 'VEN' },
      { NacString: 'AFGANA', NacClave: 'AFG' },
      { NacString: 'DE BAHREIN', NacClave: 'BHR' },
      { NacString: 'BHUTANESA', NacClave: 'BTN' },
      { NacString: 'BIRMANA', NacClave: 'BUR' },
      { NacString: 'NORCOREANA', NacClave: 'PRK' },
      { NacString: 'SUDCOREANA', NacClave: 'KOR' },
      { NacString: 'CHINA', NacClave: 'CHN' },
      { NacString: 'CHIPRIOTA', NacClave: 'CYP' },
      { NacString: 'ARABE', NacClave: 'SAU' },
      { NacString: 'FILIPINA', NacClave: 'PHL' },
      { NacString: 'INDIA', NacClave: 'IND' },
      { NacString: 'INDONESA', NacClave: 'IDN' },
      { NacString: 'IRAQUI', NacClave: 'IRQ' },
      { NacString: 'IRANI', NacClave: 'IRN' },
      { NacString: 'ISRAELI', NacClave: 'ISR' },
      { NacString: 'JAPONESA', NacClave: 'JPN' },
      { NacString: 'JORDANA', NacClave: 'JOR' },
      { NacString: 'CAMBOYANA', NacClave: 'KHM' },
      { NacString: 'KUWAITI', NacClave: 'KWT' },
      { NacString: 'LIBANESA', NacClave: 'LBN' },
      { NacString: 'MALASIA', NacClave: 'MYS' },
      { NacString: 'MALDIVA', NacClave: 'MDV' },
      { NacString: 'MONGOLESA', NacClave: 'MNG' },
      { NacString: 'NEPALESA', NacClave: 'NPL' },
      { NacString: 'OMANESA', NacClave: 'OMN' },
      { NacString: 'PAKISTANI', NacClave: 'PAK' },
      { NacString: 'DEL QATAR', NacClave: 'QAT' },
      { NacString: 'SIRIA', NacClave: 'SYR' },
      { NacString: 'LAOSIANA', NacClave: 'LAO' },
      { NacString: 'SINGAPORENSE', NacClave: 'SGP' },
      { NacString: 'TAILANDESA', NacClave: 'THA' },
      { NacString: 'TAIWANESA', NacClave: 'TWN' },
      { NacString: 'TURCA', NacClave: 'TUR' },
      { NacString: 'NORVIETNAMITA', NacClave: 'VNM' },
      { NacString: 'YEMENI', NacClave: 'YEM' },
      { NacString: 'ALBANESA', NacClave: 'ALB' },
      { NacString: 'ALEMANA', NacClave: 'DEU' },
      { NacString: 'ANDORRANA', NacClave: 'AND' },
      { NacString: 'AUSTRIACA', NacClave: 'AUT' },
      { NacString: 'BELGA', NacClave: 'BEL' },
      { NacString: 'BULGARA', NacClave: 'BGR' },
      { NacString: 'CHECOSLOVACA', NacClave: 'CSK' },
      { NacString: 'DANESA', NacClave: 'DNK' },
      { NacString: 'VATICANA', NacClave: 'VAT' },
      { NacString: 'ESPAÑOLA', NacClave: 'ESP' },
      { NacString: 'FINLANDESA', NacClave: 'FIN' },
      { NacString: 'FRANCESA', NacClave: 'FRA' },
      { NacString: 'GRIEGA', NacClave: 'GRC' },
      { NacString: 'HUNGARA', NacClave: 'HUN' },
      { NacString: 'IRLANDESA', NacClave: 'IRL' },
      { NacString: 'ISLANDESA', NacClave: 'ISL' },
      { NacString: 'ITALIANA', NacClave: 'ITA' },
      { NacString: 'LIECHTENSTENSE', NacClave: 'LIE' },
      { NacString: 'LUXEMBURGUESA', NacClave: 'LUX' },
      { NacString: 'MALTESA', NacClave: 'MLT' },
      { NacString: 'MONEGASCA', NacClave: 'MCO' },
      { NacString: 'NORUEGA', NacClave: 'NOR' },
      { NacString: 'HOLANDESA', NacClave: 'NLD' },
      { NacString: 'PORTUGUESA', NacClave: 'PRT' },
      { NacString: 'BRITANICA', NacClave: 'IOT' },
      { NacString: 'SOVIETICA BIELORRUSA', NacClave: 'BLR' },
      { NacString: 'SOVIETICA UCRANIANA', NacClave: 'UKR' },
      { NacString: 'RUMANA', NacClave: 'ROM' },
      { NacString: 'SAN MARINENSE', NacClave: 'SMR' },
      { NacString: 'SUECA', NacClave: 'SWE' },
      { NacString: 'SUIZA', NacClave: 'CHE' },
      { NacString: 'YUGOSLAVA', NacClave: 'YUG' },
      { NacString: 'AUSTRALIANA', NacClave: 'AUS' },
      { NacString: 'FIJIANA', NacClave: 'FJI' },
      { NacString: 'SALOMONESA', NacClave: 'SLB' },
      { NacString: 'NAURUANA', NacClave: 'NRU' },
      { NacString: 'PAPUENSE', NacClave: 'PNG' },
      { NacString: 'SAMOANA', NacClave: 'WSM' },
      { NacString: 'ESLOVACA', NacClave: 'SVK' },
      { NacString: 'BURKINA', NacClave: 'FASO	BFA' },
      { NacString: 'ESTONIA', NacClave: 'EST' },
      { NacString: 'MICRONECIA', NacClave: 'FSM' },
      { NacString: 'REINO UNIDO(DEPEN. TET. BRIT.)', NacClave: 'GBD' },
      { NacString: 'REINO UNIDO(BRIT. DEL EXT.)', NacClave: 'GBN' },
      { NacString: 'REINO UNIDO(C. BRIT. DEL EXT.)', NacClave: 'GBO' },
      { NacString: 'REINO UNIDO', NacClave: 'GBR' },
      { NacString: 'KIRGUISTAN', NacClave: 'KGZ' },
      { NacString: 'LITUANIA', NacClave: 'LTU' },
      { NacString: 'REPUBLICA DE	MOLDOVIA', NacClave: 'MDA' },
      { NacString: 'MACEDONIA', NacClave: 'MKD' },
      { NacString: 'ESLOVENIA', NacClave: 'SVN' },
      { NacString: 'ESLOVAQUIA', NacClave: 'XES' }
    );
    // console.log(this.Nacionalidades);
    return this.Nacionalidades;
  }


  getValidarSerie(request: string) {
    const req = {
      sNumeroSerie: request,
    };

    return this.http.post<any>(
      `${environment.url_api_autos}/cotizamatico/validarSerieBr`,
      req
    );
  }

  downloadPdf() {
    const responsepdf = this.http.post(
      `${environment.url_api_autos}/cotizamatico/recuperarPdfComparativoBr`,
      ''
    );
    return responsepdf;
  }
}
