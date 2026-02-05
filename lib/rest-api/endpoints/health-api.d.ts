import type { ConfigurationRestAPI, RestApiResponse } from '../types';
export declare class HealthApi {
    private readonly configuration;
    constructor(configuration: ConfigurationRestAPI);
    getHealth(): Promise<RestApiResponse<string>>;
}
//# sourceMappingURL=health-api.d.ts.map