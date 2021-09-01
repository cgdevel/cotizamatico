import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCotizamatico from '../reducers/cotizamatico.reducer'
export interface State {
  cotizamatico: fromCotizamatico.State;
}

export const reducers: ActionReducerMap<State> = {
 cotizamatico: fromCotizamatico.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
