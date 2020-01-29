import React from 'react';
import { connect } from "react-redux";
import { AuthenticatedRoute } from "./authenticatedRoute";
import { RouteProps } from "react-router";
import { State } from "../../store/state";
import { userHasRequiredPermissions } from "../../services/authService";

type AuthenticatedRouteContainerProps = RouteProps & {
    unauthenticatedRedirectRoute: string;
    unpaidRedirectRoute: string;
    requiredPermissions?: string[] | string[][];
    isPaidOverride?: boolean;
};
type StateProps = ReturnType<typeof mapStateToProps>;
type AllProps = AuthenticatedRouteContainerProps & StateProps;

class AuthenticatedRouteContainer extends React.Component<AllProps> {
    render() {
        let hasPermission = true;
        if (this.props.requiredPermissions) {
            hasPermission = userHasRequiredPermissions(this.props.authSession.userPermissions || [], this.props.requiredPermissions || []) || this.props.authSession.superAdmin;
        }

        return (
            <AuthenticatedRoute
                isAuthenticated={this.props.authSession.isAuthenticated}
                unauthenticatedRedirectRoute={this.props.unauthenticatedRedirectRoute}
                isPaid={this.props.authSession.applicationOrganizationActive || this.props.isPaidOverride}
                unpaidRedirectRoute={this.props.unpaidRedirectRoute}
                hasPermission={hasPermission}
                {...this.props} />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession
    };
}

export const ConnectedAuthenticatedRouteContainer = connect<StateProps, {}, AuthenticatedRouteContainerProps>(mapStateToProps)(AuthenticatedRouteContainer);