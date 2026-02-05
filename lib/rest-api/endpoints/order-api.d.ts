import type { ConfigurationRestAPI, RestApiResponse, GetOrderRequest, GetOrderResponse } from '../types';
export declare class OrderApi {
    private readonly configuration;
    constructor(configuration: ConfigurationRestAPI);
    getOrder(requestParameters: GetOrderRequest): Promise<RestApiResponse<GetOrderResponse>>;
}
//# sourceMappingURL=order-api.d.ts.map