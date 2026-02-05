import type { ConfigurationRestAPI, RestApiResponse, MarketsResponse, GetTickerRequest, GetTickerResponse, GetSummaryRequest, GetSummaryResponse } from '../types';
export declare class MarketApi {
    private readonly configuration;
    constructor(configuration: ConfigurationRestAPI);
    getMarkets(): Promise<RestApiResponse<MarketsResponse>>;
    getTicker(requestParameters: GetTickerRequest): Promise<RestApiResponse<GetTickerResponse>>;
    getSummary(requestParameters: GetSummaryRequest): Promise<RestApiResponse<GetSummaryResponse>>;
}
//# sourceMappingURL=market-api.d.ts.map