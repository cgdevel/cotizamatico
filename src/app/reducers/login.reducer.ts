import { state } from '@angular/animations';
import { LoginActions, LoginActionTypes} from '../actions/login.actions'

export interface State{
    sesion: any
}

const initialState: State = {
    sesion: null
}

export function reducer (state = initialState, action: LoginActions ) : State{
    switch (action.type) {
        case LoginActionTypes.LoignByJson: 
        return {
            ...state,
            sesion: action.payload
        };
        default: {return state}
    }
}

export const selectSesion = (state: State) => state.sesion