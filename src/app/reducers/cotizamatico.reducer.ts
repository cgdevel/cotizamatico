import { state } from '@angular/animations';
import {CotizamaticoActionsTypes,CotizamaticoActions, GetIdPeticion, ModificarVehiculo } from '../actions/cotizamatico.actions'
import { CatalogoModel } from '../interphaces/models/Catalogos.model'
import { FechasModel } from '../interphaces/models/Fechas.model'

export interface State{
    asegurado:{
        nombre : string;
        correo : string;
        cP     : string;
        fechaDeNacimiento: string ;
        telefono: string;
        tipoDePersona:boolean;
        iSexo: number;
        apellidoPaterno: string;
        apellidoMaterno: string;
    };
    
    SubRamo: {
        iIdSubRamo: number,
        Ramo: null,
        iLineaNegocio: number,
        iEstatus: number,
        iIdMostar: number,
        iOrdenPresentacion: number,
        sSubramo: string,
        sAlias: null,
        sDescripcion: null,
        lineaNegocio: null
    };
    domicilio:{
        iIdUbicacion        :number ,
        iIdMunicipio        :number,
        sUbicacion          :string,
        sMunicipio          :string,
        iIdEstado           :number ,
        iEstadoPais         :number ,
        iClaveEstadoCepomex :number ,
        sEstado             :string 
    };
    vehiculo:{
        marca : {sLlave: any, sDato: any};
        modelo :{sLlave: any, sDato: any};
        descripción:{sLlave: any, sDato: any};
    };
    iDPeticionResponse:{
        iDPeticion:number;
        error: any;
    };
    cotizacionResponse:{
        estatus: number;
        idCotizacion: number;
        error: any;
        jsonCotizacion: Array<string>;
    };
    
    
}

const initialState: State = {
    asegurado: {
        nombre: '',
        correo: '',
        cP: null,
        fechaDeNacimiento: '',
        telefono: null,
        tipoDePersona: null,
        iSexo: null,
        apellidoMaterno:'',
        apellidoPaterno:''
    },
    SubRamo: {
        iIdSubRamo: null,
        Ramo: null,
        iLineaNegocio: null,
        iEstatus: null,
        iIdMostar: null,
        iOrdenPresentacion: null,
        sSubramo: '',
        sAlias: null,
        sDescripcion: null,
        lineaNegocio: null
    },
    domicilio: {
        iIdUbicacion: null,
        iIdMunicipio: null,
        sUbicacion: '',
        sMunicipio: '',
        iIdEstado: null,
        iEstadoPais: null,
        iClaveEstadoCepomex: null,
        sEstado: ''
    },
    vehiculo: {
        marca: { sLlave: '', sDato: '' },
        modelo: { sLlave: '', sDato: '' },
        descripción: { sLlave: '', sDato: '' }
    },
    iDPeticionResponse: {
        iDPeticion: 0,
        error: null
    },
    cotizacionResponse: {
        estatus: null,
        idCotizacion: null,
        error: null,
        jsonCotizacion: []
    }
}

