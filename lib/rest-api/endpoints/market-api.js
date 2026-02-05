"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketApi = void 0;
const httpRequest_1 = require("../utils/httpRequest");
class MarketApi {
    configuration;
    constructor(configuration) {
        this.configuration = configuration;
    }
    async getMarkets() {
        return await (0, httpRequest_1.sendRequest)(this.configuration, '/v1/markets', 'GET', {});
    }
    async getTicker(requestParameters) {
        const params = new URLSearchParams();
        for (const key in requestParameters) {
            if (Object.prototype.hasOwnProperty.call(requestParameters, key)) {
                params.append(key, String(requestParameters[key]));
            }
        }
        // Construct the full endpoint path with the query string.
        const endpointWithParams = `/v1/markets/ticker?${params.toString()}`;
        return await (0, httpRequest_1.sendRequest)(this.configuration, endpointWithParams, 'GET', {});
    }
    async getSummary(requestParameters) {
        const params = new URLSearchParams();
        for (const key in requestParameters) {
            if (Object.prototype.hasOwnProperty.call(requestParameters, key)) {
                params.append(key, String(requestParameters[key]));
            }
        }
        // Construct the full endpoint path with the query string.
        const endpointWithParams = `/v1/markets/summary?${params.toString()}`;
        return await (0, httpRequest_1.sendRequest)(this.configuration, endpointWithParams, 'GET', {});
    }
}
exports.MarketApi = MarketApi;
//# sourceMappingURL=market-api.js.map