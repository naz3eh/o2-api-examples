"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthApi = void 0;
const httpRequest_1 = require("../utils/httpRequest");
class HealthApi {
    configuration;
    constructor(configuration) {
        this.configuration = configuration;
    }
    async getHealth() {
        return await (0, httpRequest_1.sendRequest)(this.configuration, '/health', 'GET', {});
    }
}
exports.HealthApi = HealthApi;
//# sourceMappingURL=health-api.js.map