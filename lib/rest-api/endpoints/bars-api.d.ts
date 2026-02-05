import type { ConfigurationRestAPI, RestApiResponse, GetBarsRequest, GetBarsResponse } from '../types';
export declare class BarsApi {
    private readonly configuration;
    constructor(configuration: ConfigurationRestAPI);
    getBars(requestParameters: GetBarsRequest): Promise<RestApiResponse<GetBarsResponse>>;
}
//# sourceMappingURL=bars-api.d.ts.map