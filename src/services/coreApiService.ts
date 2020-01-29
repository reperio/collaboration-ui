import {ReperioCoreConnector} from "@reperio/core-connector";
import {coreApiUrl} from "../config";

export const coreApiService = new ReperioCoreConnector({
    baseURL: coreApiUrl,
});