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
import { TimeoutError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfovehiculoService {
  constructor(private http: HttpClient) {}
  Nacionalidades = new Array<RequestNacionalidad>();
  Ocupaciones = new Array<CatalogoModel>();
  EstadoCivs = new Array<CatalogoModel>();
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
      `${environment.url_api_autos_aseguradoras}`,
      query
    );
  }

  getApiCatalogoBancos(query: RequestCatalogoCommon) {
    return this.http.post<ResponseCatalogoCommon>(
      `${environment.url_api_common}catalogo`,
      query
    );
  }

  getOcupaciones() {
    this.Ocupaciones = [];
    this.Ocupaciones.push(
      { sLlave: '1', sDato: 'ABOGADO' },
      { sLlave: '2', sDato: 'ACRÓBATA' },
      { sLlave: '3', sDato: 'ACTOR' },
      { sLlave: '4', sDato: 'ACTUARIO' },
      { sLlave: '5', sDato: 'ADMINISTRADOR' },
      { sLlave: '6', sDato: 'AGENTE DE SEGUROS' },
      { sLlave: '7', sDato: 'AGENTE DE VENTAS' },
      { sLlave: '8', sDato: 'AGENTE DE VIAJES' },
      { sLlave: '9', sDato: 'AGRICULTOR' },
      { sLlave: '10', sDato: 'AMA DE CASA' },
      { sLlave: '11', sDato: 'AMA DE LLAVES' },
      { sLlave: '12', sDato: 'ANALISTA' },
      { sLlave: '13', sDato: 'ANESTESISTA' },
      { sLlave: '14', sDato: 'ANIMADOR' },
      { sLlave: '15', sDato: 'ANTROPÓLOGO' },
      { sLlave: '16', sDato: 'ÁRBITRO DEPORTIVO' },
      { sLlave: '17', sDato: 'ARQUEOLOGO' },
      { sLlave: '18', sDato: 'ARQUITECTO' },
      { sLlave: '19', sDato: 'ARTESANO' },
      { sLlave: '20', sDato: 'ASESOR' },
      { sLlave: '21', sDato: 'ASISTENTE' },
      { sLlave: '22', sDato: 'ASTRÓNOMO' },
      { sLlave: '23', sDato: 'AUDITOR' },
      { sLlave: '24', sDato: 'AUXILIAR GENERAL' },
      { sLlave: '25', sDato: 'BAILARÍN' },
      { sLlave: '26', sDato: 'BIBLIOTECARIO' },
      { sLlave: '27', sDato: 'BIÓLOGO' },
      { sLlave: '28', sDato: 'BOTÁNICO' },
      { sLlave: '29', sDato: 'CAJERO' },
      { sLlave: '30', sDato: 'CHEF' },
      { sLlave: '31', sDato: 'CHOFER' },
      { sLlave: '32', sDato: 'CONDUCTOR' },
      { sLlave: '33', sDato: 'CONSULTOR' },
      { sLlave: '34', sDato: 'CONTADOR' },
      { sLlave: '35', sDato: 'CRONISTA' },
      { sLlave: '36', sDato: 'CUSTODIO' },
      { sLlave: '37', sDato: 'DECORADOR' },
      { sLlave: '38', sDato: 'DEMÓGRAFO' },
      { sLlave: '39', sDato: 'DEMOSTRADOR' },
      { sLlave: '40', sDato: 'DESEMPLEADO' },
      { sLlave: '41', sDato: 'DIBUJANTE' },
      { sLlave: '42', sDato: 'DIRECTOR' },
      { sLlave: '43', sDato: 'DISEÑADOR' },
      { sLlave: '44', sDato: 'ECONOMISTA' },
      { sLlave: '45', sDato: 'EDECÁN' },
      { sLlave: '46', sDato: 'EDITOR' },
      { sLlave: '47', sDato: 'EDUCADORA' },
      { sLlave: '48', sDato: 'EJECUTIVO' },
      { sLlave: '49', sDato: 'ELECTRICISTA' },
      { sLlave: '50', sDato: 'ENFERMERA' },
      { sLlave: '51', sDato: 'ESCRITOR' },
      { sLlave: '52', sDato: 'ESCULTOR' },
      { sLlave: '53', sDato: 'ESTUDIANTE' },
      { sLlave: '54', sDato: 'FILÓSOFO' },
      { sLlave: '55', sDato: 'FÍSICO' },
      { sLlave: '56', sDato: 'FOTÓGRAFO' },
      { sLlave: '57', sDato: 'GENETISTA' },
      { sLlave: '58', sDato: 'GEÓGRAFO' },
      { sLlave: '59', sDato: 'GERENTE' },
      { sLlave: '60', sDato: 'GESTOR ' },
      { sLlave: '61', sDato: 'GINECÓLOGO' },
      { sLlave: '62', sDato: 'GUARDIA DE SEGURIDAD' },
      { sLlave: '63', sDato: 'GUIONISTA' },
      { sLlave: '64', sDato: 'HISTORIADOR' },
      { sLlave: '65', sDato: 'INGENIERO' },
      { sLlave: '66', sDato: 'INSPECTOR ' },
      { sLlave: '67', sDato: 'INSTRUCTOR' },
      { sLlave: '68', sDato: 'INTÉRPRETE' },
      { sLlave: '69', sDato: 'JARDINERO' },
      { sLlave: '70', sDato: 'LABORATORISTA' },
      { sLlave: '71', sDato: 'LIC. EN CIENCIAS POLÍTICAS' },
      { sLlave: '72', sDato: 'LIC. EN COMUNICACIÓN' },
      { sLlave: '73', sDato: 'LIC. EN MERCADOTÉCNIA' },
      { sLlave: '74', sDato: 'LIC. EN RELACIONES INTERNACIONALES' },
      { sLlave: '75', sDato: 'LOCUTOR' },
      { sLlave: '76', sDato: 'MAQUILLISTA' },
      { sLlave: '77', sDato: 'MARINO' },
      { sLlave: '78', sDato: 'MATEMÁTICO(A)' },
      { sLlave: '79', sDato: 'MECÁNICO' },
      { sLlave: '80', sDato: 'MÉDICO CIRUJANO' },
      { sLlave: '81', sDato: 'MENSAJERO' },
      { sLlave: '82', sDato: 'MESERO' },
      { sLlave: '83', sDato: 'MILITAR' },
      { sLlave: '84', sDato: 'MILITAR EN SITUACIÓN DE RETIRO' },
      { sLlave: '85', sDato: 'MODELO' },
      { sLlave: '86', sDato: 'MÚSICO' },
      { sLlave: '87', sDato: 'NOTARIO PÚBLICO' },
      { sLlave: '88', sDato: 'NUTRIOLOGO' },
      { sLlave: '89', sDato: 'OBRERO' },
      { sLlave: '90', sDato: 'ODONTÓLOGO' },
      { sLlave: '91', sDato: 'OFTALMÓLOGO' },
      { sLlave: '92', sDato: 'PANADERO' },
      { sLlave: '93', sDato: 'PARAMÉDICO' },
      { sLlave: '94', sDato: 'PEDAGOGO' },
      { sLlave: '95', sDato: 'PEDIATRA' },
      { sLlave: '96', sDato: 'PENSIONISTA' },
      { sLlave: '97', sDato: 'PERIODISTA' },
      { sLlave: '98', sDato: 'PESCADOR' },
      { sLlave: '99', sDato: 'PILOTO' },
      { sLlave: '100', sDato: 'PINTOR' },
      { sLlave: '101', sDato: 'PLOMERO' },
      { sLlave: '102', sDato: 'POLICÍA' },
      { sLlave: '103', sDato: 'PRODUCTOR' },
      { sLlave: '104', sDato: 'PROFESOR' },
      { sLlave: '105', sDato: 'PROGRAMADOR' },
      { sLlave: '106', sDato: 'PROMOTOR' },
      { sLlave: '107', sDato: 'PSICÓLOGO' },
      { sLlave: '108', sDato: 'PSIQUIATRA' },
      { sLlave: '109', sDato: 'PUBLICISTA' },
      { sLlave: '110', sDato: 'QUÍMICO' },
      { sLlave: '111', sDato: 'QUÍMICO FARMACOBIÓLOGO' },
      { sLlave: '112', sDato: 'RECEPCIONISTA' },
      { sLlave: '113', sDato: 'REPORTERO' },
      { sLlave: '114', sDato: 'SASTRE' },
      { sLlave: '115', sDato: 'SECRETARIA' },
      { sLlave: '116', sDato: 'SOBRECARGO' },
      { sLlave: '117', sDato: 'SOCIÓLOGO' },
      { sLlave: '118', sDato: 'SUPERVISOR' },
      { sLlave: '119', sDato: 'TAXISTA' },
      { sLlave: '120', sDato: 'TÉCNICO' },
      { sLlave: '121', sDato: 'TELEFONISTA' },
      { sLlave: '122', sDato: 'TERAPEUTA' },
      { sLlave: '123', sDato: 'TOPÓGRAFO' },
      { sLlave: '124', sDato: 'TRABAJADOR SOCIAL' },
      { sLlave: '125', sDato: 'TRADUCTOR' },
      { sLlave: '126', sDato: 'VALET' },
      { sLlave: '127', sDato: 'VALUADOR' },
      { sLlave: '128', sDato: 'VENDEDOR' },
      { sLlave: '129', sDato: 'VETERINARIO' },
      { sLlave: '130', sDato: 'VIGILANTE' }
    );
    // console.log(this.Ocupaciones);
    return this.Ocupaciones;
  }

  getEstadoCivil() {
    this.EstadoCivs = [];
    this.EstadoCivs.push(
      { sLlave: '1', sDato: 'VIUDO' },
      { sLlave: '2', sDato: 'SOLTERO' },
      { sLlave: '3', sDato: 'CASADO' },
      { sLlave: '4', sDato: 'DIVORCIADO' }
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
}
