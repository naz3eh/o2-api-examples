"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountApi = void 0;
const httpRequest_1 = require("../utils/httpRequest");
class AccountApi {
    configuration;
    constructor(configuration) {
        this.configuration = configuration;
    }
    async createTradingAccount(requestParameters) {
        const localVarBodyParameter = {};
        if (requestParameters.address !== undefined && requestParameters.address !== null) {
            localVarBodyParameter['identity'] = {
                Address: requestParameters.address,
            };
        }
        return await (0, httpRequest_1.sendRequest)(this.configuration, '/v1/accounts', 'POST', localVarBodyParameter);
    }
    async createSession(requestParameters, ownerId) {
        return await (0, httpRequest_1.sendRequest)(this.configuration, '/v1/session', 'PUT', { ...requestParameters }, { ownerId: ownerId });
    }
}
exports.AccountApi = AccountApi;
//# sourceMappingURL=account-api.js.map