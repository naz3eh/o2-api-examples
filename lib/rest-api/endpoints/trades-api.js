"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradesApi = void 0;
const httpRequest_1 = require("../utils/httpRequest");
class TradesApi {
    configuration;
    constructor(configuration) {
        this.configuration = configuration;
    }
    async getTrades(requestParameters) {
        const params = new URLSearchParams();
        for (const key in requestParameters) {
            if (Object.prototype.hasOwnProperty.call(requestParameters, key)) {
                params.append(key, String(requestParameters[key]));
            }
        }
        // Construct the full endpoint path with the query string.
        const endpointWithParams = `/v1/trades?${params.toString()}`;
        return await (0, httpRequest_1.sendRequest)(this.configuration, endpointWithParams, 'GET', {});
    }
    async getTradesByAccount(requestParameters) {
        const params = new URLSearchParams();
        for (const key in requestParameters) {
            if (Object.prototype.hasOwnProperty.call(requestParameters, key)) {
                params.append(key, String(requestParameters[key]));
            }
        }
        // Construct the full endpoint path with the query string.
        const endpointWithParams = `/v1/trades_by_account?${params.toString()}`;
        return await (0, httpRequest_1.sendRequest)(this.configuration, endpointWithParams, 'GET', {});
    }
}
exports.TradesApi = TradesApi;
//# sourceMappingURL=trades-api.js.map