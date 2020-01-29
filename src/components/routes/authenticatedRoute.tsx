import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

interface AuthenticatedRouteProps {
    isAuthenticated: boolean;
    unauthenticatedRedirectRoute: string;
    isPaid: boolean;
    unpaidRedirectRoute: string;
    hasPermission: boolean;
}

export const AuthenticatedRoute: React.SFC<AuthenticatedRouteProps & RouteProps> = (props) => {
    if (!props.isAuthenticated) {
        return (<Redirect to={props.unauthenticatedRedirectRoute} />);
    } else if (!props.isPaid) {
        return (<Redirect to={props.unpaidRedirectRoute} />);
    } else if (!props.hasPermission) {
        return (<Redirect to='/landing' />);
    } else {
        return (<Route {...props} />);
    }
};