import { Action } from "@ngrx/store";
import { RequestIdCotizacion } from "../interphaces/request/RequestIdCotizacion";
import { RequestIdPeticionCotizacion } from "../interphaces/request/RequestIdPeticionCotizacion";
import { ResponseIdCotizacion } from "../interphaces/response/ResponseIdCotizacion";
import { ResponseIdPeticionCotizacion } from "../interphaces/response/ResponseIdPeticionCotizacion";
import {ResponseCatalogoCoberturas} from "../interphaces/response/ReponseCatalogoCoberturas";



export enum CotizamaticoActionsTypes {
    GetIdPeticion='Get ID Peticion',
    GetCotizacion='Get Cotizacion',
    GetIdPeticionResponse ='Get Response Peticion',
    GetCotizacionResponse='Get Response Cotizacion',
    GetCoberturasporAse='Get Response Coberturas por Aseguradora',
    ModificarVehiculo = 'Modify Vehiculo'
}

export class GetIdPeticion implements Action {
    readonly type = CotizamaticoActionsTypes.GetIdPeticion
    constructor(public payload : RequestIdPeticionCotizacion ){}
}

export class GetCotizacion implements Action{
    readonly type= CotizamaticoActionsTypes.GetCotizacion
    constructor(public payload : RequestIdCotizacion){}

}

export class GetIdPeticionResponse implements Action {
    readonly type = CotizamaticoActionsTypes.GetIdPeticionResponse
    constructor(public payload : ResponseIdPeticionCotizacion ){}
}

export class GetCotizacionResponse implements Action{
    readonly type= CotizamaticoActionsTypes.GetCotizacionResponse
    constructor(public payload : ResponseIdCotizacion){}
}

export class GetCoberturasporAse implements Action{
    readonly type= CotizamaticoActionsTypes.GetCoberturasporAse
    constructor(public payload : ResponseCatalogoCoberturas){}
}

export class ModificarVehiculo implements Action{
    readonly type= CotizamaticoActionsTypes.ModificarVehiculo
    constructor(public payload : {
        modelo: { sLlave: any, sDato: any}, 
        marca: { sLlave: any, sDato: any}, 
        descripcion: { sLlave: any, sDato: any}, 
        tipo: { sLlave: any, sDato: any}
    }){}
}


export type CotizamaticoActions = 
| GetIdPeticion 
| GetCotizacion 
| GetIdPeticionResponse
| GetCotizacionResponse
| GetCoberturasporAse
| ModificarVehiculo