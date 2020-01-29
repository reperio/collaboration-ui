import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react';

import "./styles/app.scss"

import { store, persistor } from "./store/store"
import { history } from "./store/history"
import { ConnectedAppContainer } from "./components/app/appContainer";

import { googleAnalyticsTrackingId } from './config'

import ReactGA from 'react-ga';
ReactGA.initialize(googleAnalyticsTrackingId);

history.listen(location => {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
});

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <ConnectedAppContainer />
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
