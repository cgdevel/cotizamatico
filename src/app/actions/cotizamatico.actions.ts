import { Action } from "@ngrx/store";
import { type } from "node:os";
import { RequestIdCotizacion } from "../interphaces/request/RequestIdCotizacion";
import { RequestIdPeticionCotizacion } from "../interphaces/request/RequestIdPeticionCotizacion";
import { ResponseIdCotizacion } from "../interphaces/response/ResponseIdCotizacion";
import { ResponseIdPeticionCotizacion } from "../interphaces/response/ResponseIdPeticionCotizacion";

export enum CotizamaticoActionsTypes {
    GetIdPeticion='Get ID Peticion',
    GetCotizacion='Get Cotizacion',
    GetIdPeticionResponse ='Get Response Peticion',
    GetCotizacionResponse='Get Response Cotizacion'
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
export type CotizamaticoActions = 
| GetIdPeticion 
| GetCotizacion 
| GetIdPeticionResponse
| GetCotizacionResponse