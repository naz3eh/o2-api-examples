"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepthApi = void 0;
const httpRequest_1 = require("../utils/httpRequest");
class DepthApi {
    configuration;
    constructor(configuration) {
        this.configuration = configuration;
    }
    async getDepth(requestParameters) {
        const params = new URLSearchParams();
        for (const key in requestParameters) {
            if (Object.prototype.hasOwnProperty.call(requestParameters, key)) {
                params.append(key, String(requestParameters[key]));
            }
        }
        const endpointWithParams = `/v1/depth?${params.toString()}`;
        return await (0, httpRequest_1.sendRequest)(this.configuration, endpointWithParams, 'GET', {});
    }
}
exports.DepthApi = DepthApi;
//# sourceMappingURL=depth-api.js.map