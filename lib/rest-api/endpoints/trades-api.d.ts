import type { ConfigurationRestAPI, RestApiResponse, GetTradesRequest, GetTradesResponse, GetTradesByAccountRequest, GetTradesByAccountResponse } from '../types';
export declare class TradesApi {
    private readonly configuration;
    constructor(configuration: ConfigurationRestAPI);
    getTrades(requestParameters: GetTradesRequest): Promise<RestApiResponse<GetTradesResponse>>;
    getTradesByAccount(requestParameters: GetTradesByAccountRequest): Promise<RestApiResponse<GetTradesByAccountResponse>>;
}
//# sourceMappingURL=trades-api.d.ts.map