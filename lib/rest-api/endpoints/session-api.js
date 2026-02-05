"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionApi = void 0;
const httpRequest_1 = require("../utils/httpRequest");
class SessionApi {
    configuration;
    constructor(configuration) {
        this.configuration = configuration;
    }
    async sessionSubmitTransaction(requestParameters, ownerId) {
        const response = await (0, httpRequest_1.sendRequest)(this.configuration, '/v1/session/actions', 'POST', { ...requestParameters }, { ownerId: ownerId });
        return response;
    }
}
exports.SessionApi = SessionApi;
//# sourceMappingURL=session-api.js.map