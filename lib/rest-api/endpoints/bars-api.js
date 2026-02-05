"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarsApi = void 0;
const httpRequest_1 = require("../utils/httpRequest");
class BarsApi {
    configuration;
    constructor(configuration) {
        this.configuration = configuration;
    }
    async getBars(requestParameters) {
        const params = new URLSearchParams();
        for (const key in requestParameters) {
            if (Object.prototype.hasOwnProperty.call(requestParameters, key)) {
                params.append(key, String(requestParameters[key]));
            }
        }
        // For CountBack, "from" should be same as "to"
        if ('count_back' in requestParameters) {
            params.append('from', String(requestParameters.to));
        }
        // Construct the full endpoint path with the query string.
        const endpointWithParams = `/v1/bars?${params.toString()}`;
        return await (0, httpRequest_1.sendRequest)(this.configuration, endpointWithParams, 'GET', {});
    }
}
exports.BarsApi = BarsApi;
//# sourceMappingURL=bars-api.js.map