import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from "redux-devtools-extension";
import { createRootReducer } from '../reducers';
import { history } from "./history";
import {State} from "./state";
import {persistReducer, createTransform} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export function configureStore(initialState?: State) {
    const reactRouterMiddleware = routerMiddleware(history);
    const middleware = [
        thunk,
        reactRouterMiddleware
    ];

    const expireInXSeconds = (seconds: number) => {
        return createTransform(
            inbound => {
                return Object.assign({}, inbound, {'__persisted_at': (new Date()).getTime()});
            },
            outbound => {
                const start = (new Date(outbound['__persisted_at'])).getTime();
                const end = (new Date()).getTime();
                const secondsPassed = (end - start)/1000;
    
                if (secondsPassed > seconds) {
                    return Object.assign({});
                }
                return outbound;
            }
        );
    }

    const nestPersist = (properties: string[]) => {
        return createTransform(
            (inbound: any) => {
                let data = {};
                properties.forEach(property => {
                    data = Object.assign(data, {[property]: inbound[property]})
                });
                return data;
            },
            outbound => {
                return outbound;
            }
        )
    };

    const persistConfig = {
        key: 'auth',
        storage,
        whitelist: ['authSession'],
        transforms: [
            nestPersist(['selectedOrganization', 'userPermissions']),
            expireInXSeconds(1800) // expire after half hour
        ]
    }
    
    const rootReducer = createRootReducer(history);
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    return createStore<State>(
        persistedReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(...middleware)
        )
    );
}