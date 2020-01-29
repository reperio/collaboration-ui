import axiosStatic from "axios";
import { store } from "../store/store";
import {State} from "../store/state";

declare const API_URL: string;

export const axios = axiosStatic.create({
    baseURL: API_URL,
    withCredentials: true
});

axios.interceptors.request.use(async config => {
    const state: State = store.getState();
    const organizationId = state.authSession.selectedOrganization ? state.authSession.selectedOrganization.id : null;
    if (organizationId != null) {
        config.headers['x-organization-id'] = organizationId;
    }
    return config;
});

axios.interceptors.response.use(async response => {
    return response;
});