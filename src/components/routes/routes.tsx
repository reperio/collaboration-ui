import React from 'react'
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import Loadable from 'react-loadable'
import { LoadingSpinner } from '@reperio/ui-components';
import { ConnectedAuthenticatedRouteContainer } from "./authenticatedRouteContainer";
import { ConnectedUnauthenticatedRouteContainer } from "./unauthenticatedRouteContainer";

const AsyncHomePage = Loadable({
    loader: () => import('../../pages/homePage').then(module => module.HomePage),
    loading: () => <LoadingSpinner />
});

// const AsyncPrivatePage = Loadable({
//     loader: () => import('../../pages/privatePage').then(module => module.PrivatePage),
//     loading: () => <LoadingSpinner />
// });

export const Routes: React.SFC = () => (
    <Switch>
        {/* <ConnectedUnauthenticatedRouteContainer exact path="/home" authenticatedRedirectRoute={"/home"} component={AsyncWorkstationPage} /> */}
        {/* <ConnectedAuthenticatedRouteContainer exact path="/private" unauthenticatedRedirectRoute={"/home"} component={AsyncServerPage} /> */}
        <Route component={AsyncHomePage} />
        <Route>
            <Redirect to="/home" />
        </Route>
    </Switch>
);