export function reducer (state = initialState, action: CotizamaticoActions ) : State{
    switch (action.type) {
        case CotizamaticoActionsTypes.ModificarVehiculo: 
        return {
            ...state,
            SubRamo: {
                sSubramo: action.payload.tipo.sDato,
                iIdSubRamo: action.payload.tipo.sLlave,
                Ramo: state.SubRamo.Ramo,
                iLineaNegocio: state.SubRamo.iLineaNegocio,
                iEstatus: state.SubRamo.iEstatus,
                iIdMostar: state.SubRamo.iIdMostar,
                iOrdenPresentacion: state.SubRamo.iOrdenPresentacion,
                sAlias: state.SubRamo.sAlias,
                sDescripcion: state.SubRamo.sDescripcion,
                lineaNegocio: state.SubRamo.lineaNegocio
            },
            vehiculo: {
                marca: action.payload.marca,
                descripción: action.payload.descripcion,
                modelo: action.payload.modelo
            }
            
        };
        case CotizamaticoActionsTypes.GetIdPeticionResponse:
            return {
                ...state,
                iDPeticionResponse: {
                    iDPeticion: action.payload.IdPeticionCotizacion,
                    error: action.payload.Error
                }
             };
        case CotizamaticoActionsTypes.GetCotizacionResponse:
            return {
                ...state,
                cotizacionResponse:{
                    estatus: action.payload.Estatus,
                    idCotizacion:  action.payload.IdCotizacion,
                    error:  action.payload.Error,
                    jsonCotizacion: action.payload.JsonCotizacion
                }
            };
        case CotizamaticoActionsTypes.GetIdPeticion:
            return{
                ...state,
                asegurado:{
                    nombre: action.payload.cotizacion.Persona.sNombre,
                    fechaDeNacimiento: action.payload.cotizacion.Persona.sFechaNacimiento,
                    correo: action.payload.cotizacion.Persona.sEmail,
                    cP: action.payload.cotizacion.Domicilio.sCodigoPostal,
                    telefono: action.payload.cotizacion.Persona.sTelefono,
                    tipoDePersona: action.payload.cotizacion.Persona.bSiNoPersonaMoral,
                    iSexo: action.payload.cotizacion.Persona.iSexo,
                    apellidoMaterno: action.payload.cotizacion.Persona.sApellidoMaterno,
                    apellidoPaterno:action.payload.cotizacion.Persona.sApellidoPaterno
                    
                },
                SubRamo:{
                    iIdSubRamo: action.payload.cotizacion.SubRamo.iIdSubRamo,
                    sSubramo: action.payload.cotizacion.SubRamo.sSubramo,
                    Ramo: null,
                    iLineaNegocio: 0,
                    iEstatus: 0,
                    iIdMostar: 0,
                    iOrdenPresentacion: 0,
                    sAlias: null,
                    sDescripcion: null,
                    lineaNegocio: null
                },
                domicilio:{
                    iIdUbicacion        :action.payload.cotizacion.Domicilio.iIdUbicacion ,
                    iIdMunicipio        :action.payload.cotizacion.Domicilio.iIdMunicipio ,
                    sUbicacion          :action.payload.cotizacion.Domicilio.sUbicacion,
                    sMunicipio          :action.payload.cotizacion.Domicilio.sMunicipio,
                    iIdEstado           :action.payload.cotizacion.Domicilio.iIdEstado ,
                    iEstadoPais         :action.payload.cotizacion.Domicilio.iEstadoPais ,
                    iClaveEstadoCepomex :action.payload.cotizacion.Domicilio.iClaveEstadoCepomex ,
                    sEstado             :action.payload.cotizacion.Domicilio.sEstado 
                },
                vehiculo:{
                    modelo:{
                        sLlave: action.payload.cotizacion.Vehiculo.Modelo.iIdModelo,
                        sDato: action.payload.cotizacion.Vehiculo.Modelo.sModelo,
                    },
                    descripción:{
                        sLlave: action.payload.cotizacion.Vehiculo.DescripcionModelo.iIdDescripcionModelo,
                        sDato:action.payload.cotizacion.Vehiculo.DescripcionModelo.sDescripcion
                    },
                    marca:{
                        sLlave: action.payload.cotizacion.Vehiculo.Marca.iIdMarca,
                        sDato:action.payload.cotizacion.Vehiculo.Marca.sMarca
                    }
                }
            }
        default: {return state}
    }
}

export const IDPeticionResponse= (state: State) => state.iDPeticionResponse
export const IDCotizacionResponse = (state: State) => state.cotizacionResponse
export const selectTipo = (state: State) => state.SubRamo.sSubramo
export const selectModelo = (state: State) => state.vehiculo.modelo
export const selectMarca = (state: State) => state.vehiculo.marca
export const selectDescripcion = (state: State) => state.vehiculo.descripción