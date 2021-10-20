import { createFeatureSelector,createSelector, select } from '@ngrx/store'
import * as fromLogin from '../reducers/login.reducer'

export const selectLoginState= createFeatureSelector<fromLogin.State>('sesion')

export const selectSesion = createSelector(
    selectLoginState, 
    fromLogin.selectSesion
)