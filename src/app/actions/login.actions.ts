
import { Action } from "@ngrx/store";



export enum LoginActionTypes {
    LoignByJson ='Get Login by JSON'
}

export class LoginByJson implements Action {
    readonly type = LoginActionTypes.LoignByJson
    constructor(public payload: any ){}
}


export type LoginActions = 
| LoginByJson 