import {StateAuthSession} from "../store/state";
import {initialState} from "../store/initialState";
import {authSessionActionTypes} from "../actionTypes/authSessionActionTypes";

export function authSessionReducer(state = initialState.authSession, action: {type: string, payload: any}): StateAuthSession {
    switch (action.type) {
        case 'RESET_APP': {
            return {
                ...initialState.authSession,
                isAuthInitialized: action.payload.resetIsAuthInitialized ? initialState.authSession.isAuthInitialized : state.isAuthInitialized
            };
        }
        case authSessionActionTypes.AUTH_SET_USER: {
            return {
                ...state,
                isPending: false,
                isAuthenticated: true,
                isError: false,
                errorMessage: null,
                user: action.payload.user != null ? Object.assign({}, action.payload.user) : null
            };
        }
        case authSessionActionTypes.AUTH_SET_IS_AUTH_INITIALIZED: {
            return {
                ...state,
                isAuthInitialized: true
            }
        }
        default: {
            return state;
        }
    }
}