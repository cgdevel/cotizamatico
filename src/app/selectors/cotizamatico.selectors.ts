import { createFeatureSelector,createSelector, select } from '@ngrx/store'
import * as fromCotizamatico from '../reducers/cotizamatico.reducer'

export const selectCotizamaticoState= createFeatureSelector<fromCotizamatico.State>('cotizamatico')

export const selectIdPeticionResponse = createSelector(
    selectCotizamaticoState, 
    fromCotizamatico.IDPeticionResponse
)
export const selectCotizacionResponse = createSelector(
    selectCotizamaticoState, 
    fromCotizamatico.IDCotizacionResponse
)