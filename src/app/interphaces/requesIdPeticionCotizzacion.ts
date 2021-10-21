import { RequestIdPeticionCotizacion } from "./request/RequestIdPeticionCotizacion";

export let requestIdPeticion: RequestIdPeticionCotizacion ={
    cotizacion: {
                  iIdCotizacion: 0,
                  FechaInicioVigencia: null,
                  Domicilio: {
                                  iIdUbicacion: null,
                                  sCodigoPostal: null,
                                  iIdMunicipio: null,
                                  sUbicacion: null,
                                  sMunicipio: null,
                                  iIdEstado: null,
                                  iEstadoPais: null,
                                  iClaveEstadoCepomex: null,
                                  sEstado: null,
                                  sCalle: null,
                                  sNumeroExterior: null,
                                  sNumeroInterior: null
                  },
                  Persona: {
                                  IdPersona: null,
                                  sNombre: null,
                                  sApellidoPaterno: null,
                                  sApellidoMaterno: null,
                                  sFechaNacimiento: null,
                                  sRfc: null,
                                  iEdad: null,
                                  iSexo: null,
                                  sEmail: null,
                                  sTelefono: null,
                                  iIdPais: null,
                                  sNacionalidad: null,
                                  iIdOcupacion: 0,
                                  bSinoFuma: null,
                                  bSiNoPersonaMoral: null,
                                  sCurp:null
                  },
                  Credencial: {
                    IdCredential: 3418,
                    IdProfile: 85
                },
                SubRamo: {
                    iIdSubRamo: 1,
                    // Ramo: null,
                    // iLineaNegocio: 0,
                    // iEstatus: 0,
                    // iIdMostar: 0,
                    // iOrdenPresentacion: 0,
                    sSubramo: "AUTOS"
                    // sAlias: null,
                    // sDescripcion: null,
                    // lineaNegocio: null
                },
                Sucursal:  {
                  iIdSucursal: 1,
                  sSucursal: null
              }
          ,
                Asociado: {
                  iIdAsociado:     14177,
                  sClaveAsociado:  "MM5157"
                },
                Vehiculo: {
                                  iIdVehiculoCotizacion:null,
                                  iValorUnidad: 0,
                                  iValorFactura: 0,
                                  sTipoCarga: null,
                                  iIdTipoCarga: 0,
                                  FechaFactura: null,
                                  Marca: {
                                                  iIdMarca: null,
                                                  sMarca: null
                                  },
                                  Modelo: {
                                                  iIdModelo: null,
                                                  sModelo: null
                                  },
                                  SubMarca: {
                                      iIdSubMarca: null,
                                      iIdMarcaSubramo: 0,
                                      iIdMostrar: 0,
                                      sSubMarca: null,
                                      bSiNoCotizamatico: null,
                                      bSiNoFlotillas: null
                                  },
                                  DescripcionModelo: {
                                                  iIdDescripcionModelo: null,
                                                  iIdModeloSubmarca: 0,
                                                  iIdMostrar: null,
                                                  sDescripcion: null,
                                                  bSiNoCotizamatico: null,
                                                  bSiNoFlotillas: null
                                      
                                  },
                                  iValorPolizaMultiAnual: 0
                  },
                  Compania: {
                    sNombre: "AARCO",
                    sConexionCotizamatico: "Cotizamaticos",
                    sConexionDatosComunes: "AARCODatosComunes",
                    sConexion3030Net: "AARCO3030DotNet",
                    sCatalogoService: "http://192.168.211.5/AarcoCommon/CatalogoService.svc",
                    sCotizacionService: "http://192.168.211.5/AarcoCommon/CotizacionService.svc",
                    sPersonaService: "http://192.168.211.5/AarcoCommon/PersonaService.svc",
                    sEquivalenciaService: "http://192.168.211.5/AarcoCommon/EquivalenciaService.svc",
                    sLoggingService: "http://192.168.211.5/AarcoCommon/LoggingService.svc"
                },
                sXmls: {
                  XMLRSA:  "C:\\inetpub\\api.aarco.com.mx\\AarcoAPICommon_PBAS\\XmlCotizacionEmision\\xmlCotizacionRsa.xml"
              },
                  iIva: 1.16,
                  iIdAseguradora: 0,
                  iDescuento: 0.0,
                  iTipoDispositivo: null,
                  iTipoCotizacion: 0,
                  bAsistencias: false,
                  sCotizacionTemporal: null,
                  Documento3030: null
              
    },
    PaqueteCoberturasApi: { 
      idPaquete :1,
      idAseguradora :2,
      CoberturasApi: []
},
                User: "COTIZAMATICO",
                Device: "EMULATOR30X1X5X0",
                Token: "7C2C8D3B-C488-4D14-B360-6B94013A0C4E"
  }