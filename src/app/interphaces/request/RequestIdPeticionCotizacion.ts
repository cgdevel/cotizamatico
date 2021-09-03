export interface RequestIdPeticionCotizacion{
     cotizacion : {
                    iIdCotizacion : number,
                    FechaInicioVigencia :  string ,
                    Domicilio : {
                                    iIdUbicacion : number,
                                    sCodigoPostal :  number ,
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
                                    sNombre :  string ,
                                     sApellidoPaterno : string ,
                                    sApellidoMaterno : string,
                                    sFechaNacimiento : string,
                                    sRfc : string,
                                    iEdad :  number ,
                                    iSexo : number,
                                    sEmail :  string ,
                                    sTelefono : number,
                                    iIdPais : number,
                                    sNacionalidad : any,
                                    iIdOcupacion : number,
                                    bSinoFuma : number,
                                    bSiNoPersonaMoral : boolean
                   },
                    Credencial ? : {
                                    IdCredential : number,
                                    IdProfile : number
                   },
                    SubRamo ? : {
                                    iIdSubRamo : number,
                                    Ramo : any,
                                    iLineaNegocio  : number,
                                    iEstatus  : number,
                                    iIdMostar  : number,
                                    iOrdenPresentacion  : number,
                                    sSubramo : string ,
                                    sAlias : any,
                                    sDescripcion : string,
                                    lineaNegocio : any
                   },
                    Sucursal : any,
                    Asociado : any,
                    Vehiculo : {
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
                                                    sSubMarca :  string 
                                   },
                                    Modelo : {
                                                    iIdModelo : number,
                                                    sModelo :  string 
                                   },
                                    DescripcionModelo : {
                                                    iIdDescripcionModelo : number,
                                                    iIdModeloSubmarca : number,
                                                    iIdMostrar  : number,
                                                    sDescripcion : string 
                                   },
                                    iValorPolizaMultiAnual : number,
                   },
                    Compania : null,
                    sXmls : null,
                    iIva : number,
                    iIdAseguradora  : number,
                    iDescuento :number,
    },
     PaqueteCoberturasApi :{
                    idPaquete :number,
                    idAseguradora :number,
                    CoberturasApi : Array < {
                        idCobertura: number,
                        idTipoCobertura :number,
                        idFactor :number
                    }>
    },
     User? : string ,
     Device? : string ,
     Token? : string  
}
