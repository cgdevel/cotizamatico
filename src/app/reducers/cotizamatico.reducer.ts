import { state } from '@angular/animations';
import {CotizamaticoActionsTypes,CotizamaticoActions } from '../actions/cotizamatico.actions'
import { CatalogoModel } from '../interphaces/models/Catalogos.model'
import { FechasModel } from '../interphaces/models/Fechas.model'

export interface State{
    asegurado:{
        nombre : string;
        correo : string;
        cP     : number;
        fechaDeNacimiento: FechasModel ;
        telefono: number;
        tipoDePersona: string;
    };
    vehiculo:{
        marca :CatalogoModel;
        submarca:CatalogoModel;
        modelo :CatalogoModel;
        descripción:CatalogoModel;
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
        fechaDeNacimiento: {anio:'',dia:'',mes:''},
        telefono: null,
        tipoDePersona: ''
    },
    vehiculo:{
        marca :{sLlave:'',sDato:''},
        submarca:{sLlave:'',sDato:''},
        modelo :{sLlave:'',sDato:''},
        descripción:{sLlave:'',sDato:''}
    },
    iDPeticionResponse:{
        iDPeticion: null,
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
                    iDPeticion: action.payload.idPeticionCotizacion,
                    error: action.payload.error
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
    
        default: {return state}
    }
}

export const IDPeticionResponse= (state: State) => state.iDPeticionResponse
export const IDCotizacionResponse = (state: State) => state.cotizacionResponse