"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersApi = void 0;
const httpRequest_1 = require("../utils/httpRequest");
class OrdersApi {
    configuration;
    constructor(configuration) {
        this.configuration = configuration;
    }
    async getOrders(requestParameters) {
        const params = new URLSearchParams();
        for (const key in requestParameters) {
            if (Object.prototype.hasOwnProperty.call(requestParameters, key)) {
                params.append(key, String(requestParameters[key]));
            }
        }
        // Construct the full endpoint path with the query string.
        const endpointWithParams = `/v1/orders?${params.toString()}`;
        return await (0, httpRequest_1.sendRequest)(this.configuration, endpointWithParams, 'GET', {});
    }
}
exports.OrdersApi = OrdersApi;
//# sourceMappingURL=orders-api.js.map