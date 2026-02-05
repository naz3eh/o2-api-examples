import type { ConfigurationRestAPI, RestApiResponse, GetOrdersRequest, GetOrdersResponse } from '../types';
export declare class OrdersApi {
    private readonly configuration;
    constructor(configuration: ConfigurationRestAPI);
    getOrders(requestParameters: GetOrdersRequest): Promise<RestApiResponse<GetOrdersResponse>>;
}
//# sourceMappingURL=orders-api.d.ts.map