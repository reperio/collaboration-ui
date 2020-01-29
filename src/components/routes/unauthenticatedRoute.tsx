import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

interface UnauthenticatedRouteProps {
    isAuthenticated: boolean;
    authenticatedRedirectRoute: string;
}

export const UnauthenticatedRoute: React.SFC<UnauthenticatedRouteProps & RouteProps> = (props) => {
    if (props.isAuthenticated) {
        return (<Redirect to={props.authenticatedRedirectRoute} />);
    } else {
        return (<Route {...props} />);
    }
};