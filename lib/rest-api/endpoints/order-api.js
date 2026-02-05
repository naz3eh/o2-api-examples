"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderApi = void 0;
const httpRequest_1 = require("../utils/httpRequest");
class OrderApi {
    configuration;
    constructor(configuration) {
        this.configuration = configuration;
    }
    async getOrder(requestParameters) {
        const params = new URLSearchParams();
        for (const key in requestParameters) {
            if (Object.prototype.hasOwnProperty.call(requestParameters, key)) {
                params.append(key, String(requestParameters[key]));
            }
        }
        // Construct the full endpoint path with the query string.
        const endpointWithParams = `/v1/order?${params.toString()}`;
        return await (0, httpRequest_1.sendRequest)(this.configuration, endpointWithParams, 'GET', {});
    }
}
exports.OrderApi = OrderApi;
//# sourceMappingURL=order-api.js.map