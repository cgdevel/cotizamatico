export interface RequestIdPeticionCotizacion{
     cotizacion : {
                    iIdCotizacion : number,
                    FechaInicioVigencia :  string ,
                    Domicilio : {
                                    iIdUbicacion : number,
                                    sCodigoPostal :  string ,
                                    iIdMunicipio : number,
                                    sUbicacion :  string ,
                                    sMunicipio :  string ,
                                    iIdEstado : number,
                                    iEstadoPais : number,
                                    iClaveEstadoCepomex : number,
                                    sEstado :  string ,
                                    sCalle : string,
                                    sNumeroExterior : any,
                                    sNumeroInterior : any
                   },
                    Persona : {
                                    IdPersona: string ,
                                    sNombre :  string ,
                                    sApellidoPaterno : string ,
                                    sApellidoMaterno : string,
                                    sFechaNacimiento : string,
                                    sRfc : string,
                                    iEdad :  number ,
                                    iSexo : number,
                                    sEmail :  string ,
                                    sTelefono : string,
                                    iIdPais : number,
                                    sNacionalidad : any,
                                    iIdOcupacion : number,
                                    bSinoFuma : boolean,
                                    bSiNoPersonaMoral : boolean,
                                    sCurp: string
                   },
                    Credencial ? : {
                                    IdCredential : number,
                                    IdProfile : number
                   },
                    SubRamo : {
                                    iIdSubRamo : number,
                                    // Ramo : any,
                                    // iLineaNegocio  : number,
                                    // iEstatus  : number,
                                    // iIdMostar  : number,
                                    // iOrdenPresentacion  : number,
                                    sSubramo : string 
                                    // sAlias : any,
                                    // sDescripcion : string,
                                    // lineaNegocio : any
                   },
                    Sucursal :  {
                        iIdSucursal: number,
                        sSucursal: string
                    },
                    Asociado : {
                        iIdAsociado:     number,
                        sClaveAsociado:  string
                      },
                    Vehiculo : {
                                    iIdVehiculoCotizacion: number,
                                    iValorUnidad : number,
                                    iValorFactura : number,
                                    sTipoCarga : null,
                                    iIdTipoCarga  : number,
                                    FechaFactura : null,
                                    Marca : {
                                                    iIdMarca : number,
                                                    sMarca :  string
                                   },
                                    SubMarca? : {
                                                    iIdSubMarca : number,
                                                    iIdMarcaSubramo : number,
                                                    iIdMostrar  : number,
                                                    sSubMarca :  string,
                                                    bSiNoCotizamatico: number,
                                                    bSiNoFlotillas: number 
                                   },
                                    Modelo : {
                                                    iIdModelo : number,
                                                    sModelo :  string 
                                   },
                                    DescripcionModelo : {
                                                    iIdDescripcionModelo : number,
                                                    iIdModeloSubmarca : number,
                                                    iIdMostrar  : number,
                                                    sDescripcion : string,
                                                    bSiNoCotizamatico: boolean,
                                                    bSiNoFlotillas: boolean
                                         
                                   },
                                    iValorPolizaMultiAnual : number,
                   },
                    Compania : any,
                    sXmls : any,
                    iIva : number,
                    iIdAseguradora  : number,
                    iDescuento :number,
                    iTipoDispositivo: number,
                    iTipoCotizacion: number,
                    bAsistencias: boolean,
                    sCotizacionTemporal: string,
                    Documento3030: any,
                
    },
     PaqueteCoberturasApi :Array<{
                    idPaquete :number,
                    idAseguradora :number,
                    CoberturasApi : Array < {
                        idCobertura: number,
                        idTipoCobertura :number,
                        idFactor :number
                    }>
    }>,
     User? : string ,
     Device? : string ,
     Token? : string  
}
