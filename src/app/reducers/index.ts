import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCotizamatico from '../reducers/cotizamatico.reducer'
import * as fromLogin from '../reducers/login.reducer'
export interface State {
  cotizamatico: fromCotizamatico.State;
  sesion: fromLogin.State
}

export const reducers: ActionReducerMap<State> = {
 cotizamatico: fromCotizamatico.reducer,
 sesion: fromLogin.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
