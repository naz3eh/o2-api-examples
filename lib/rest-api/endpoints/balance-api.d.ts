import type { ConfigurationRestAPI, RestApiResponse, GetBalanceRequest, GetBalanceResponse } from '../types';
export declare class BalanceApi {
    private readonly configuration;
    constructor(configuration: ConfigurationRestAPI);
    getBalance(requestParameters: GetBalanceRequest): Promise<RestApiResponse<GetBalanceResponse>>;
}
//# sourceMappingURL=balance-api.d.ts.map