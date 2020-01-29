import {State} from "./state";

export const initialState: State = {
    authSession: {
        isPending: false,
        isAuthenticated: false,
        isError: false,
        otpIsPending: false,
        otpIsError: false,
        errorMessage: null,
        user: null,
        reperioCoreJWT: null,
        isAuthInitialized: false,
        organizations: null,
        selectedOrganization: null,
        userPermissions: null,
        orgReconciled: false,
        applicationOrganizationActive: false,
        superAdmin: false
    },
};
