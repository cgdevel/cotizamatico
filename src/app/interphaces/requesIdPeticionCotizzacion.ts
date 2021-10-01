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
                                  iIdOcupacion: null,
                                  bSinoFuma: null,
                                  bSiNoPersonaMoral: null
                  },
                  Credencial: {
                    IdCredential: 3418,
                    IdProfile: 85
                },
                SubRamo: {
                    iIdSubRamo: 1,
                    Ramo: null,
                    iLineaNegocio: 0,
                    iEstatus: 0,
                    iIdMostar: 0,
                    iOrdenPresentacion: 0,
                    sSubramo: "AUTOS",
                    sAlias: null,
                    sDescripcion: null,
                    lineaNegocio: null
                },
                Sucursal: null,
                Asociado: null,
                Vehiculo: {
                                  iValorUnidad: null,
                                  iValorFactura: null,
                                  sTipoCarga: null,
                                  iIdTipoCarga: null,
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
                                      iIdMarcaSubramo: null,
                                      iIdMostrar: null,
                                      sSubMarca: null,
                                      bSiNoCotizamatico: null,
                                      bSiNoFlotillas: null
                                  },
                                  DescripcionModelo: {
                                                  iIdDescripcionModelo: null,
                                                  iIdModeloSubmarca: null,
                                                  iIdMostrar: null,
                                                  sDescripcion: null
                                  },
                                  iValorPolizaMultiAnual: null
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
                sXmls:null,
                  iIva: 0.0,
                  iIdAseguradora: 0,
                  iDescuento: 0.0
    },
    PaqueteCoberturasApi:{
      idPaquete:1,
      idAseguradora:null,
      CoberturasApi:null
    },
                User: "COTIZAMATICO",
                Device: "EMULATOR30X1X5X0",
                Token: "7C2C8D3B-C488-4D14-B360-6B94013A0C4E"
  }