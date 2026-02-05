import type { ConfigurationRestAPI, RestApiResponse, GetDepthRequest, GetDepthResponse } from '../types';
export declare class DepthApi {
    private readonly configuration;
    constructor(configuration: ConfigurationRestAPI);
    getDepth(requestParameters: GetDepthRequest): Promise<RestApiResponse<GetDepthResponse>>;
}
//# sourceMappingURL=depth-api.d.ts.map