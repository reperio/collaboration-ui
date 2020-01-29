import { State } from "../store/state";
import { Dispatch } from "redux";
import { authSessionActionTypes } from "../actionTypes/authSessionActionTypes";
import { retrieveUserById, userHasRequiredPermissions } from "../services/authService";
import { User, Organization } from "@reperio/core-connector";
import { axios } from "./../services/axiosService";
import { coreApiService } from "../services/coreApiService";
import { history } from "../store/history";

export const setLoggedInUser = (user: User = null, initializeAuth: boolean = false) => async (dispatch: Dispatch<any>, getState: () => State) => {
    if (user) {
        dispatch({
            type: authSessionActionTypes.AUTH_SET_USER,
            payload: { user }
        });
    }

    if (initializeAuth) {
        dispatch({
            type: authSessionActionTypes.AUTH_SET_IS_AUTH_INITIALIZED
        })
    }
};

export const logout = () => async (dispatch: Dispatch<any>) => {
    await coreApiService.authService.logout();
    dispatch({
        type: 'RESET_APP',
        payload: {
            resetIsAuthInitialized: false
        }
    });
    history.push('/login');
    localStorage.removeItem('persist:auth');
};

export const selectOrganization = (organization: Organization, forceRefrsh: boolean = false) => async (dispatch: Dispatch<State>) => {
    console.log('org selected');
    return;
}

export const getUserOrganizations = (user: User) => async (dispatch: Dispatch<State>) => {
    console.log('org selected');
    return;
}
