import { Injectable } from "@angular/core";
import {mergeMap, catchError , tap, map} from 'rxjs/Operators'
import * as fromRoot from '../reducers'
import { Store } from "@ngrx/store";
import { CotizamaticoActionsTypes, GetIdPeticion, GetIdPeticionResponse } from "../actions/cotizamatico.actions";
import {Actions, Effect , ofType} from '@ngrx/effects'
import { APICotizacionService } from "../servicios/APICotizacion.service";
import {of} from 'rxjs' 

@Injectable ()
export class CotizamaticoEffects {
constructor( private store:Store<fromRoot.State>, private actions$: Actions , private apiCotizacionService:APICotizacionService){}

@Effect()
GetIdPeticion$ = this.actions$.pipe(
    ofType<GetIdPeticion>(CotizamaticoActionsTypes.GetIdPeticion),
    mergeMap( action => 
        this.apiCotizacionService.getIdPeticion(action.payload).pipe(
        map(data => new GetIdPeticionResponse(data)),
        catchError(err => {
            return of(new Error(err.message));
          })
    ))
)


}