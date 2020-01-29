import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { State } from "../store/state";
import { authSessionReducer } from "./authSessionReducer";

export const createRootReducer = (history: History) => combineReducers<State>({
    router: connectRouter(history),
    form: formReducer,
    authSession: authSessionReducer,
});
