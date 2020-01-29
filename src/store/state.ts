import { Organization, User } from "@reperio/core-connector";

export interface State {
    authSession: StateAuthSession;
}

export class StateAuthSession {
    isPending: boolean;
    isAuthenticated: boolean;
    isError: boolean;
    otpIsPending: boolean;
    otpIsError: boolean;
    errorMessage: string;
    user: User;
    reperioCoreJWT: string;
    isAuthInitialized: boolean;
    organizations: Organization[];
    selectedOrganization: Organization;
    userPermissions: string[];
    orgReconciled: boolean;
    applicationOrganizationActive: boolean;
    superAdmin: boolean;
}
