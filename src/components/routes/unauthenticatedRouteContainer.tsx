import React from 'react';
import { connect } from "react-redux";
import { UnauthenticatedRoute } from "./unauthenticatedRoute";
import { RouteProps } from "react-router";
import { State } from "../../store/state";

type PublicRouteContainerProps = RouteProps & {
    authenticatedRedirectRoute: string;
};;
type StateProps = ReturnType<typeof mapStateToProps>;
type AllProps = PublicRouteContainerProps & StateProps;

class UnauthenticatedRouteContainer extends React.Component<AllProps> {
    render() {
        return (
            <UnauthenticatedRoute
                isAuthenticated={this.props.authSession.isAuthenticated}
                authenticatedRedirectRoute={this.props.authenticatedRedirectRoute}
                {...this.props} />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession
    };
}

export const ConnectedUnauthenticatedRouteContainer = connect<StateProps, {}, PublicRouteContainerProps>(mapStateToProps)(UnauthenticatedRouteContainer);