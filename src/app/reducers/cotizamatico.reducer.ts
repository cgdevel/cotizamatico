import { state } from '@angular/animations';
import {CotizamaticoActionsTypes,CotizamaticoActions, GetIdPeticion } from '../actions/cotizamatico.actions'
import { CatalogoModel } from '../interphaces/models/Catalogos.model'
import { FechasModel } from '../interphaces/models/Fechas.model'

export interface State{
    asegurado:{
        nombre : string;
        correo : string;
        cP     : number;
        fechaDeNacimiento: string ;
        telefono: number;
        tipoDePersona:boolean;
        iSexo: number;
    };
    vehiculo:{
        marca : {sLlave: any, sDato: any};
        tipo:{sLlave: any, sDato: any};
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
    }
    
}

const initialState: State = {
    asegurado:{
        nombre : '',
        correo : '',
        cP      : null,
        fechaDeNacimiento: '',
        telefono: null,
        tipoDePersona: null,
        iSexo:null
    },
    vehiculo:{
        marca :{sLlave:'',sDato:''},
        tipo:{sLlave:'',sDato:''},
        modelo :{sLlave:'',sDato:''},
        descripción:{sLlave:'',sDato:''}
    },
    iDPeticionResponse:{
        iDPeticion: 0,
        error: null
    },
    cotizacionResponse:{
        estatus:  null,
        idCotizacion:  null,
        error:  null,
        jsonCotizacion: []
    }
}

export function reducer (state = initialState, action: CotizamaticoActions ) : State{
    switch (action.type) {
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
                    iSexo: action.payload.cotizacion.Persona.iSexo
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
                    tipo:{
                        sLlave: action.payload.cotizacion.SubRamo.iIdSubRamo,
                        sDato:action.payload.cotizacion.SubRamo.sSubramo
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